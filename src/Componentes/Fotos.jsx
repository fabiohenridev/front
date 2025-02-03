import React, { useState } from 'react';
import './Foto.css';

const PhotoUploader = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para erro
  const [successMessage, setSuccessMessage] = useState(''); // Estado para sucesso

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setErrorMessage('');  // Limpar mensagem de erro ao alterar arquivo
    setSuccessMessage(''); // Limpar mensagem de sucesso ao alterar arquivo
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Por favor, selecione um arquivo para enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch('http://localhost:3000/upload-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a imagem. Tente novamente.');
      }

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);  // Caso o servidor envie um erro
      } else {
        setSuccessMessage(data.message);  // Caso o upload seja bem-sucedido
      }
    } catch (error) {
      setErrorMessage(error.message || 'Erro desconhecido ao enviar a imagem');
      console.error('Erro ao enviar imagem:', error);
    }
  };

  return (
    <div>
      <input
        id='fileUpload'
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <label htmlFor='fileUpload' className='buttonFoto'>
      <i class="bi bi-file-image photo"></i>
      </label>
      <button onClick={handleUpload}>Enviar Foto</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default PhotoUploader;
