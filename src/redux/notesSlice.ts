import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    notesData : [],
    notesNotFetched : true
}

export const fetchNotes = createAsyncThunk("fetchNotes", async () => {
    const response = await axios.get("/api/notes/fetchNotes");
    return response.data.notes;        
})

export const addNote = createAsyncThunk("addNote", async (note:any) =>{
    const response = await axios.post("api/notes/addNote", note);
    return response.data.note;
})

export const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{

    },
    extraReducers:builder => {
        builder
            .addCase(fetchNotes.fulfilled, (state, action)=>{
                state.notesData = action.payload;
                state.notesNotFetched = false;
                // console.log(state.notesData);    
            })
            .addCase(addNote.fulfilled, (state, action) =>{
                state.notesData.concat(action.payload);
            })
    }
})
// export const notesSlice = createSlice({
//     name: "notes",
//     initialState,
//     reducers:{
//         getNotes:async (state) =>{
//             const notes =  await response.data.notes;
//             console.log(notes);
//             state.notesData = notes;

//         },

//         addNote: async (state,action) => {
//             const response = await axios.post("api/notes/createNote", action.payload);
//             console.log(response);
//             const note = await response.data.note;
//             state.notesData = state.notesData.concat(note);
//         },

//         deleteNote: async (state,action) => {
//             const response = await axios.delete("api/notes/deleteNote", action.payload);
//             console.log(response);
//             const newNotes = state.notesData.filter((note)=>{
//                 return note.id != action.payload.id;
//             })

//             state.notesData = newNotes
//         },

//         editNote : async (state,action) => {
//             const {id, title, body} = action.payload;
//             const response = await axios.put("api/noets/editNote");
//         }


//     }
// })
// export const {getNotes, addNote, deleteNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;



 