import React, { useState, useEffect } from 'react'
import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import './index.css'
import { db, storage } from '../../../../utils/firebaseConfig';
import BrM from 'br-masks'
import firebase from 'firebase/app';

import { useToasts } from 'react-toast-notifications';



const ChangePassword = () => {
    const [novaSenha, setNovaSenha] = useState('');
    const [atualSenha, setAtualSenha] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    let token = localStorage.getItem('uid')
    const [idadeMin, setIdadeMin] = useState('');
    const [dataMax, setDataMax] = useState('');
    const [urlArquivo, setUrlArquivo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [usuario, setUsuario] = useState([])
    const { addToast } = useToasts();

    const listarUsuario = () => {
        try {
            db.collection("usuarios").doc(token)
                .get()
                .then((result) => {

                    setUsuario(result.data());
                    setNome(result.data().nome)
                    setDataNascimento(result.data().dataNascimento)
                    setCategoria(result.data().categoria)
                    setEmail(result.data().email)
                    setEstado(result.data().localizacao[0])
                    setCidade(result.data().localizacao[1])
                    setTelefone(result.data().telefone.replace(/\D/g, ""))
                    setUrlArquivo(result.data().curriculo)
                    console.log(result.data())
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
        return user.reauthenticateWithCredential(cred) ;
    }

    const onChangePasswordPress = (event) => {
        event.preventDefault()
        reauthenticate(email, atualSenha).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(novaSenha)
                .then(function () {
                    addToast('Senha Alterada com sucesso', { appearance: 'success', autoDismiss: true });
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
                            <h3>Trocar Senha</h3>
                        </div>
                        <form onSubmit={event => onChangePasswordPress(event)} className='formChange'>
                            <div className='labelInputs'>
                            <label  >Email</label>
                                <input className='' type='text' value={email} onChange={event => setEmail(event.target.value)} required />
                                <label  >Senha Atual</label>
                                <input className='' type='text' value={atualSenha} onChange={event => setAtualSenha(event.target.value)} required />
                                <label  >Senha Nova</label>
                                <input className='' type='text' value={novaSenha} onChange={event => setNovaSenha(event.target.value)} required />

                            </div>
                            <div className='buttonsChange'>
                                <input className='inputCRUDChange' style={{ backgroundColor: 'var(--principal)', color: 'white' }} type="submit" value='Salvar' />
                                <a className='inputCRUDChange' href='/trocaremail' style={{ backgroundColor: 'white', color: 'var(--principal)' }} type="submit" value='Trocar Email'>Trocar Email</a>
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

export default ChangePassword;
