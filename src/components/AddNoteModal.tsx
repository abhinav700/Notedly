"use client";
import { useAppDispatch } from "@/hooks";
import { addNote } from "@/store/notesSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const AddNoteModal = () => {
  const [note, setNote] = useState({title:"", body:""});
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = async (e: any) => {
    e.preventDefault();
    dispatch(addNote(note));
    setShow(false);
    router.push("/notes")
  };

  const onChange = (e: any) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <button
       onClick={(e)=>{e.preventDefault; setShow((show)=>true)}}
       className="bg-blue-400 text-black-500 px-2 py-1 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 focus:outline-none focus:shadow-outline">
        Create Note
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add a note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container my-3 flex justify-center items-center flex-col">
        <form className="w-11/12">
          <div className="mb-3 my-3">
            <label
              htmlFor="title"
              className="mx-4 block text-sm font-semibold text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              className="mx-3 w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              id="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              name="title"
              value={note.title}
            />
            <div id="titletext" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="body"
              className="mx-4 block text-sm font-semibold text-gray-600"
            >
              Body
            </label>
            <input
              type="text"
              className="mx-3 w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              id="body"
              onChange={onChange}
              name="body"
              value={note.body}
            />
          </div>
        </form>
        <button
          disabled={note.title.length < 5 || note.body.length < 5}
          className="w-3/4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};
