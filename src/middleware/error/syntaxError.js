// json format not match

module.exports = (error, req, res, next) => {
  if (error.name === "SyntaxError") {
    res.status(400).json({ error: error.message });
    return;
  }
  next(error);
};
