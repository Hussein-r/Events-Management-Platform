let mongoos=require("mongoose");
require("./../Models/SpeakerModel");
speakermodel=mongoos.model("speakers");
const express=require("express");
const speakerRouter= express.Router();
//eventmodel=mongoos.model("events");
speakerRouter.use((request,response,next)=>
{
if(request.session.role=="admin"){


speakerRouter.get("/list",(request,response)=>{
speakermodel.find({}).then((data)=>{{response.render("speakers/speakers.ejs",{data:data})}}).catch((error)=>{response.send(error)})
    //response.send("list speaker")
})
speakerRouter.get("/add",(request,response)=>{
    response.send("list speaker")
})


speakerRouter.get("/edit/:_id?",(request,response)=>{
    console.log(request.params);
    speakermodel.find({_id:request.params._id}).then((data)=>{{response.render("speakers/speakersEdit.ejs",{data:data})}}).catch((error)=>{response.send(error)}) 
})
speakerRouter.post("/edit",(request,response)=>{
    console.log(request.body);
    speakermodel.update({_id:request.body._id},{$set:{FullName:request.body.FullName,UserName:request.body.UserName,"Address.city":request.body.city,"Address.street":request.body.street,"Address.building":request.body.building}},{}).then((data)=>{response.send(data)}).catch((error)=>{response.send(error+"")})
    response.redirect("http://localhost:8085/speakers/list");
})
speakerRouter.get("/delete/:_id?",(request,response)=>{
    console.log(request.params);
    speakermodel.deleteOne({_id:request.params._id}).then((data)=>{response.redirect("http://localhost:8085/speakers/list")}).catch((error)=>{response.send(error+"")})
    
})



}
else if(request.session.role=="speaker"){
    speakerRouter.get("/home",(request,response)=>{
        response.render("speakerhome.ejs");
    })
    speakerRouter.get("/profile",(request,response)=>{
        id=request.session._id;
        speakermodel.find({_id:id}).then((data)=>{{response.render("speakersprofile.ejs",{data:data})}}).catch((error)=>{response.send(error)});
    })
    speakerRouter.get("/events",(request,response)=>{
        id=request.session._id;
        console.log(id);
        eventmodel.find({mainSpeaker:id}).then((data)=>{{response.render("speakerevents.ejs",{data:data})}}).catch((error)=>{response.send(error)});
    })
    

} 
else{
    response.redirect("/login");
    }
next();
})


module.exports=speakerRouter;