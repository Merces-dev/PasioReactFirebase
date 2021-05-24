import React, { useState, useEffect } from 'react';
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Form, Button } from 'react-bootstrap';
import Logo from '../../utils/img/login.svg';
import './index.css'
import FileUploader from 'react-firebase-file-uploader';
import { db, storage } from '../../utils/firebaseConfig';
import { useFirebaseApp } from 'reactfire';


import { useToasts } from 'react-toast-notifications';

const Cadastro = () => {
  const firebase = useFirebaseApp();
  const { addToast } = useToasts();

  useEffect(() => {
    listarCategorias();
  }, [])

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');

  const [senha, setSenha] = useState('');
  const [id, setId] = useState(0);
  const [urlArquivo, setUrlArquivo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [categorias, setCategorias] = useState([]);

  const states = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];
  const handleUploadError = error => {
    console.error(error);
  }

  const handleUploadSuccess = filename => {
    console.log('SUCESSO UPLOAD: ' + filename);
    storage
      .ref('currículos')
      .child(filename)
      .getDownloadURL()
      .then(url => setUrlArquivo(url))
      .catch(error => console.error(error))
  }
  const listarCategorias = () => {
    try {
      db.collection('categorias')
        .get()
        .then((result) => {
          console.log(result.docs);
          const data = result.docs.map(doc => {

            return {
              id: doc.id,
              titulo: doc.data().titulo,
              descricao: doc.data().descricao,

            }

          })

          setCategorias(data);

        })
    }
    catch (error) {
      console.error(error)
      console.log('erro')
    }
  }

  const registrar = (event) => {
    event.preventDefault();
    const usuario = {
      nome: nome,
      email: email,
    }
    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then(result => {
        addToast('Seja bem-vindo, usuário cadastrado com sucesso!', { appearance: 'success', autoDismiss: true });

        db.collection('usuarios').doc(result.user.uid)
          .set(usuario)
          .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
          )

        limparCampos()
        //navega para a página 
      })
      .catch(error => {
        addToast('Não foi possivel cadastrar o usuário', { appearance: 'error', autoDismiss: true });
      })
  }
  const limparCampos = () => {
    setEmail('');
    setSenha('')
  }
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
              <form className='formBase' onSubmit={event => registrar(event)}>
                <div>

                  <label>
                    Email
                  </label>
                  <input value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder='Digite o seu email' required />
                  <label>
                    Senha
                  </label>
                  <input value={senha} onChange={event => setSenha(event.target.value)} type="password" placeholder='Digite a sua senha' />
                  <label>
                    Nome Completo
                  </label>
                  <input value={nome} onChange={event => setNome(event.target.value)} type="name" placeholder='Digite seu nome completo' />
                </div>

                <div >
                  <input type='submit' value='Publicar'></input>

                </div>

              </form>

            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default Cadastro;
