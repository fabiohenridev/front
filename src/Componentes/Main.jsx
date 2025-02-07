import { useState } from 'react';
import './Main.css';
import Mensagens from './Mensagens';

export default function Main() {
    const [nome, setNome] = useState('');
    const [texto, setTexto] = useState('');
   
    const [mensagens, setMensagens] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
   
  
   

    const EnviarDados = async (e) => {
        e.preventDefault();

        const Dados = { nome, texto };
      

        // Envia a mensagem para o backend
        fetch('https://6410-187-19-242-1.ngrok-free.app/Dados', {
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
                           
                        </div>

                     
                    </div>
                </div>
            </main>
        </div>
    );
}
