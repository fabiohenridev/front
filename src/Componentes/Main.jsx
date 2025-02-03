import { useState } from 'react';
import './Main.css';
import Mensagens from './Mensagens';

export default function Main() {
    const [nome, setNome] = useState('');
    const [texto, setTexto] = useState('');

    const EnviarDados = (e) => {
        e.preventDefault();

        const Dados = { nome, texto };

        fetch('https://3767-187-19-242-1.ngrok-free.app/Dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true', // Tentativa de remover o aviso
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // User-Agent padrão
            },
            body: JSON.stringify(Dados),
        })
            .then(() => {
                console.log("Mensagem enviada");
                setTexto('');
            })
            .catch((erro) => {
                console.log("Erro ao enviar dados", erro);
            });
    }

    return (
        <div>
            <Mensagens />
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
