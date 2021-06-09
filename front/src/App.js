import React, { useState, useEffect } from 'react';
import Compress from 'compress.js';
import axios from 'axios';

function App() {
  const [image, setImage] = useState();
  const [sucess, setSuccess] = useState(false);
  const [originalFile, setOriginalFile] = useState();

  const onChangeUpload = async (e) => {
    setSuccess(false);
    const file = e.target.files[0];
    const compress = new Compress();

    setOriginalFile(file);

    await compress.compress([file], {
      size: 4,
      quality: .75,
      maxWidth: 300,
      maxHeight: 300,
      resize: true
    }).then(data => {
      const img = data[0];
      const base64str = img.data;
      const imgExt = img.ext;
      const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
      setImage(resizedFile);
    });
  };

  const onUpload = async () => {
    setSuccess(false);
    try {
      const formData = new FormData();

      formData.append('image', image, originalFile.name);

      await axios.post('http://localhost:2021/upload', formData);

      setImage();
      setSuccess(true);
      setOriginalFile();
    } catch (error) {
      setSuccess(false);
    }
  };

  const convertImageBlob = () => {
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(image);
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <h3>Upload de Imagens</h3>
      <div>
        <input type="file" onChange={e => onChangeUpload(e)} />
        <button onClick={() => onUpload()}>
          Upload
        </button>
      </div>
      {
        image &&
        <div style={{ marginTop: '20px' }}>
          <img src={convertImageBlob()} />
        </div>
      }
      {
        sucess &&
        <h4>Upload realizado com sucesso</h4>
      }
    </div>
  );
}

export default App;
