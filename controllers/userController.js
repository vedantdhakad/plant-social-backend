const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        tips: true,
        userPlants: { include: { plant: true, badges: { include: { badge: true } } } },
        followers: { include: { follower: true } },
        following: { include: { following: true } },
      },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  if (req.user.userId !== req.params.id) return res.status(403).json({ message: 'Not authorized' });
  const { name, bio, avatarUrl } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, bio, avatarUrl },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

exports.followUser = async (req, res) => {
  if (req.user.userId === req.params.id) return res.status(400).json({ message: 'Cannot follow yourself' });
  try {
    await prisma.follow.create({
      data: { followerId: req.user.userId, followingId: req.params.id },
    });
    res.json({ message: 'Followed user' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to follow user', error: err.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    await prisma.follow.deleteMany({
      where: { followerId: req.user.userId, followingId: req.params.id },
    });
    res.json({ message: 'Unfollowed user' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unfollow user', error: err.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const followers = await prisma.follow.findMany({
      where: { followingId: req.params.id },
      include: { follower: true },
    });
    res.json(followers.map(f => f.follower));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch followers', error: err.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const following = await prisma.follow.findMany({
      where: { followerId: req.params.id },
      include: { following: true },
    });
    res.json(following.map(f => f.following));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch following', error: err.message });
  }
};

exports.getUserTips = async (req, res) => {
  try {
    const tips = await prisma.tip.findMany({
      where: { userId: req.params.id },
      orderBy: { createdAt: 'desc' },
      include: { plant: true },
    });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user tips', error: err.message });
  }
};

exports.getUserPlants = async (req, res) => {
  try {
    const userPlants = await prisma.userPlant.findMany({
      where: { userId: req.params.id },
      include: { plant: true, badges: { include: { badge: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(userPlants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user plants', error: err.message });
  }
};

exports.getSocialFeed = async (req, res) => {
  try {
    // Get IDs of users the current user is following
    const following = await prisma.follow.findMany({
      where: { followerId: req.user.userId },
      select: { followingId: true },
    });
    const followingIds = following.map(f => f.followingId);
    // Get tips from followed users
    const tips = await prisma.tip.findMany({
      where: { userId: { in: followingIds } },
      orderBy: { createdAt: 'desc' },
      include: { user: true, plant: true },
      take: 50,
    });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch social feed', error: err.message });
  }
}; 