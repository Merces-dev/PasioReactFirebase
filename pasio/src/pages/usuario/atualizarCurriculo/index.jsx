import React, { useState, useEffect } from 'react';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './index.css'
import { db, storage } from '../../../utils/firebaseConfig';
import { useFirebaseApp } from 'reactfire';
import BrM from 'br-masks'
import { useHistory } from 'react-router-dom';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import { useToasts } from 'react-toast-notifications';

const AtualizarCurriculo = () => {
  let token = localStorage.getItem('uid')

  const firebase = useFirebaseApp();
  const { addToast } = useToasts();
  const history = useHistory();

  useEffect(() => {
    listarUsuario();
  }, [])

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
  const [novoUrlArquivo, setNovoUrlArquivo] = useState('');

  const [categoria, setCategoria] = useState('');
  const [role, setRole] = useState('');
  const [usuario, setUsuario] = useState([])



  const salvar = (urlArquivoNovo) => {
    if (window.confirm('Os seus dados conferem ?')) {

      const usuario = {
        email: email,
        nome: nome,
        telefone: telefone,
        dataNascimento: dataNascimento,
        localizacao: [estado, cidade],
        categoria: categoria,
        curriculo: urlArquivoNovo,
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

  const handleUploadSuccess = filename => {
    console.log('SUCESSO UPLOAD: ' + filename);

    storage
      .ref('curriculos')
      .child(filename)
      .getDownloadURL()
      .then(url => setNovoUrlArquivo(url))
      .catch(error => console.error(error))
      if(novoUrlArquivo !== null){
        addToast('Currículo salvo com sucesso', { appearance: 'info', autoDismiss: true });

      }
  }
  const handleUploadError = error => {
    console.error(error);
    addToast('Falha ao salvar currículo, tente novamente', { appearance: 'error', autoDismiss: true });

  }

  const atualizarCurriculo = (event) => {
    event.preventDefault()
    salvar(novoUrlArquivo)
}
return (
  <div >
    <Header />
    <main>
      <div className="groupChange columnChange">
        <div className='containerChange groupChange columnChange'>
          <div className='h3Change'>
            <h3>Atualizar Currículo</h3>
          </div>
          <form onSubmit={event => atualizarCurriculo(event)} className='formChange'>
            <div className='labelInputs'>

              <iframe src={urlArquivo}></iframe>


              <label style={{ padding: 14, borderRadius: 5, cursor: 'pointer' }}>
                <CustomUploadButton
                  style={{ backgroundColor: 'var(--principal)', color: 'white', padding: 30, borderRadius: 10, cursor: 'pointer', textAlign: 'center' }}

                  accept=".pdf,.doc,.jpg,.docx"
                  name="urlArquivo"
                  randomizeFilename
                  storageRef={storage.ref('curriculos')}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  required>
                  Clique para adicionar o novo arquivo do seu currículo

                </CustomUploadButton>

              </label >
            </div>
            <div className='buttonsChange'>
              <input className='inputCRUDChange' style={{ backgroundColor: 'var(--principal)', color: 'white' }} type="submit" value='Salvar' />
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

export default AtualizarCurriculo;
