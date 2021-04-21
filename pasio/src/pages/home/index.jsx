import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './index.css'
import Interview from '../../utils/img/Interview.svg'
import Icon01 from '../../utils/img/approved.svg'
import Icon02 from '../../utils/img/job.svg'
import Icon03 from '../../utils/img/together.svg'


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

              <a href=""  className='buttonPrincipal' >
               Cadastre-se aqui !
        </a>
            </div>
            <div className="divImgInterview">
              <img src={Interview} alt="" />
            </div>

          </div>
          <div id='secondary'>
            <div className='cards'>
              <a href="">
                <div className="card">
                  <img src={Icon01} alt="" />
                  <h4>Cadastre-se</h4>
                </div>
              </a>
              <a href="">
                <div className="card">
                  <img src={Icon02} alt="" />
                  <h4>Oportunidades</h4>

                </div>
              </a>
            </div>
            <div className='cards'>
              <a href="">
                <div className="card">
                  <img src={Icon01} alt="" />
                  <h4>Serviços</h4>

                </div>

              </a>
              <a href="">
                <div className="card">
                  <img src={Icon03} alt="" />
                  <h4>Trabalhe Conosco</h4>

                </div>
              </a>
            </div>
            <div className='cards'>

              <a href="">
                <div className="card">
                  <img src={Icon02} alt="" />
                  <h4>Quem Somos</h4>

                </div>
              </a>
            </div>
            
          </div>
          <div id='tertiary'>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Home;
