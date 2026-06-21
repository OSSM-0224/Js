import { useCallback, useMemo, useState } from "react";
import axios from "axios";

const analyticsApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const initialFormState = {
  title: "",
  url: "",
  icon: "",
  category: "",
};

export const useAnalytics = (username) => {
  const [analytics, setAnalytics] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [range, setRange] = useState("7");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formState, setFormState] = useState(initialFormState);
  const [selectedLink, setSelectedLink] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    setError("");

    try {
      const params = {
        range,
      };
      if (range === "custom" && startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      const response = await analyticsApi.get(
        `/link/${encodeURIComponent(username)}/analytics`,
        { params },
      );
      setAnalytics(response.data.analytics);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load analytics",
      );
    } finally {
      setLoading(false);
    }
  }, [username, range, startDate, endDate]);

  const fetchLinks = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    setError("");

    try {
      const response = await analyticsApi.get(`/links/user`);
      setLinks(response.data.links || []);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load links",
      );
    } finally {
      setLoading(false);
    }
  }, [username]);

  const fetchAll = useCallback(async () => {
    await Promise.all([fetchAnalytics(), fetchLinks()]);
  }, [fetchAnalytics, fetchLinks]);

  const openCreateForm = () => {
    setSelectedLink({});
    setFormState(initialFormState);
  };

  const openEditForm = (link) => {
    setSelectedLink(link);
    setFormState({
      title: link.title,
      url: link.url,
      icon: link.icon || "",
      category: link.category || "",
    });
  };

  const closeForm = () => {
    setSelectedLink(null);
    setFormState(initialFormState);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const submitLink = async () => {
    if (!formState.title || !formState.url) {
      setError("Title and URL are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (selectedLink?._id) {
        await analyticsApi.put(`/links/${selectedLink._id}`, formState);
      } else {
        await analyticsApi.post(`/links`, formState);
      }
      await fetchAll();
      closeForm();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to save link",
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (linkId) => {
    setLoading(true);
    setError("");

    try {
      await analyticsApi.delete(`/links/${linkId}`);
      await fetchAll();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to delete link",
      );
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!analytics?.links?.length) return;
    const headers = ["Title", "URL", "Category", "Clicks"];
    const rows = analytics.links.map((link) => [
      link.title,
      link.url,
      link.category || "General",
      link.clicks,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((item) => `"${String(item).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `analytics-${username}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const exportPDF = () => {
    window.print();
  };

  const rangeLabel = useMemo(() => {
    if (range === "custom") {
      return startDate && endDate
        ? `${startDate} → ${endDate}`
        : "Custom range";
    }
    return `${range} days`;
  }, [range, startDate, endDate]);

  return {
    analytics,
    links,
    loading,
    error,
    range,
    startDate,
    endDate,
    selectedLink,
    formState,
    rangeLabel,
    exportCSV,
    exportPDF,
    setRange,
    setStartDate,
    setEndDate,
    handleFormChange,
    openCreateForm,
    openEditForm,
    closeForm,
    submitLink,
    deleteLink,
    fetchAll,
  };
};
