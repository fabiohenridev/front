import { useEffect, useState } from 'react';
import './Header.css';

export default function Header(){


    const [dados, setDados] = useState([]);

useEffect(()=>{


    fetch('http://localhost:3000/')

   .then((resposta)=>resposta.json())
    
    .then((Dados)=>{
        setDados(Dados)
    })
    
    
    .catch((err)=>{
        if(err){
            console.log("erro ao fazer requisição", err)
        }
    })

}, [])



    return(
        <div>
            <header className="header">
                <h1>Sala virtual</h1>
               
             
            </header>
        </div>
    )
}