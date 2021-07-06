import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';

import './index.css'
import Interview from '../../utils/img/Interview.svg'
import Icon01 from '../../utils/img/approved.svg'
import Icon02 from '../../utils/img/job.svg'
import Icon03 from '../../utils/img/together.svg'
import Icon04 from '../../utils/img/consultation.svg'
import Icon05 from '../../utils/img/information.svg'


const Home = () => {

  return (
    <div >
      <Header />
      <main>
        <div className="groupHome columnHome width85">
          <div id="principal" className=" centerHome ">
            <div>
              <h4>
                Em busca de uma nova oportunidade no mercado de trabalho?
                </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis ipsum rem repudiandae itaque dolorem ducimus nesciunt architecto quam commodi consequatur animi incidunt saepe eos nemo amet odit, assumenda alias.</p>

              <a href="/cadastro"  id='buttonWeb'  className='buttonPrincipal' >
                Cadastre-se aqui !
              </a>
            </div>
            <div className="divImgInterview">
            <a href="/cadastro" id='buttonMobile' className='buttonPrincipal' >
                Cadastre-se aqui !
              </a>
              <img src={Interview} alt="" />
              
            </div>

          </div>

          <div id='tertiary'>

          </div>


          <div className='cardsContact' >

            <div id='secondary'>

              <div className='cards'>
                <a href="/cadastro">
                  <div className="card">
                    <img src={Icon01} alt="" />
                    <h4>Cadastre-se</h4>
                  </div>
                </a>
                <a href="/oportunidades">
                  <div className="card">
                    <img src={Icon02} alt="" />
                    <h4>Oportunidades</h4>

                  </div>
                </a>
              </div>
              <div className='cards'>
                <a href="/servicos">
                  <div className="card">
                    <img src={Icon04} alt="" />
                    <h4>Serviços</h4>

                  </div>

                </a>                        

                <a href="/quemsomos#trabalheconosco">
                  <div className="card">
                    <img src={Icon03} alt="" />
                    <h4>Trabalhe Conosco</h4>

                  </div>
                </a>
              </div>
              <div className='cards'>

                <a href="/quemsomos">
                  <div className="card">
                    <img src={Icon05} alt="" />
                    <h4>Quem Somos</h4>

                  </div>
                </a>
              </div>
              <div>

              </div>

            </div>
            <div id="form">
              <Form style={{ margin: '20px' }}>
                <p ><b>Entrar em Contato</b></p>

                <Form.Group controlId="formBasicName" >
                  <Form.Label >Nome </Form.Label>
                  <Form.Control className='borda' type="text" placeholder="Insira seu nome completo" required />
                </Form.Group>

                <Form.Group controlId='formBasicEmail' >
                  <Form.Label >Email</Form.Label>
                  <Form.Control className='borda' type='email' placeholder="Insira um email válido" required />
                </Form.Group>

                <Form.Group controlId='formBasicMessage'>
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control className='borda' placeholder="Insira sua mensagem" as="textarea" rows={3} />
                </Form.Group>

                <Button style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                  <a href="" className='buttonPrincipal' >
                    Enviar
                  </a>
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

export default Home;
