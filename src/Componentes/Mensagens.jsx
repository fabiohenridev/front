import './Mensagens.css';
import { useState, useEffect, useRef } from 'react';

export default function Mensagens() {
  const [dados, setDados] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    // Conectar ao WebSocket usando a URL do ngrok (wss://)
    const socket = new WebSocket('wss://7761-186-236-211-59.ngrok-free.app');

    socket.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
    };

    socket.onmessage = (event) => {
      const mensagemRecebida = event.data;
      console.log('Mensagem recebida:', mensagemRecebida); // Verifique se as mensagens estão chegando
      if (mensagemRecebida !== 'Novos dados foram inseridos no banco') {
        const novaMensagem = JSON.parse(mensagemRecebida);
        setDados((prevDados) => [...prevDados, novaMensagem]);
      }
    };

    socket.onclose = () => {
      console.log('Desconectado do servidor WebSocket');
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    fetch('https://7761-186-236-211-59.ngrok-free.app/', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })
      .then((resposta) => resposta.json())
      .then((Dados) => {
        setDados(Dados);
      })
      .catch((err) => {
        console.log('Erro ao fazer requisição', err);
      });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dados]);

  return (
    <div>
      <div className='Mensagens'>
        <div className='BoxMensagens'>
          {dados.map((Item) => (
            <li className='Lista' key={Item.id}>
              <span className='Nome'>{Item.nome}:</span> {Item.texto}
            </li>
          ))}
          <div ref={scrollRef}></div>
        </div>
      </div>
    </div>
  );
}
