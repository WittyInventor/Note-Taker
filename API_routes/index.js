const router = require(`express`).Router()
// this made our express router from this file

let notes = require(`../json_files/db.json`)

// "/notes"
const fs = require("fs")

const { v4: uuidv4 } = require('uuid');


router.get(`/notes`, (req, res) => {
    res.json(notes)
    console.log(`hello`)
}
)

router.post('/notes', (req, res) => {
    console.log("hello")
    if (req.body) {
        const {title, text} = req.body;
        notes.push({
            title:title,
            text:text,
            id: uuidv4()
        })
        writeToFile('../json_files/db.json', JSON.stringify(notes))

        res.json(notes)
    }
})


router.delete('/notes/:id', (req, res) => {
    console.log (req.params)
    if (req.params) {
        const {id} = req.params;
        console.log(id);
        const deletedNotes = notes.find(note => note.id ==id)
        if (deletedNotes) {
            notes = notes.filter(note=>note.id!=id);
            writeToFile('../json_files/db.json', JSON.stringify(notes))

            res.end(JSON.stringify(notes))
        } else {
            
            res.status(404).json({message: "Notes you are looking for does not exist"})
            }
        }

    })
        
function writeToFile(fileName, data) {
  console.log(`writeToFile`);
  fs.writeFileSync("json_files/db.json", data)
}


module.exports = router;
