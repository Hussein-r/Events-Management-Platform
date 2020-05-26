let mongoos=require("mongoose");
AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoos.connection);
SpeakerSchema=new mongoos.Schema({
    FullName:String,
    UserName:String,
    Password:String,
    Address:{
        city:String,
        street:String,
        building:Number
    }
})
SpeakerSchema.plugin(AutoIncrement.plugin, 'Speakers');
mongoos.model("speakers",SpeakerSchema);
