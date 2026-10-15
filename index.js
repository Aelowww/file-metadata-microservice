// File Metadata Microservice - freeCodeCamp Back End Development and APIs
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// keep uploads in memory - we only need the metadata
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/', (req, res) => {
  res.send('<h1>File Metadata Microservice</h1>' +
    '<form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">' +
    '<input id="inputfield" type="file" name="upfile"> ' +
    '<input id="button" type="submit" value="Upload"></form>');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// POST /api/fileanalyse (field: upfile) -> { name, type, size }
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
