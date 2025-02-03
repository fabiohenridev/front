import { useState } from 'react';
import './Main.css';
import Mensagens from './Mensagens';

export default function Main() {
    const [nome, setNome] = useState('');
    const [texto, setTexto] = useState('');
    const [file, setFile] = useState(null);
    const [mensagens, setMensagens] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');  // Estado para a visualização da imagem

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setErrorMessage('');
        setSuccessMessage('');
        
        // Exibe a imagem imediatamente após a seleção
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setImagePreview(fileReader.result);  // Definir imagem de pré-visualização
        };
        if (selectedFile) {
            fileReader.readAsDataURL(selectedFile);
        }
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
                setErrorMessage(data.error);
            } else {
                setSuccessMessage(data.message);
                return data.fileUrl; // Retorna a URL da imagem
            }
        } catch (error) {
            setErrorMessage(error.message || 'Erro desconhecido ao enviar a imagem');
            console.error('Erro ao enviar imagem:', error);
        }
    };

    const EnviarDados = async (e) => {
        e.preventDefault();

        const Dados = { nome, texto };
        let imageUrl = '';

        if (file) {
            imageUrl = await handleUpload();  // Obtém a URL da imagem após o upload
        }

        const mensagem = { nome, texto, imageUrl };  // Cria a mensagem

        // Envia a mensagem para o backend
        fetch('https://3767-187-19-242-1.ngrok-free.app/Dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify(Dados),
        })
            .then(() => {
                console.log("Mensagem enviada");
                setTexto('');
                setFile(null);
                setImagePreview('');  // Limpa a imagem de pré-visualização após o envio
                setMensagens([...mensagens, mensagem]);  // Adiciona a nova mensagem à lista
            })
            .catch((erro) => {
                console.log("Erro ao enviar dados", erro);
            });
    };

    return (
        <div>
            <Mensagens mensagens={mensagens} />
            <main className="Main">
                <div className="Buttons">
                    <div className="BotoesMensagens">
                        <input type="text"
                            placeholder="Nome obrigatório"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <div className="Enviar">
                            <input type="email"
                                value={texto}
                                placeholder="Mensagem"
                                onChange={(e) => setTexto(e.target.value)}
                            />
                            <button onClick={EnviarDados}><i className="bi bi-send-fill BotaoEnviar"></i></button>
                            <div className='Photosss'>
                                <input
                                    id='fileUpload'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <label htmlFor='fileUpload' className='buttonFoto'>
                                    <i className="bi bi-file-image photo"></i>
                                </label>
                            </div>
                        </div>

                        {/* Exibindo a imagem de pré-visualização antes de enviar */}
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Pré-visualização" style={{ width: '100px', height: 'auto' }} />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
