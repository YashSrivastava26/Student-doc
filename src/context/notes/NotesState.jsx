import { useState } from 'react';
import NoteContext from './noteContext';

const NotesState = (props) => {
    const host = "http://localhost:3001"

    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetch-notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add Note
    const addNote = async(title, description, tag) => {
        const response = await fetch(`${host}/api/notes/add-note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        setNotes([...notes, json]);
    }

    //Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(notes.filter((note) => {
            return note._id !== id
        }))
    }

    //Edit Note
    const editNote = async(id, title, tag, description) => {
        const response = await fetch(`${host}/api/notes/update-note/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();


        let deepCopyNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < deepCopyNotes.length; index++) {
            if (deepCopyNotes[index]._id == id) {
                deepCopyNotes[index].title = title;
                deepCopyNotes[index].description = description;
                deepCopyNotes[index].tag = tag;
                break;
            }
        }
        setNotes(deepCopyNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;
