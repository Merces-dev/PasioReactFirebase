import React, { useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form } from 'react-bootstrap';
import Logo from '../../../utils/img/login.svg';
import './index.css'
import { useFirebaseApp } from 'reactfire';
import { useToasts } from 'react-toast-notifications';
import { db } from '../../../utils/firebaseConfig';
import { useHistory } from 'react-router-dom';

import jwtEncode from 'jwt-encode'

const Login = () => {
    const history = useHistory();

    const firebase = useFirebaseApp();
    const { addToast } = useToasts();
    const [email, setEmail] = useState('');
    const secretToken = 'aaaa';

    const [senha, setSenha] = useState('');
    const logar = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(result => {
                console.log(result.user.uid)
                db.collection('usuarios')
                    .doc(result.user.uid)
                    .get()
                    .then(user => {
                        let userToken = {
                            user_id: result.user.uid,
                            nome: user.data().nome,
                            role: user.data().role

                        }
                        console.log(user.data().role);
                        const jwt = jwtEncode(userToken, secretToken);
                        localStorage.setItem('token', jwt)
                        localStorage.setItem('uid', result.user.uid);
                    });


                addToast('Seja bem-vindo', { appearance: 'success', autoDismiss: true });
                history.push('/');

                //navega para a página 
            })
            .catch(error => {
                addToast('Email ou senha inválidos', { appearance: 'error', autoDismiss: true });
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
                            <img src={Logo} alt="Imagem referente ao login" />
                        </div>
                        <div className='formPasioLogin'>
                            <Form className='form' onSubmit={event => logar(event)}>

                                <Form.Group className='tamForm' >
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                                </Form.Group>

                                <Form.Group className='tamForm' >
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value) } required />
                                </Form.Group>
                                <button className='botaoEntireLogin ' type="submit" >
                                    Enviar
                                </button>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <p className='marginTopLogin'><a href="/esquecisenha">Esqueci a Senha</a> / <a href="/cadastro">Cadastrar</a></p>

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
