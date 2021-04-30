import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';

import './index.css'
import Interview from '../../utils/img/Interview.svg'
import imageOportunidades from '../../utils/img/oportunidades.svg'


const Oportunidades = () => {

  return (
    <div >
      <Header />
      <main>
        <div className="groupOportunidades columnOportunidades width85">
        <div className='rowOportunidades'>
            <div className='txtOportunidades'>
              <h4>
                Oportunidades
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis ipsum rem repudiandae itaque dolorem ducimus nesciunt architecto quam commodi consequatur animi incidunt saepe eos nemo amet odit, assumenda alias.</p>

              <a href="/Oportunidades" className='buttonPrincipal' >
                Confira algumas vagas
              </a>
            </div>
            <div className='imageOportunidades'>
              <img src={imageOportunidades} alt="" />
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Oportunidades;
              {/* <div className='filtrar'>
                <p>Área Profissional : </p>
                <form className='filtrarSelectButton' action="">
                  <select id="categorias">
                    <option value="" disabled selected>Selecione uma opção</option>
                    <option value="administracao">Administração</option>
                    <option value="ti">Tecnologia da informação</option>
                    <option value="logistica">Logística</option>
                    <option value="telemarketing">Telemarketing</option>
                    <option value="contabilidade">Contabilidade</option>
                    <option value="saude">Saúde</option>
                    <option value="manutencao">Manutencao</option>
                    <option value="comercial">Comercial</option>
                  </select>
                  <Button style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                    <a href="" className='buttonPrincipal' >
                      Filtrar
                    </a>
                  </Button>
                </form>

              </div> */}