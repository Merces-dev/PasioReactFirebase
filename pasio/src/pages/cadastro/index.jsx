import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Form, Button } from 'react-bootstrap';
import Logo from '../../utils/img/login.svg';
import './index.css'



const Cadastro = () => {

  return (
    <div >
      <Header />
      <main className='fundo'>
        <div className='CadastroContainer'>
          <div className='logoPasioCadastro'>
            <div className='opacity'>
              <h3>Cadastro Profissional</h3>

            </div>

          </div>
          <div className='CadastroContainerContent'>

            <div className='formPasioCadastro'>
              <Form className='form '>
                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>
                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>
                <Button className='buttonCadastrar' style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                  <a href="" className='buttonPrincipalCadastro' >
                    Cadastrar
                  </a>
                </Button>
                <p>Ao cadastrar-se você concorda com os <a href="">termos de uso</a>  e <a href="">Política de Privacidade</a> da Pasio Consultoria</p>
              </Form>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default Cadastro;
