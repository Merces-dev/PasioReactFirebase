import React, { useState, useEffect } from 'react';
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Container, Form, Button } from 'react-bootstrap';
import Logo from '../../utils/img/login.svg';
import './index.css'
import FileUploader from 'react-firebase-file-uploader';
import { db, storage } from '../../utils/firebaseConfig';



const Cadastro = () => {
  useEffect(() => {
    listarCategorias();
  }, [])

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
              <Form className='form '>
                <div className=' formAsk'>
                  <label>Nome Completo</label>
                  <input class="mainCadastroInput" type="text" placeholder="Digite seu nome completo" /> <br />
                </div>
                <div className=' formAsk'>
                  <label>Email</label>
                  <input class="mainCadastroInput" type="email" placeholder="Digite seu email" /> <br />
                </div>
                <div className=' formAsk'>
                  <label>Senha</label>
                  <input class="mainCadastroInput" type="password" placeholder="Digite sua senha" /> <br />
                </div>
                <div className=' formAsk'>
                  <label>Estado</label>
                  <select name="estados-brasil">
                    <option value={0}>Selecione seu Estado</option>
                    {
                      states.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>{item.label}</option>
                        )
                      })
                    }
                  </select>
                  <br />
                </div>

                <div className=' formAsk'>
                  <label>Data de Nascimento</label>
                  <input class="mainCadastroInput" type="date" /> <br />
                </div>
                <div className=' formAsk'>
                  <label>Área Profissional</label>


                  <select name="estados-brasil">
                    <option value={0}>Selecione sua área profissional</option>
                    {
                      categorias.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>{item.titulo}</option>
                        )
                      })
                    }
                  </select><br />
                </div>                <div className=' formAsk'>
                  <label>Nome</label>
                  <input class="mainCadastroInput" type="text" placeholder="   Nome Completo" /> <br />
                </div>
                <Button className='buttonCadastrar' style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                  <a href="" className='buttonPrincipalCadastro' >
                    Cadastrar
                  </a>
                </Button>
                <p>Ao cadastrar-se você concorda com os <a href="">termos de uso</a>  e <a href="">Política de Privacidade</a> da Pasio Consultoria</p>
                <div className=' formAsk'>
                  <label >Selecione o arquivo do seu currículo:</label>

                  <label style={{ padding: 14, borderRadius: 5, cursor: 'pointer' }}>
                    <FileUploader

                      accept=".pdf,.doc,.jpg,.docx"
                      name="urlArquivo"
                      randomizeFilename
                      storageRef={storage.ref('currículos')}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                    />
                  </label>
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

export default Cadastro;
