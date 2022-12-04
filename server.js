const fs = require("fs")
const PORT = process.env.PORT || 3012;
// function readToFile(fileName) {
//     console.log(`readToFile`);
//     let bufferData = fs.readFileSync(fileName);
//     return JSON.parse(bufferData)
// }
// RETRIEVING THE NOTES of the file. this function's purpose is to read the file of db.json file. let bufferData is called a raw data which redefines into the fs.readFile Sync. Then it will return the JSON.parse (parse means converting regular data into the JSON data format of code.)
const api = require (`./API_routes`)

// let notesFromFile = readToFile('.json files/db copy.json');
//  reading the information from the db.json file and STORING it into the notes file variable (let notesFromFile)
// console.log(notesFromFile);
// notesFromFile.push({ title: 'new Test Title', text: 'new Test text' })
// pushing the json object information inside an array 

// console.log(notesFromFile);


// function writeToFile(fileName, data) {
//   console.log(`writeToFile`);
//   return fs.writeFileSync(fileName, data)
// }
// writing the data from the json file.

// writeToFile('db copy.json', JSON.stringify(notesFromFile));
// json stringify means converting the json object (of notes) into a string. 

const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// "/notes"
app.use('/api', api);

app.use(express.static('public'));


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// this code is setting the path for talking and connecting with the live local website and notes.html file. when the user requests the notes browser page, then the user would get it. 

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
// the * means any other browser page on the local live website. similar to previous code but will send the index.html file 

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
// this code means its running the service on a specific port.