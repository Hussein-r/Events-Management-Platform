let express = require("express");
let path = require("path");
let authenticationRouter = require("./Routers/authRouter.js");
let speakerRouter = require("./Routers/speakerRouter.js");
let eventsRouter = require("./Routers/eventsRouter.js");
let adminRouter = require("./Routers/adminRouter.js");
let mongoos = require("mongoose");
let session = require("express-session");

mongoos
  .connect("mongodb://localhost:27017/MyDB")
  .then(() => {
    console.log("DB Connected ...");
  })
  .catch((error) => {
    console.log(error);
  });
const server = express();
server.listen(8085, () => {
  console.log("I am listening on 8085....");
});
server.use(function (request, response, next) {
  console.log("First Middle ware " + request.method + " : " + request.url);
  next();
});

server.use(express.urlencoded());

server.use(
  session({ secret: "hussein", saveUninitialized: true, resave: true })
);
server.get("/home", function (request, response) {
  response.send("HOME Page");
});
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "node_modules")));

server.use(authenticationRouter);
server.use((request, response, next) => {
  console.log(request.session.role);
  if (request.session.role) {
    next();
  } else {
    response.redirect("/login");
  }
});

server.use("/speakers", speakerRouter);
server.use("/event", eventsRouter);
server.use("/admin", adminRouter);
server.use((request, response) => {
  response.send("Default Page");
});
