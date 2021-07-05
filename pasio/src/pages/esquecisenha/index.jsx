import React, { useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Form, Button } from 'react-bootstrap';
import Password from '../../utils/img/password.svg';
import './index.css'
import { useFirebaseApp } from 'reactfire';
import { db, storage } from '../../utils/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';


const EsqueciSenha = () => {
    const [email, setEmail] = useState('')
    const { addToast } = useToasts();
    const firebase = useFirebaseApp();
    const history = useHistory();

    const changePassword = (event) => {
        event.preventDefault()
        var auth = firebase.auth();
        if (email != '') {
            try {
                auth.sendPasswordResetEmail(email)
                    .then(r =>{
                        addToast('Redefinição enviada para seu email', { appearance: 'success', autoDismiss: true });
                        history.push('/login');
                    })
            } catch (error) {
                console.error(error)
                addToast(error, { appearance: 'error', autoDismiss: true });

            }
        } else {
            addToast('Por favor, digite seu email', { appearance: 'warning', autoDismiss: true });

        }
    }
    return (
        <div >
            <Header />
            <main className='fundo'>
                <div className='EsqueciSenhaContainer'>
                    <div className='txtEsqueciSenha'>
                        <div className='h3EsqueciSenha'>
                            <h3>Esqueci minha Senha</h3>
                        </div>

                    </div>
                    <div className='EsqueciSenhaContainerContent'>

                        <div className='logoPasio'>
                            <img src={Password} alt="" />
                        </div>
                        <div className='formPasioEsqueciSenha'>
                            <Form className='form' onSubmit={event => changePassword(event)}>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control type="email" placeholder="Informe o seu email" value={email} onChange={event => setEmail(event.target.value)} required />
                                </Form.Group>

                                <Button className='botaoEntireEsqueciSenha ' type="submit" >
                                    Enviar
                                </Button>

                            </Form>
                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default EsqueciSenha;
