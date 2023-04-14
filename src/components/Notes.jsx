import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import noteContext from '../context/notes/noteContext';
import NoteCard from './NoteCard';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';

function Notes() {
  const context = useContext(noteContext);
  const { notes, fetchNotes } = context;
  const [updateActive, setUpdateActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
      fetchNotes();
    }
    else{
      navigate('/sign-in')
    }
  }, [])

  const handleAddNote = () => {
    setUpdateActive(true);
  }
  return (
    <>
      {updateActive && <AddNote setUpdateActive={setUpdateActive} />}
      {updateActive === false &&
        <>
          <div className="my3 container">
            <h1>Notes</h1>
          </div>
          <div className="container">
            <div className="row my-3">
              {notes.map((note) => {
                return <NoteCard key={note._id} note={note} />;
              })}
            </div>
          </div>
      <Fab
          color="secondary"
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={handleAddNote}
        >
          <AddIcon />
        </Fab>
        </>
      }
    </>
  )
}

export default Notes;