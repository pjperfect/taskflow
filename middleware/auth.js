function requireAuth(req, res, next) {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing x-user-id header' });
  }
  req.userId = Number(userId);
  next();
}

// module.exports = { requireAuth };
export { requireAuth };
