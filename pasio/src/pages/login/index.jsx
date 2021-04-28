import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Form, Button } from 'react-bootstrap';
import Logo from '../../utils/img/login.svg';
import './index.css'



const Login = () => {

    return (
        <div >
            <Header />
            <main className='fundo'>
                <div className='loginContainer'>
                    <div className='txtLogin'>
                        <div className='h3Login'>
                            <h3>Conectar-se à Pasio</h3>
                        </div>

                    </div>
                    <div className='loginContainerContent'>

                        <div className='logoPasio'>
                            <img src={Logo} alt="" />
                        </div>
                        <div className='formPasioLogin'>
                            <Form className='form '>

                                <Form.Group controlId="formBasicEmail" className=''>
                                    <input class="mainLoginInput" type="text" placeholder="&#61447;    Email" /> <br />
                                </Form.Group>
                                <Form.Group controlId='formBasicPassword' className=''>
                                    <input class="mainLoginInput" type="text" placeholder="&#61475;    Senha" /> <br />
                                </Form.Group>
                                <Button className='botaoEntireLogin ' style={{ backgroundColor: 'white', border: 'none' }}  type="submit" >
                                    <a href="" className='buttonPrincipalLogin' >
                                        Enviar
                                    </a>
                                </Button>
                                <div style={{display:'flex', justifyContent: 'center'}}>
                                    <p className='marginTopLogin'><a href="">Esqueci a Senha</a> /<a href="">Cadastrar</a></p>

                                </div>

                            </Form>
                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default Login;
