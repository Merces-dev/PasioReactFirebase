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

                <Form.Group controlId="formBasicEmail" className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61447;    Nome Completo" /> <br />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61475;    Email" /> <br />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="password" placeholder="&#61475;    Senha" /> <br />
                </Form.Group>                
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61475;    11 99999999" /> <br />
                </Form.Group>              
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61475;    Estado" /> <br />
                </Form.Group>  
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61475;    Cidade" /> <br />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61475;    Escolaridade" /> <br />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61475;    Lingua Estrangeira" /> <br />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className=''>
                  <input class="mainCadastroInput" type="text" placeholder="&#61475;    Categoria" /> <br />
                </Form.Group>
                <Button style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                  <a href="" className='buttonPrincipalCadastro' >
                    Enviar
                                </a>
                </Button>
                <p className='marginTopCadastro'><a href="">Esqueci a Senha</a> /<a href="">Cadastrar</a></p>

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
