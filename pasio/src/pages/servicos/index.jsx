import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../utils/firebaseConfig';

import './index.css'

import Image from '../../utils/img/choices.svg'

import sendEmail from '../../utils/email';

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [id, setId] = useState('');


  useEffect(() => {
    listarServicos();
  }, [])
  const listarServicos = () => {
    try {
      db.collection('servicos')
        .get()
        .then((result) => {
          const data = result.docs.map(doc => {

            return {
              id: doc.id,
              nome: doc.data().nome,
              descricao: doc.data().descricao,
              imagem: doc.data().imagem,

            }

          })

          setServicos(data);
          console.log(data)
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <div >
      <Header />
      <main>
        <div className="groupServicos columnServicos width85">
          <div className='rowServicos'>
            <div className='txtServicos'>
              <h4>
                Nossos Serviços
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis ipsum rem repudiandae itaque dolorem ducimus nesciunt architecto quam commodi consequatur animi incidunt saepe eos nemo amet odit, assumenda alias.</p>

              <a href="/Servicos#servicos" className='buttonPrincipal' >
                Saiba Mais
              </a>
            </div>
            <div className='imageServicos'>
              <img src={Image} alt="" />
            </div>
          </div>

          <div className='servicos' id="servicos">
            {
              servicos.map((item, index) => {
                return (
                  <div className='cardServicos'>
                    <div className='imageCaptionServicos'>
                      <div>
                        <img src={item.imagem} alt="" />

                      </div>
                    </div>
                    <div className='cardServicosInfo'>
                      <div className='cardServicostxt'>
                        <h5>{item.nome}</h5>

                        <p>{item.descricao}</p>
                        <button className='buttonPrincipal' onClick={event => setNome(item.nome)} >
                            <a  href='servicos#form'>Entrar em Contato</a>
                        </button>


                      </div>

                    </div>
                  </div>)
              })
            }

          </div>
          <div id="form">
            <Form style={{ margin: '20px' }} onSubmit={event => sendEmail(event)}>
              <p ><b>Entrar em Contato</b></p>

              <Form.Group controlId="formBasicName" >
                <Form.Label >Nome </Form.Label>
                <Form.Control className='borda' type="text" placeholder="Insira seu nome completo" name='name' required />
              </Form.Group>

              <Form.Group controlId='formBasicEmail' >
                <Form.Label >Assunto</Form.Label>
                <Form.Control className='borda capitalize' type='text' value={nome} onChange={event => setNome(event.target.value)}  placeholder="Insira o assunto da mensagem" name='subject' required />
              </Form.Group>

              <Form.Group controlId='formBasicEmail' >
                <Form.Label >Email</Form.Label>
                <Form.Control className='borda' type='email' placeholder="Insira um email válido" name='email' required />
              </Form.Group>

              <Form.Group controlId='formBasicMessage'>
                <Form.Label>Mensagem</Form.Label>
                <Form.Control className='borda' placeholder="Insira sua mensagem" as="textarea" name='message' rows={3} />
              </Form.Group>

              <Button style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                <p href="" className='buttonPrincipalContato' >
                  Enviar
                </p>
              </Button>
            </Form>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Servicos;
