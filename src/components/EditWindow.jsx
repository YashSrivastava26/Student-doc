import React, { useState , useContext } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from '@mui/material/Modal';
import noteContext from '../context/notes/noteContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [note, setNote] = useState({title: props.note.title, description: props.note.description, tag: props.note.tag});
    const context = useContext(noteContext);
    const {editNote} = context;
    
    const handleOnChange=(e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    }

    const handleSubmit=()=>{
        editNote(props.note._id, note.title, note.tag, note.description);
        handleClose();
    }

    return (
        <div>
            <EditIcon className='mx-2' style={{ cursor: "pointer" }} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Form className='container'>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name='title' type="text" value={note.title} placeholder="Title" onChange={handleOnChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Tag</Form.Label>
                            <Form.Control name='tag' type="text" value={note.tag} placeholder="Tag" onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' as="textarea" rows={5} value={note.description} placeholder="Description" onChange={handleOnChange} />
                        </Form.Group>
                    </Form>
                    <div className="container">
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Update Note
                        </Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
