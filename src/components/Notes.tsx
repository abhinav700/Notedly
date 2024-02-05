"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useSelector } from "react-redux";
import { AddNoteModal } from "./AddNoteModal";
import { useAppDispatch } from "@/hooks";

const fetchNotes = async () => {
  const response = await axios.get("/api/notes/fetchNotes");
  const notes = response.data.notes;
  console.log(notes);
};
function Notes() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  fetchNotes();
  const notes = useSelector((state: any) => state.notes);

  return (
    <div>
      <AddNoteModal/>
      {/* <Addnote /> */}
    </div>
  );
}

export default Notes;
