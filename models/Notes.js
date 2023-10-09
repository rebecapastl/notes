const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title:{
        type:String, 
        required:[true, 'The note must have a title.']
    },
    content:{
        type:String,
        required:[true, 'The note must have a content.']
    },    
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;