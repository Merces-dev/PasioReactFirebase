import React, { useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Form, Button } from 'react-bootstrap';
import Logo from '../../utils/img/login.svg';
import './index.css'
import { useFirebaseApp } from 'reactfire';
import { useToasts } from 'react-toast-notifications';
import { db, storage } from '../../utils/firebaseConfig';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const history = useHistory();

    const firebase = useFirebaseApp();
    const {addToast} = useToasts();
    const [email, setEmail] = useState('');

    const [senha, setSenha] = useState('');
    const logar = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(result => {
                db.collection('usuarios').doc(result.user.uid).get().then(user => {console.log(user.data());} );
                localStorage.setItem('uid', result.user.uid);
                addToast('Seja bem-vindo', {appearance:'success', autoDismiss : true});
                history.push('/');

                //navega para a página 
            })
            .catch(error => {
                addToast('Email ou senha inválidos', {appearance:'error', autoDismiss : true});
                console.error(error);
            })
    }
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
                            <Form className='form' onSubmit={event => logar(event)}>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} required />
                                </Form.Group>
                                <Button className='botaoEntireLogin '  type="submit" >
                                    Enviar
                                </Button>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p className='marginTopLogin'><a href="">Esqueci a Senha</a> / <a href="/cadastro">Cadastrar</a></p>

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
