import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    
    const context = useContext(noteContext);
    const { addNote } = context;

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        addNote(data.get('title'), data.get('description'), data.get('tag'));
        props.setUpdateActive(false);
    };
    return (
        <div className='container'>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus

                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="tag"
                    label="Tag"
                    id="tag"
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3}}
                >
                    Add Note
                </Button>
            </Box>
        </div>
    )
}

export default AddNote

