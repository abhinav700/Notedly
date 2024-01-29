import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        default:"",
        required:true
    },
    body:{
        type:String,
        default:"",
        required:true
    },
    create_date:{
        type:Date,
        default:Date.now,
        required:true,
    },
    user:{
        default:"",
        type:String,
        required:true,
    }
})

const Note = mongoose.models.notes ?? mongoose.model("notes", noteSchema);
export default Note;