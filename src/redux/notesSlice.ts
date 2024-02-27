import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    notesData : [],
    notesNotFetched : true
}

export const fetchNotes = createAsyncThunk("fetchNotes", async () => {
    const response = await axios.get("/api/notes/fetchNotes");
    return await response.data.notes;        
})

export const addNote = createAsyncThunk("addNote", async (note:any) =>{
    const response = await axios.post("api/notes/createNote", note);
    return await response.data.note;
})
export const deleteNote = createAsyncThunk("deleteNote", async (id:any)=>{
    const response = await axios.delete("api/notes/deleteNote", {data:{id} });
    console.log(response);
    return {id};
})
export const editNote = createAsyncThunk("editNote", async (note:any) =>{
    const response = await axios.put("api/notes/editNote",{id:note._id, title:note.title, body:note.body});
    const updatedNote:any = await response.data.note;
    // console.log(updatedNote)
    
    return {note: updatedNote};


})
export const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{
        intializeNotes:(state,action)=>{
            console.log("INITIALIZE NOTES EXECUTED")
            state = {
                ...state,
                notesData:[],
                notesNotFetched:true
            }
        }
    },
    extraReducers:builder => {
        builder
            .addCase(fetchNotes.fulfilled, (state, action)=>{
                console.log("PRINTING STATE FETCHNOTES: ",state);
                state = {
                    notesData: action.payload,
                    notesNotFetched:false
                }
            })
            .addCase(addNote.fulfilled, (state, action) =>{
                state = {
                    ...state,
                    notesData:state.notesData.concat(action.payload),
                }
            })
            .addCase(deleteNote.fulfilled,(state,action)=>{
                let newNotesData:any = state.notesData.filter((note:any)=>{
                    return note._id != action.payload.id;
                })
                console.log(newNotesData);
                state = {
                    ...state,
                    notesData:newNotesData
                }
            })
            .addCase(editNote.fulfilled, (state, action) =>{
                // console.log(action.payload);    
                const id = action.payload.note._id;
                let newNotesData : any = state.notesData;
                for(let i = 0; i<newNotesData.length;i++){
                    if(newNotesData[i]._id == id){
                        newNotesData[i] = action.payload;
                        break;
                    }
                }
                state = {
                    ...state,
                    notesData : newNotesData
                }
            })
    }
})

export const {intializeNotes} = notesSlice.actions;
export default notesSlice.reducer;



 