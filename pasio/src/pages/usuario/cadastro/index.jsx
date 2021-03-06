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

const Cadastro = () => {
  const firebase = useFirebaseApp();
  const { addToast } = useToasts();
  const history = useHistory();

  useEffect(() => {
    listarCategorias();
    dataAtualFormatada();
  }, [])

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [estado, setEstado] = useState('');

  const [cidade, setCidade] = useState('');
  const [categoria, setCategoria] = useState('');

  const [senha, setSenha] = useState('');
  const [urlArquivo, setUrlArquivo] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [dataMax, setDataMax] = useState('');
  const [idadeMin, setIdadeMin] = useState('');

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


  const listarCategorias = () => {
    try {
      db.collection('categorias')
        .get()
        .then((result) => {
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
    }
  }

  const handleUploadSuccess = filename => {
    console.log('SUCESSO UPLOAD: ' + filename);

    storage
      .ref('curriculos')
      .child(filename)
      .getDownloadURL()
      .then(url => setUrlArquivo(url))
      .catch(error => console.error(error))
      if(urlArquivo !== null){
        addToast('Currículo salvo com sucesso', { appearance: 'info', autoDismiss: true });

      }
  }
  const handleUploadError = error => {
    console.error(error);
    addToast('Falha ao salvar currículo, tente novamente', { appearance: 'error', autoDismiss: true });

  }
  const registrar = (event) => {
    event.preventDefault();
    const usuario = {
      nome: nome,
      email: email,
      telefone: BrM.phone(telefone),
      dataNascimento: dataNascimento,
      localizacao: [estado, cidade],
      categoria: categoria,
      curriculo: urlArquivo,
      role: 'comum'

    }

    const isValid = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(telefone)

    if (!isValid) {
      addToast('Numero de telefone inválido', { appearance: 'error', autoDismiss: true });

      // O número não foi validado.
      return false;
    } else {
      // O número  foi validado.

      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(result => {
          addToast('Seja bem-vindo, usuário cadastrado com sucesso!', { appearance: 'success', autoDismiss: true });

          db.collection('usuarios').doc(result.user.uid)
            .set(usuario)
            .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
            )
          history.push('/login');

          limparCampos()
          //navega para a página 
        })
        .catch(error => {
          addToast('Não foi possivel cadastrar o usuário', { appearance: 'error', autoDismiss: true });
          limparCampos()
        })
      // Telefone válido.
      return true;
    }

    // } else {
    //   addToast('Sua idade deve ser maior ou igual a 16 anos', { appearance: 'error', autoDismiss: true });



  }
  const limparCampos = () => {
    setEmail('');
    setSenha('');
    setNome('');
    setDataNascimento('');
    setTelefone('');
    setEstado('');
    setCidade('');
    setCategoria('');
    setUrlArquivo('');
  }
  function dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = (dia.length === 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length === 1) ? '0' + mes : mes,
      anoF = data.getFullYear();

    setIdadeMin((anoF - 16) + "-" + mesF + "-" + diaF)
    setDataMax(anoF + "-" + mesF + "-" + diaF)
    return dataMax;
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
              <form className='formBaseCad' onSubmit={event => registrar(event)}>
                <div className='formInputs'>
                  <label>
                    Email
                  </label>
                  <input value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder='Digite o seu email' required />
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
                      Clique para adicionar o arquivo do seu currículo

                    </CustomUploadButton>

                  </label >
                  <label>
                    Senha
                  </label>
                  <input value={senha} onChange={event => setSenha(event.target.value)} type="password" placeholder='Digite a sua senha' />
                  <label>
                    Nome Completo
                  </label>
                  <input value={nome} onChange={event => setNome(event.target.value)} type="name" placeholder='Digite seu nome completo' />
                  <label>
                    Data de Nascimento
                  </label>
                  <input value={dataNascimento} onChange={event => setDataNascimento(event.target.value)} max={idadeMin} type="date" />
                  <label>
                    Telefone / Celular
                  </label>
                  <input value={telefone} onChange={event => setTelefone(event.target.value)} maxLength='20' type="tel" placeholder='11999999999' />
                  <label>
                    Localização
                  </label>
                  <select value={estado} onChange={event => setEstado(event.target.value)} name="estados-brasil">
                    <option value="" disabled selected>Selecione seu Estado</option>

                    {
                      states.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>{item.label}</option>
                        )
                      })
                    }
                  </select>
                  <input value={cidade} onChange={event => setCidade(event.target.value)} type="text" placeholder='Digite o nome da sua cidade' />
                  <label>
                    Área Profissional
                  </label>
                  <select value={categoria} onChange={event => setCategoria(event.target.value)} name="estados-brasil">
                    <option value="" disabled selected>Selecione sua área profissional</option>

                    {
                      categorias.map((item, index) => {
                        return (
                          <option key={index} value={item.titulo}>{item.titulo}</option>
                        )
                      })
                    }
                  </select>


                </div>

                <div id='buttoncaddiv' >
                  <button className='hoverCad' id='buttoncad' type='submit'>Cadastrar</button>

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
