import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';


export const createLink = async (req, res) => {
    const user = req.user;
    const { title, url, icon = "", category = "" } = req.body;

    if (!title || !url) {
        return res.status(400).json({
            message: 'Title and URL are required',
        });
    }

    try {
        const newLink = await linkModel.create({
            user: user.id,
            title,
            url,
            icon,
            category,
        });

        return res.status(201).json({
            message: 'Link created successfully',
            link: newLink,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to create link',
        });
    }
};

export const getUserLinks = async (req, res) => {
    const user = req.user;

    const links = await linkModel.find({ user: user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
        message: 'User links retrieved successfully',
        links,
    });
};

export const updateLink = async (req, res) => {
    const user = req.user;
    const { linkId } = req.params;
    const { title, url, icon = "", category = "" } = req.body;

    const link = await linkModel.findById(linkId);
    if (!link) {
        return res.status(404).json({ message: 'Link not found' });
    }

    if (link.user.toString() !== user.id) {
        return res.status(403).json({ message: 'Forbidden: cannot edit this link' });
    }

    link.title = title || link.title;
    link.url = url || link.url;
    link.icon = icon;
    link.category = category;

    await link.save();

    return res.status(200).json({
        message: 'Link updated successfully',
        link,
    });
};

export const deleteLink = async (req, res) => {
    const user = req.user;
    const { linkId } = req.params;

    const link = await linkModel.findById(linkId);
    if (!link) {
        return res.status(404).json({ message: 'Link not found' });
    }

    if (link.user.toString() !== user.id) {
        return res.status(403).json({ message: 'Forbidden: cannot delete this link' });
    }

    await link.deleteOne();

    return res.status(200).json({
        message: 'Link deleted successfully',
    });
};

export const getLinksByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    const links = await linkModel.find({ user: user._id });

    return res.status(200).json({
        message: 'Links retrieved successfully',
        links,
    });
};

export const incrementLinkClick = async (req, res) => {
    const { linkId } = req.params;

    const link = await linkModel.findById(linkId);

    if (!link) {
        return res.status(404).json({
            message: 'Link not found',
        });
    }

    link.clicks += 1;
    link.clickEvents = link.clickEvents || [];
    link.clickEvents.push({ timestamp: new Date() });

    await link.save();

    return res.status(200).json({
        message: 'Link click incremented successfully',
        link,
    });
};