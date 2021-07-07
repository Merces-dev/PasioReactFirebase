import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import './index.css'
import { useToasts } from 'react-toast-notifications';


const Funcionarios = () => {
    const [id, setId] = useState(0);

    const [usuarios, setUsuarios] = useState([]);
    const [funcionario, setFuncionario] = useState('');
    const [escolhido, setEscolhido] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');

    const { addToast } = useToasts();



    const searchEmail = (event) => {

        event.preventDefault();
        try {
            db.collection("usuarios").where("email", "==", funcionario.toLowerCase())
                .get()
                .then((result) => {
                    const data = result.docs.map(doc => {
                        return {
                            id: doc.id,
                            email: doc.data().email,
                            nome: doc.data().nome,
                            localizacao: doc.data().localizacao,
                            role: doc.data().role,
                            telefone: doc.data().telefone,
                            curriculo: doc.data().curriculo,
                            categoria: doc.data().categoria,

                        }

                    })
                    setUsuarios(data);
                })
        }
        catch (error) {
            console.error(error)
            addToast(error, { appearance: 'error', autoDismiss: true });
        }

    }
    const setAdmin = (event) => {
        event.preventDefault();
        if (usuarios != 0) {

            if (window.confirm('Os dados conferem com seu funcionário?')) {
                if (usuarios[0].role == "admin") {
                    setRole('comum')
                } else {
                    setRole('admin')
                }
                const usuario = {
                    id: usuarios[0].id,
                    email: usuarios[0].email,
                    nome: usuarios[0].nome,
                    localizacao: usuarios[0].localizacao,
                    role: role,
                    telefone: usuarios[0].telefone,
                    curriculo: usuarios[0].curriculo,
                    categoria: usuarios[0].categoria,
                }
                console.log(usuario.id)
                console.log(usuario)

                db.collection('usuarios')
                    .doc(usuario.id)
                    .set(usuario)

                addToast(`Usuário cadastrado como ${role}`, { appearance: 'success', autoDismiss: true });


            }
        } else {
            addToast(`Usuário não encontrado`, { appearance: 'error', autoDismiss: true });

        }



    }
    return (
        <div >
            <Header />
            <div className='tituloBase'>
                <h2 >Gerenciamento de Funcionários</h2>

            </div>

            <main >
                <div className="groupCategorias width85 columnCategorias ">
                    <div className='main'>
                        <div className='caixaCrudFuncionario'>
                            <form className='formBaseFuncionario' onSubmit={event => setAdmin(event)}>
                                <div className='inputsFuncionario'>

                                    <label>
                                        Email do Funcionário<input maxLength='50' className='inputCRUDFuncionario' value={funcionario} onChange={event => setFuncionario(event.target.value)} type="text" placeholder='Digite o nome da categoria' required />
                                    </label>
                                    <div>
                                        <button className='inputCRUDFuncionario' onClick={event => searchEmail(event)} style={{ color: 'black', fontWeight: 500 }} value='Pesquisar'>Pesquisar</button>

                                        <input className='inputCRUDFuncionario' style={{ backgroundColor: '#99313D', color: 'white' }} type='submit' value='Publicar'></input>
                                    </div>

                                </div>



                            </form>
                            <div>
                                {
                                    usuarios.map((item) => {
                                        return (
                                            <div className='boxUsuario'>
                                                <div className='boxUsuarioDados'>
                                                    <h3>Dados do Usuário</h3>
                                                    <h5>{item.nome}</h5>
                                                    <h6>Telefone: {item.telefone}</h6>
                                                    <h6>Email: {item.email}</h6>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>


                </div>
            </main>
            <Footer />
        </div >
    );
}

export default Funcionarios;
