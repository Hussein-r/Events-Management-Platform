let mongoos=require("mongoose");
AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoos.connection);
eventsSchema=new mongoos.Schema({
        title:{type:String,required:true},
        event_date:String,
        mainSpeaker:{type:Number,ref:"speakers"},
        otherSpeakers:[{type:Number,ref:"speakers"}]});
eventsSchema.plugin(AutoIncrement.plugin, 'events');
mongoos.model("events",eventsSchema);