import { useState } from 'react';
import './Main.css';
import Mensagens from './Mensagens';


export default function Main() {

    const [nome, setNome] = useState('');
    const [texto, setTexto] = useState('');
    const [mensagem, setMensagem] = useState('');

    const EnviarDados = (e) => {

        e.preventDefault();

        const Dados = { nome, texto }

        fetch('http://localhost:3000/Dados', {

            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },

            body: JSON.stringify(Dados)

        })
          
             .then(()=>{
                alert("mensagem enviada")
             })

            .catch((erro) => {
                console.log("erro ao enviar dados", erro)
            })

    }



    return (
        <div>
               <Mensagens/>
            <main className="Main">
             
                <div className='Buttons'>
                    <div className='BotoesMensagens'>
                        <input type='text'
                            placeholder='Nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        ></input>
                        <div className='Enviar'>
                            <input type='email'
                                value={texto}
                                placeholder='Mensagem'
                                onChange={(e) => setTexto(e.target.value)}
                            ></input>
                            <button onClick={EnviarDados}><i class="bi bi-send-fill BotaoEnviar"></i></button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}


