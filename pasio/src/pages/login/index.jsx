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

                    <div className='logoPasio'>
                        <img src={Logo} alt="" />
                    </div>
                    <div className='formPasioLogin'>
                        <Form className='form '>
                            <h3>Login</h3>

                            <Form.Group controlId="formBasicEmail" className=''>
                                <input class="mainLoginInput" type="text" placeholder="&#61447;    Email" /> <br />
                            </Form.Group>
                            <Form.Group controlId='formBasicPassword' className=''>
                                <input class="mainLoginInput" type="text" placeholder="&#61475;    Senha" /> <br />
                            </Form.Group>
                            <Button style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                                <a href="" className='buttonPrincipalLogin' >
                                    Enviar
                                </a>
                            </Button>
                            <p className='marginTopLogin'><a href="">Esqueci a Senha</a> /<a href="">Cadastrar</a></p>

                        </Form>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
