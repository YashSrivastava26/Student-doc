const express = require("express");
const router = express.Router();
const verifyAndGetId = require("../middleware/tokenAuth");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

//Route 1: add note using POST : /api/notes/add-note  , token required
try {
    router.post(
        "/add-note",
        verifyAndGetId, 
        
        //validators
        body("title", "title can't be empty").exists(),
      
        async (req, res) => {
      
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          
          const new_note = new Notes({
            user_id: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
          })

          const savedNote = await new_note.save();
          res.json(savedNote);
          
        }
      );
} catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Erroe" });
  }


//Route 2: fecthing all notes using GET : /api/notes/fetch-notes  , token required
try {
    router.get(
        "/fetch-notes",
        verifyAndGetId, 
      
        async (req, res) => {
            const saved_file = await Notes.find({user_id: req.user.id});
            res.json(saved_file);
          
        }
      );
} catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Erroe" });
  }


//Route 3: updating note using PUT : /api/notes/update-note/:id  , token required
try {
    router.put(
        "/update-note/:id",
        verifyAndGetId, 
      
        async (req, res) => {
            let file = await Notes.findById(req.params.id);
            const {title, description, tag} = req.body;

            if(!file){
                return res.status(404).json({error: "file not found"});
            }

            const updateFile = {};
            if(title){updateFile.title = title};
            if(description){updateFile.description = description};
            if(tag){updateFile.tag = tag};

            if(file.user_id.toString() !== req.user.id){
                return res.status(401).json({error: "Acccess denied"});
            }

            file = await Notes.findByIdAndUpdate(req.params.id, {$set: updateFile}, {new: true})
            res.json(file);
        }
      );
} catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Erroe" });
  }



//Route 4: delete notes using DELETE : /api/notes/delete-note/:id  , token required
try {
    router.delete(
        "/delete-note/:id",
        verifyAndGetId, 
      
        async (req, res) => {
            let file = await Notes.findById(req.params.id);

            if(!file){
                return res.status(404).json({error: "file not found"});
            }

            if(file.user_id.toString() !== req.user.id){
                return res.status(401).json({error: "Acccess denied"});
            }

            file = await Notes.findByIdAndDelete(req.params.id);
            res.json({message: "sucessfully deleted"});
        }
      );
} catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Erroe" });
  }
module.exports = router;
