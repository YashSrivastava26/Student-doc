import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import EditWindow from './EditWindow'

import Card from 'react-bootstrap/Card';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const NoteCard = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note } = props;

    return (
        <>
            <Card className='container col-md-3 my-3' style={{ width: '18rem' }}>
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Card.Title>{note.title}</Card.Title>
                        <div className='d-flex'>
                            <DeleteOutlineOutlinedIcon className='mx-2' style={{ cursor: "pointer" }} onClick={() => { console.log("delete..."); deleteNote(note._id) }} />
                            <EditWindow note={note} />
                        </div>
                    </div>
                    <Card.Subtitle className="mb-2 text-muted"><small>{`Updated on: ${new Date(note.date).toDateString()}`}</small></Card.Subtitle>
                    <hr />
                    <Card.Text style={{ overflowWrap: 'break-word' }}>{note.description}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default NoteCard