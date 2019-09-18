"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();
//todo mundo pode acessa a aplicação.
app.use((0, _cors2.default)());

var server = require("http").Server(app);
var io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on("connectRoom", function(box) {
    socket.join(box);
  });
});

_mongoose2.default.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-7zpqg.mongodb.net/omnistack6?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(function(req, res, next) {
  req.io = io;

  return next();
});

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use(
  "/files",
  _express2.default.static(_path2.default.resolve(__dirname, "..", "tmp"))
);

app.use(require("../../src/routes"));

server.listen(process.env.PORT || 3030);
//# sourceMappingURL=server.js.map
