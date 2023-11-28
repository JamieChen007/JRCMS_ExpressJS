// unique field duplicate

module.exports = (error, req, res, next) => {
  if (error.code === 11000) {
    res.status(400).json({ error: error.message });
    return;
  }
  next(error);
};
