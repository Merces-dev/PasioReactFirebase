import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';

import './index.css'
import Interview from '../../utils/img/Interview.svg'
import Icon05 from '../../utils/img/information.svg'
import Image from '../../utils/img/choices.svg'


const Servicos = () => {

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

              <a href="/Servicos" className='buttonPrincipal' >
                Saiba Mais
              </a>
            </div>
            <div className='imageServicos'>
              <img src={Image} alt="" />
            </div>
          </div>

          <div className='alinhamentoCardsServicos'>
            <div className='cardServicos'>
              <div className='imageCaptionServicos'>
                <div>
                  <img src="https://image.flaticon.com/icons/png/512/896/896866.png" alt="" />

                </div>
              </div>
              <div>
                <h5>Consultoria</h5>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut sequi perspiciatis a ipsum natus! Dolorum laborum culpa nihil eos nulla totam, velit suscipit. Deserunt quae illo corporis, nostrum a omnis!</p>
                <a href="/Servicos" className='buttonPrincipal' >
                  Entrar em Contato
              </a>
              </div>
            </div>
            <div className='cardServicos'>
              <div className='imageCaptionServicos'>
                <div>
                  <img src="https://image.flaticon.com/icons/png/512/896/896866.png" alt="" />

                </div>
              </div>
              <div>
                <h5>Consultoria</h5>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut sequi perspiciatis a ipsum natus! Dolorum laborum culpa nihil eos nulla totam, velit suscipit. Deserunt quae illo corporis, nostrum a omnis!</p>
                <a href="/Servicos" className='buttonPrincipal' >
                  Entrar em Contato
              </a>
              </div>
            </div>
            <div className='cardServicos'>
              <div className='imageCaptionServicos'>
                <div>
                  <img src="https://image.flaticon.com/icons/png/512/896/896866.png" alt="" />

                </div>
              </div>
              <div>
                <h5>Consultoria</h5>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut sequi perspiciatis a ipsum natus! Dolorum laborum culpa nihil eos nulla totam, velit suscipit. Deserunt quae illo corporis, nostrum a omnis!</p>
                <a href="/Servicos" className='buttonPrincipal' >
                  Entrar em Contato
              </a>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Servicos;
