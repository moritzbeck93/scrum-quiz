exports.get404 = (req, res, next) => {
  res.status(404);
  res.json("404", {
    message: err.message,
    error: err,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500);
  res.json("500", {
    message: err.message,
    error: err,
  });
};
