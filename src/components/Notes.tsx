"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import  AddNoteModal  from "./AddNoteModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchNotes } from "@/redux/notesSlice";
import Noteitem from "./NoteItem";

// const fetchNotes = async () => {
//   const response = await axios.get("/api/notes/fetchNotes");
//   const notes = response.data.notes;
//   console.log(notes);
// };
function Notes() {
  const user = useAppSelector((state: any) => state.user);
  const notes = useAppSelector((state: any) => state.notes.notesData);
  const notesNotFetched = useAppSelector((state: any) => state.notes.notesNotFetched);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  if (notesNotFetched) dispatch(fetchNotes());

  console.log(notes);

  return (
    <div>
      <AddNoteModal />
      {
        <div className="flex flex-wrap space-x-3">
        {notes
          ? notes.map((item: any) => {
              return <Noteitem  note={item} />;
            })
          : null}
      </div>
      
      }
    </div>
  );
}

export default Notes;
