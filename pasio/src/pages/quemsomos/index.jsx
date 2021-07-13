import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';
import './index.css'

import Image from '../../utils/img/Teamwork_Monochromatic.svg'
import { db } from '../../utils/firebaseConfig';

import sendEmail from '../../utils/email';

const QuemSomos = () => {
  const [equipe, setEquipe] = useState([]);

  useEffect(() => {
    listarEquipe();
  }, [])
  const listarEquipe = () => {
    try {
      db.collection('equipe')

        .get()
        .then((result) => {
          const data = result.docs.map(doc => {

            return {
              id: doc.id,
              nome: doc.data().nome,
              descricao: doc.data().descricao,
              imagem: doc.data().imagem,
              cargo: doc.data().cargo,

            }

          })

          setEquipe(data);
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
        <div className="groupQuemSomos columnQuemSomos width85">
          <div className='rowQuemSomos'>
            <div className='txtQuemSomos'>
              <h4>
                Quem Somos
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis ipsum rem repudiandae itaque dolorem ducimus nesciunt architecto quam commodi consequatur animi incidunt saepe eos nemo amet odit, assumenda alias. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eius culpa, quod sequi obcaecati nesciunt! Reiciendis eaque blanditiis facere excepturi, voluptatibus beatae dignissimos, necessitatibus numquam saepe hic, nulla temporibus ipsum!</p>

            </div>
            <div className='imageQuemSomos'>
              <img src={Image} alt="Equipe montando um quebra-cabeça" />
            </div>
          </div>

          <div className='equipeTotal'>
            <h5>Nossa Equipe</h5>

            <div className='equipe'>
              {
                equipe.map((item, index) => {
                  return (
                    <div className='cardEquipe'>
                      <div className='imageCaptionEquipe'>
                        <div>
                          <img src={item.imagem} alt={'Imagem de ' +item.nome} />

                        </div>
                      </div>
                      <div className='cardEquipeInfo'>
                        <div className='cardEquipetxt'>
                          <h5>{item.nome}</h5>
                          <h6>{item.cargo}</h6>
                          <p>{item.descricao}</p>

                        </div>

                      </div>
                    </div>)
                })
              }

            </div>

          </div>
          <div id='trabalheconosco' className='trabalheConosco'>
            <h5>Trabalhe Conosco</h5>

            <div id="form">
              <Form style={{ margin: '20px' }} onSubmit={event => sendEmail(event)}>
                <p ><b>Entrar em Contato</b></p>

                <Form.Group controlId="formBasicName" >
                  <Form.Label >Nome </Form.Label>
                  <Form.Control className='borda' type="text" placeholder="Insira seu nome completo" name='name' required />
                </Form.Group>

                <Form.Group controlId='formBasicEmail' >
                  <Form.Label >Assunto</Form.Label>
                  <Form.Control className='borda' type='text' placeholder="Insira o assunto da mensagem" name='subject' required />
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
                  <p href="" className='buttonPrincipal' >
                    Enviar
                  </p>
                </Button>
              </Form>
            </div>


          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default QuemSomos;
