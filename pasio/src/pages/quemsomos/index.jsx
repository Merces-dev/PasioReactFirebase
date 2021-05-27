import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';
import {TiSocialLinkedinCircular} from 'react-icons/ti'
import './index.css'
import Interview from '../../utils/img/Interview.svg'
import Icon05 from '../../utils/img/information.svg'
import Image from '../../utils/img/Teamwork_Monochromatic.svg'


const QuemSomos = () => {

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
              <img src={Image} alt="" />
            </div>
          </div>

          <div className='equipeTotal'>
            <h5>Nossa Equipe</h5>

            <div className='equipe'>
            <div className='cardEquipeTotal'>
                <div className='cardEquipe'>
                  <div className='imgCard'>

                  <img src="https://image.freepik.com/fotos-gratis/fundo-branco-feliz-pessoa-feminina_1301-3449.jpg" alt="" />
                  </div>

                  <div className='infoMobile'>
                    <p className='nomeEquipeMobile' >Maria Santos - CEO</p>
                    <p className='descricaoEquipeMobile'  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, cumque nihil, facilis eligendi voluptate quidem distinctio cupiditate dicta quibusdam error animi. Ut sit impedit voluptatibus natus quo, maxime rerum.</p>


                  </div>
                  <div className='cardTxt centerTxt'>
                    <p className='nomeCargo'>CEO</p>
                  </div>

                </div>
                <div>
                  <p className='nomeEquipe' >Maria Santos</p>
                  <p className='descricaoEquipe'  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, cumque nihil, facilis eligendi voluptate quidem distinctio cupiditate dicta quibusdam error animi. Ut sit impedit voluptatibus natus quo, maxime rerum.</p>
                </div>


              </div>
              <div className='cardEquipeTotal'>
                <div className='cardEquipe'>
                  <img src="https://image.freepik.com/fotos-gratis/fundo-branco-feliz-pessoa-feminina_1301-3449.jpg" alt="" />
                  <div className='infoMobile'>
                    <p className='nomeEquipeMobile' >Maria Santos - CEO</p>
                    <p className='descricaoEquipeMobile'  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, cumque nihil, facilis eligendi voluptate quidem distinctio cupiditate dicta quibusdam error animi. Ut sit impedit voluptatibus natus quo, maxime rerum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, cumque nihil, facilis eligendi voluptate quidem distinctio cupiditate dicta quibusdam error animi. Ut sit impedit voluptatibus natus quo, maxime rerum.</p>


                  </div>
                  <div className='cardTxt centerTxt'>
                    <p className='nomeCargo'>CEO</p>
                  </div>

                </div>
                <div>
                  <p className='nomeEquipe' >Maria Santos</p>
                  <p className='descricaoEquipe'  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, cumque nihil, facilis eligendi voluptate quidem distinctio cupiditate dicta quibusdam error animi. Ut sit impedit voluptatibus natus quo, maxime rerum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at, cumque nihil, facilis eligendi voluptate quidem distinctio cupiditate dicta quibusdam error animi. Ut sit impedit voluptatibus natus quo, maxime rerum.</p>
                  <div className='alignIcon'>
                    <a href=""><TiSocialLinkedinCircular className='socialMediaIcon'/></a>


                  </div>
                </div>


              </div>

            </div>

          </div>
          <div id='trabalheconosco' className='trabalheConosco'>
            <h5>Trabalhe Conosco</h5>

            <div id="form">
              <Form style={{ margin: '20px' }}>
                <p ><b>Entrar em Contato</b></p>

                <Form.Group controlId="formBasicName" >
                  <Form.Label >Nome : </Form.Label>
                  <Form.Control className='borda' type="text" placeholder="Insira seu nome completo" required />
                </Form.Group>

                <Form.Group controlId='formBasicEmail' >
                  <Form.Label >Email :</Form.Label>
                  <Form.Control className='borda' type='email' placeholder="Insira um email válido" required />
                </Form.Group>

                <Form.Group controlId='formBasicMessage'>
                  <Form.Label>Mensagem :</Form.Label>
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

export default QuemSomos;
