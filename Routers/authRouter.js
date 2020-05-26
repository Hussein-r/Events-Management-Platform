const express = require("express");
let mongoos = require("mongoose");
require("./../Models/SpeakerModel");
speakermodel = mongoos.model("speakers");
const authenticationRouter = express.Router();
authenticationRouter.get("/login/:name?/:password?", (request, response) => {
  console.log(request.body);
  response.render("authentication/login.ejs");
});
authenticationRouter.post("/AddSpeaker", (request, response) => {
  console.log(request.body);
  let speakers = new speakermodel({
    FullName: request.body.FullName,
    UserName: request.body.UserName,
    Password: request.body.Password,
    "Address.city": request.body.city,
    "Address.street": request.body.street,
    "Address.building": request.body.building,
  });
  speakers.save();
  response.redirect("http://localhost:8085/login");
});
authenticationRouter.post("/login", (request, response) => {
  console.log(request.body);
  LoginName = request.body.UserName;
  if (request.body.UserName == "Eman" && request.body.Password == "123") {
    request.session.role = "admin";
    response.redirect("/admin/profile");
  } else {
    speakermodel
      .findOne({
        UserName: request.body.UserName,
        Password: request.body.Password,
      })
      .then((data) => {
        console.log(data);

        if (data != null) {
          request.session._id = data._id;
          console.log(data._id);
          request.session.name = data.UserName;
          response.locals.speakerName = request.session.name;
          request.session.role = "speaker";
          response.redirect("/speakers/home");
        } else {
          response.redirect("/login");
        }
      });
  }
});
authenticationRouter.get("/register", (request, response) => {
  response.render("authentication/register.ejs");
});
/*authenticationRouter.post("/register", (request, response) => {
    response.redirect("/speakers/add");
})*/
authenticationRouter.get("/logout", (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    response.redirect("/login");
  });
});
module.exports = authenticationRouter;
