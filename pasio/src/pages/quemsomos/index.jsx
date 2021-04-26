import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';

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
              <div className='cardEquipe'>
                <img src="https://image.freepik.com/fotos-gratis/fundo-branco-feliz-pessoa-feminina_1301-3449.jpg" alt="" />
                <div className='cardTxt centerTxt'>
                  <p className='nomeEquipe' >Maria Santos</p>
                  <p className='nomeCargo'>CEO</p>
                </div>
              </div>
              <div className='cardEquipe'>
                <img src="https://image.freepik.com/fotos-gratis/fundo-branco-feliz-pessoa-feminina_1301-3449.jpg" alt="" />
                <div className='cardTxt centerTxt'>
                  <p className='nomeEquipe' >Maria Santos</p>
                  <p className='nomeCargo'>CEO</p>
                </div>
              </div>
              <div className='cardEquipe'>
                <img src="https://image.freepik.com/fotos-gratis/fundo-branco-feliz-pessoa-feminina_1301-3449.jpg" alt="" />
                <div className='cardTxt centerTxt'>
                  <p className='nomeEquipe' >Maria Santos</p>
                  <p className='nomeCargo'>CEO</p>
                </div>

              </div>              <div className='cardEquipe'>
                <img src="https://image.freepik.com/fotos-gratis/fundo-branco-feliz-pessoa-feminina_1301-3449.jpg" alt="" />
                <div className='cardTxt centerTxt'>
                  <p className='nomeEquipe' >Maria Santos</p>
                  <p className='nomeCargo'>CEO</p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default QuemSomos;
