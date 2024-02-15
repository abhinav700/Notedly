"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useSelector } from "react-redux";
import { AddNoteModal } from "./AddNoteModal";
import { useAppDispatch } from "@/redux/hooks";
import { fetchNotes } from "@/redux/notesSlice";
import Noteitem from "./NoteItem";

// const fetchNotes = async () => {
//   const response = await axios.get("/api/notes/fetchNotes");
//   const notes = response.data.notes;
//   console.log(notes);
// };
function Notes() {
  const user = useSelector((state: any) => state.user);
  const notes = useSelector((state: any) => state.notes.notesData);
  const notesNotFetched = useSelector(
    (state: any) => state.notes.notesNotFetched
  );
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  if (notesNotFetched) dispatch(fetchNotes());

  console.log(notes);

  return (
    <div>
      <AddNoteModal />
      {notes
        ? notes.map((item: { body: string; title: string }) => {
            return <Noteitem note={item} />;
          })
        : null}
    </div>
  );
}

export default Notes;
