import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';

const buildLast7DaysData = (links) => {
  const now = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    date.setHours(0, 0, 0, 0);
    return {
      date: date.toISOString().slice(0, 10),
      clicks: 0,
      newLinks: 0,
    };
  });

  const dateIndex = Object.fromEntries(days.map((day, idx) => [day.date, idx]));

  links.forEach((link) => {
    const createdDate = link.createdAt.toISOString().slice(0, 10);
    if (dateIndex[createdDate] !== undefined) {
      days[dateIndex[createdDate]].newLinks += 1;
    }

    link.clickEvents?.forEach((eventDate) => {
      const dayKey = new Date(eventDate).toISOString().slice(0, 10);
      if (dateIndex[dayKey] !== undefined) {
        days[dateIndex[dayKey]].clicks += 1;
      }
    });
  });

  return days;
};

export const getAnalyticsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const requestingUser = await userModel.findById(req.user.id);

    if (!requestingUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (requestingUser.username !== username) {
      return res.status(403).json({ message: 'Forbidden: analytics access denied' });
    }

    const links = await linkModel.find({ user: requestingUser._id }).sort({ clicks: -1 });
    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
    const averageClicks = totalLinks ? Math.round(totalClicks / totalLinks) : 0;
    const topLink = links[0] || null;
    const last7Days = buildLast7DaysData(links);

    return res.status(200).json({
      analytics: {
        totalLinks,
        totalClicks,
        averageClicks,
        topLink,
        last7Days,
        links: links.map((link) => ({
          _id: link._id,
          title: link.title,
          url: link.url,
          clicks: link.clicks,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to load analytics',
    });
  }
};
