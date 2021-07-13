import React, { useState, useEffect } from 'react'
import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import './index.css'
import { db, storage } from '../../../../utils/firebaseConfig';
import BrM from 'br-masks'
import firebase from 'firebase/app';

import { useToasts } from 'react-toast-notifications';



const ChangeEmail = () => {
    const [id, setId] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [atualSenha, setAtualSenha] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [urlArquivo, setUrlArquivo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [role, setRole] = useState('');
    const [usuario, setUsuario] = useState([])


    let token = localStorage.getItem('uid')
    const { addToast } = useToasts();
    const salvar = (novoEmail) => {

        if (window.confirm('Os seus dados conferem ?')) {

            const usuario = {
                email: novoEmail,
                nome: nome,
                telefone: telefone,
                dataNascimento: dataNascimento,
                localizacao: [estado, cidade],
                categoria: categoria,
                curriculo: urlArquivo,
                role: role
            }
            db.collection('usuarios')
                .doc(token)
                .set(usuario)
                .then(() => {
                    listarUsuario();
                })
                .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
                )
            listarUsuario();

        }

        listarUsuario();
    }
    const listarUsuario = () => {
        try {
            db.collection("usuarios").doc(token)
                .get()
                .then((result) => {
                    setId(result.data().id);
                    setUsuario(result.data());
                    setNome(result.data().nome)
                    setDataNascimento(result.data().dataNascimento)
                    setCategoria(result.data().categoria)
                    setEstado(result.data().localizacao[0])
                    setEmail(result.data().email)
                    setCidade(result.data().localizacao[1])
                    setTelefone(result.data().telefone)
                    setRole(result.data().role)
                    setUrlArquivo(result.data().curriculo)
                })
        }
        catch (error) {
            console.error(error)
            addToast(error, { appearance: 'error', autoDismiss: true });

        }

    }

    console.log(token.email)

    const reauthenticate = (email, atualSenha) => {
        var user = firebase.auth().currentUser;

        var cred = firebase.auth.EmailAuthProvider.credential(
            email, atualSenha);
        return user.reauthenticateWithCredential(cred);
    }

    const onChangeEmailPress = (event) => {
        event.preventDefault()
        reauthenticate(email, atualSenha).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(novoEmail)
                .then(function () {
                    salvar(novoEmail)
                    addToast('Email Alterado com sucesso', { appearance: 'success', autoDismiss: true });
                })
                .catch((error) => {
                    addToast(error.message, { appearance: 'success', autoDismiss: true });

                })
        }).catch((error) => {
            addToast(error.message, { appearance: 'success', autoDismiss: true });

        })

    }
    useEffect(() => {
        listarUsuario();

    },
        [])
    return (
        <div >
            <Header />
            <main>
                <div className="groupChange columnChange">
                    <div className='containerChange groupChange columnChange'>
                        <div className='h3Change'>
                            <h3>Trocar Email</h3>
                        </div>
                        <form onSubmit={event => onChangeEmailPress(event)} className='formChange'>
                            <div className='labelInputs'>
                                <label  >Email Atual</label>
                                <input className='' type='email' value={email} onChange={event => setEmail(event.target.value)} required />
                                <label  >Senha</label>
                                <input className='' type='password' value={atualSenha} onChange={event => setAtualSenha(event.target.value)} required />
                                <label  >Email Novo</label>
                                <input className='' type='email' value={novoEmail} onChange={event => setNovoEmail(event.target.value)} required />

                            </div>
                            <div className='buttonsChange'>
                                <input className='inputCRUDChange' style={{ backgroundColor: 'var(--principal)', color: 'white' }} type="submit" value='Salvar' />
                                <a className='inputCRUDChange' href='/trocarsenha' style={{ backgroundColor: 'white', color: 'var(--principal)' }} type="submit" value='Trocar Senha'>Trocar Senha</a>
                                <a className='inputCRUDChange' href='/perfil' style={{ backgroundColor: 'white', color: 'var(--principal)' }} type="submit" value='Perfil'>Voltar ao Perfil</a>

                            </div>
                        </form>


                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ChangeEmail;
