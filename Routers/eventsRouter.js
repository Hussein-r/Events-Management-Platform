const mongoos=require("mongoose");
const express=require("express");
eventsRouter=express.Router();
require("./../Models/EventsModel");
require("./../Models/SpeakerModel")
speakermodel=mongoos.model("speakers")
eventmodel=mongoos.model("events")
eventsRouter.use((request,response,next)=>
{
if(request.session.role=="admin"){



eventsRouter.get("/list",(request,response)=>{
    eventmodel.find({}).populate({path:"mainSpeaker otherSpeakers"}).then((data)=>{response.render("events/events.ejs",{data:data})}).catch((error)=>{response.send(error)})
})


eventsRouter.get("/add",(request,response)=>{
    console.log(request.body);
    speakermodel.find().then((data)=>{response.render("events/AddEvent.ejs",{speakers_data:data})}).catch((error)=>{response.send(error+"")})
    ;
})
eventsRouter.post("/add",(request,response)=>{
    console.log(request.body);
    let event=new eventmodel({title:request.body.title,event_date:request.body.event_date,mainSpeaker:request.body.mainSpeaker,otherSpeakers:request.body.otherSpeakers})
    event.save();
    response.redirect("http://localhost:8085/event/list");
})
eventsRouter.get("/delete/:_id?",(request,response)=>{
    console.log(request.params);
    eventmodel.deleteOne({_id:request.params._id}).then((data)=>{response.redirect("/event/list")}).catch((error)=>{response.send(error+"")})
    })
eventsRouter.get("/edit/:_id?",(request,response)=>{
    console.log(request.params);
    speakermodel.find().then((data)=>{speakers_data=data}).catch((error)=>{response.send(error+"")})
    eventmodel.find({_id:request.params._id}).populate({path:"mainSpeaker otherSpeakers"}).then((data)=>{response.render("events/eventsEdit.ejs",{events_data:data,speakers_data})}).catch((error)=>{response.send(error+"")})})
eventsRouter.post("/edit",(request,response)=>{
    eventmodel.update({_id:request.body.id},{$set:{title:request.body.title,event_date:request.body.event_date,mainSpeaker:request.body.mainSpeaker,otherSpeakers:request.body.otherSpeakers}},{}).then((data)=>{response.redirect("http://localhost:8085/event/list")}).catch((error)=>{response.send(error+"")})
})
}
else
    response.redirect("/login");
    next();
})

module.exports=eventsRouter;