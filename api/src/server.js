const express = require('express');
const cors = require('cors');
const multer = require('multer');
const multerConfig = require('./config/multer');

const app = express();
const upload = multer(multerConfig);

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    
    if (!file)
        return res.status(400).json({ msg: 'Error!' });

    return res.status(200).json({ msg: 'Success!' });
});

app.listen('2021', () => console.log('Server Init'));