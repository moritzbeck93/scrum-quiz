const fs = require("fs");
const questions = require("../models/questions");

const Questions = require("../models/questions");

exports.getTestQuestions = (req, res, next) => {
  Questions.find()
    .then((questions) => {
      return shuffle(questions);
    })
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
