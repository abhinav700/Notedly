"use client"
import axios from 'axios'
import React from 'react'
import { useCookies } from 'next-client-cookies';

function    Notes() {
  const fetchNotes = async () =>{
    const response = await axios.get('/api/notes/fetchNotes')
    const notes = response.data.notes;
    console.log(notes);
  }
  fetchNotes()
  return (
    <div>Notes Page</div>
  )
}

export default Notes