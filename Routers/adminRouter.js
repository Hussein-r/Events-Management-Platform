const express=require("express");
const adminRouter=express.Router();
adminRouter.use((request,response,next)=>
{
if(request.session.role=="admin"){
adminRouter.get("/profile",(request,response)=>{
    LoginName=request.body.LoginName;
    response.render("Home.ejs",{LoginName:"Eman"});})}})
module.exports=adminRouter;