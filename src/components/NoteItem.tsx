"use client";
import { useAppDispatch } from "@/redux/hooks";
import { deleteNote, editNote } from "@/redux/notesSlice";
import React, { useState } from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

const Noteitem = (props: any) => {
  const [note, setNote] = useState(props.note);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showViewModal, setshowViewNoteModal] = useState(false);

  const handleEditShow = (e: any) => {
    e.stopPropagation();
    setShowEditModal(true);
  };
  const handleEditClose = () => setShowEditModal(false);
  const handleDeleteShow = (e: any) => {
    e.stopPropagation();
    setshowDeleteModal(true);
  };
  const handleDeleteClose = () => setshowDeleteModal(false);
  const handleViewNoteShow = () => setshowViewNoteModal(true);
  const handleViewNoteClose = () => setshowViewNoteModal(false);

  const dispatch = useAppDispatch();

  const handleEditConfirm = async (e: any) => {
    e.preventDefault();

    dispatch(editNote(note));
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async (e: any) => {
    e.preventDefault();
    dispatch(deleteNote(note._id));
    setshowDeleteModal(false);
  };
  const onChange = (e: any) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div style={{ height: "20rem", width: "18rem" }}>
        <Card
          onClick={handleViewNoteShow}
          style={{ width: "100%", height: "80%" }}
          className="mx-4 mt-3 hover:border-black cursor-pointer"
        >
          <Card.Body>
            <Card.Title>
              {
                <Card.Title>
                  {note.title?.length <= 54
                    ? note.title
                    : note.title?.substr(0, 58) + "..."}
                </Card.Title>
              }
            </Card.Title>
            {
              <Card.Text style={{ height: "65%" }}>
                {note.body?.length <= 300
                  ? note.body
                  : note.body?.substr(0, 250) + "..."}
              </Card.Text>
            }
          </Card.Body>
          <div className="mx-1 flex-row">
            <i
              className="bi bi-pencil-square hover:cursor-pointer"
              onClick={handleEditShow}
            ></i>
            <i
              className="bi mx-3 bi-trash3 hover:cursor-pointer"
              onClick={handleDeleteShow}
            ></i>
          </div>
        </Card>
      </div>
      {/* Modal for viewing Notes */}
      <Modal show={showViewModal} onHide={handleViewNoteClose}>
        <Modal.Header closeButton>
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container my-3">
            <div>{note.body}</div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for editing notes */}
      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title> Edit the note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container my-3 flex justify-center items-center flex-col">
            <form className="w-11/12">
              <div className="mb-3 my-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
                  className="block text-sm font-semibold text-gray-600"
                >
                  Body
                </label>
                <textarea
                  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="body"
                  rows={4}
                  cols={50}
                  onChange={onChange}
                  name="body"
                  value={note.body}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button
            disabled={note.title?.length < 5 || note.body?.length < 5}
            variant="primary"
            onClick={handleEditConfirm}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Model */}
      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to delete this note?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
Noteitem.displayName = "Noteitem";
export default Noteitem;
