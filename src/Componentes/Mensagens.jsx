import './Mensagens.css';
import { useState, useEffect } from 'react';

export default function Mensagens() {


    const [dados, setDados] = useState([]);

    useEffect(() => {


        fetch('http://localhost:3000/')

            .then((resposta) => resposta.json())

            .then((Dados) => {
                setDados(Dados)
            })


            .catch((err) => {
                if (err) {
                    console.log("erro ao fazer requisição", err)
                }
            })

    }, [])



    return (
        <div>
            <div className='Mensagens'>
                <div className='BoxMensagens'>
                    {dados.map((Item) => (
                        <li className='Lista' key={Item.id}><span className='Nome'>{Item.nome}:</span> {Item.texto}</li>
                    ))}
                </div>
            </div>
        </div>
    )
}