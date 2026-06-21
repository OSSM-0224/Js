import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';

const toLocalDateKey = (value) => {
  const date = new Date(value);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const createDateRange = (start, end) => {
  const result = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const finish = new Date(end);
  finish.setHours(0, 0, 0, 0);

  while (current <= finish) {
    result.push({
      date: current.toISOString().slice(0, 10),
      clicks: 0,
      newLinks: 0,
    });
    current.setDate(current.getDate() + 1);
  }

  return result;
};

const getDateLabel = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
};

const getRangeBounds = (range, startDate, endDate) => {
  const end = endDate ? new Date(endDate) : new Date();
  end.setHours(23, 59, 59, 999);

  if (startDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    return { start, end };
  }

  const days = Number(range) || 7;
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);

  return { start, end };
};

const countClickEventsByDay = (links, start, end) => {
  const days = createDateRange(start, end);
  const dateIndex = Object.fromEntries(days.map((item, index) => [item.date, index]));

  links.forEach((link) => {
    const createdKey = toLocalDateKey(link.createdAt);
    if (dateIndex[createdKey] !== undefined) {
      days[dateIndex[createdKey]].newLinks += 1;
    }

    const events = Array.isArray(link.clickEvents) ? link.clickEvents : [];
    events.forEach((event) => {
      const eventDate = toLocalDateKey(event.timestamp || event);
      if (dateIndex[eventDate] !== undefined) {
        days[dateIndex[eventDate]].clicks += 1;
      }
    });
  });

  return days.map((day) => ({
    ...day,
    day: getDateLabel(day.date),
  }));
};

const getLinkRangeStats = (links, start, end) => {
  const startMs = start.getTime();
  const endMs = end.getTime();

  return links.map((link) => {
    const events = Array.isArray(link.clickEvents) ? link.clickEvents : [];
    const rangeClicks = events.filter((event) => {
      const timestamp = new Date(event.timestamp || event).getTime();
      return timestamp >= startMs && timestamp <= endMs;
    }).length;

    return {
      _id: link._id,
      title: link.title,
      url: link.url,
      icon: link.icon,
      category: link.category,
      clicks: link.clicks || 0,
      rangeClicks,
    };
  });
};

const getPreviousRange = (start, end) => {
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const previousEnd = new Date(start);
  previousEnd.setDate(start.getDate() - 1);
  previousEnd.setHours(23, 59, 59, 999);
  const previousStart = new Date(previousEnd);
  previousStart.setDate(previousEnd.getDate() - (days - 1));
  previousStart.setHours(0, 0, 0, 0);
  return { previousStart, previousEnd };
};

export const getAnalyticsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { range, startDate, endDate } = req.query;
    const requestingUser = await userModel.findById(req.user.id);

    if (!requestingUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (requestingUser.username !== username) {
      return res.status(403).json({ message: 'Forbidden: analytics access denied' });
    }

    const { start, end } = getRangeBounds(range, startDate, endDate);
    const { previousStart, previousEnd } = getPreviousRange(start, end);

    const links = await linkModel.find({ user: requestingUser._id }).sort({ clicks: -1 }).lean();
    const allLinksCount = links.length;
    const activeLinks = getLinkRangeStats(links, start, end);
    const totalClicks = activeLinks.reduce((sum, link) => sum + link.rangeClicks, 0);
    const averageClicks = allLinksCount ? Math.round(totalClicks / allLinksCount) : 0;
    const sortedByRangeClicks = [...activeLinks].sort((a, b) => b.rangeClicks - a.rangeClicks);
    const topLink = sortedByRangeClicks[0] || null;
    const mostClickedLinkPercentage = totalClicks && topLink ? Math.round((topLink.rangeClicks / totalClicks) * 100) : 0;
    const bestDay = countClickEventsByDay(links, start, end).reduce((best, item) => (item.clicks > best.clicks ? item : best), { day: '', clicks: 0 });
    const currentTimeline = countClickEventsByDay(links, start, end);
    const previousTimeline = countClickEventsByDay(links, previousStart, previousEnd);
    const previousTotalClicks = previousTimeline.reduce((sum, item) => sum + item.clicks, 0);
    const growthPercentage = previousTotalClicks === 0 ? 100 : Math.round(((totalClicks - previousTotalClicks) / previousTotalClicks) * 100);
    const clickThroughRate = allLinksCount ? Math.round((totalClicks / allLinksCount) * 100) : 0;
    const recentClickHistory = links
      .flatMap((link) =>
        (Array.isArray(link.clickEvents) ? link.clickEvents : []).map((event) => ({
          timestamp: event.timestamp || event,
          title: link.title,
          url: link.url,
          linkId: link._id,
        })),
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    return res.status(200).json({
      analytics: {
        totalLinks: allLinksCount,
        totalClicks,
        averageClicks,
        topLink,
        mostClickedLinkPercentage,
        bestDay,
        clickThroughRate,
        growthPercentage,
        dateRange: {
          from: start.toISOString().slice(0, 10),
          to: end.toISOString().slice(0, 10),
        },
        lastPeriod: {
          totalClicks: previousTotalClicks,
          rangeDays: previousTimeline.length,
        },
        lastDays: currentTimeline,
        links: activeLinks.sort((a, b) => b.rangeClicks - a.rangeClicks),
        recentClickHistory: recentClickHistory.map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to load analytics',
    });
  }
};
