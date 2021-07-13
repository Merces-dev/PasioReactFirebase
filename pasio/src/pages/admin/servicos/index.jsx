import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import './index.css'
import { useToasts } from 'react-toast-notifications';

import firebase from 'firebase/app';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

const ServicosAdmin = () => {
  const [id, setId] = useState(0);

  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  let time = firebase.firestore.Timestamp.now();

  const { addToast } = useToasts();


  useEffect(() => {
    listarServicos();
  }, [])
  const listarServicos = () => {
    try {
      db.collection('servicos')

        .get()
        .then((result) => {
          const data = result.docs.map(doc => {

            return {
              id: doc.id,
              nome: doc.data().nome,
              descricao: doc.data().descricao,
              imagem: doc.data().imagem,

            }

          })

          setServicos(data);
          console.log(data)
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  const salvar = (event) => {
    event.preventDefault();
    const servico = {
      nome: nome,
      descricao: descricao,
      imagem: imagem,
      ordem: time
    }
    if (id === 0) {
      db.collection('servicos')
        .add(servico)
        .then(() => {
          addToast('Servico Cadastrada', { appearance: 'success', autoDismiss: true });
          listarServicos();
          limparCampos();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )

    }
    else {
      db.collection('servicos')
        .doc(id)
        .set(servico)
        .then(() => {
          addToast('Servico Alterada', { appearance: 'success', autoDismiss: true });
          listarServicos();
          limparCampos();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )
    }
    listarServicos();

    limparCampos();

  }

  const remover = (event) => {
    event.preventDefault();
    db.collection('servicos')
      .doc(event.target.value)
      .delete()
      .then(() => {
        addToast('Servico Removida', { appearance: 'success', autoDismiss: true });
        listarServicos();
      })
  }

  const editar = (event) => {
    event.preventDefault();
    try {
      db.collection('servicos')
        .doc(event.target.value)
        .get()
        .then(doc => {
          setId(doc.id);
          setNome(doc.data().nome);
          setDescricao(doc.data().descricao);
          setImagem(doc.data().imagem);

        })
    }
    catch (error) {
      console.error(error)
      addToast(error, { appearance: 'error', autoDismiss: true });
    }
  }
  const limparCampos = () => {
    setId(0);
    setNome('');
    setDescricao('');
    setImagem('');

  }
  const handleUploadSuccess = filename => {
    console.log('SUCESSO UPLOAD: ' + filename);

    storage
      .ref('servicos')
      .child(filename)
      .getDownloadURL()
      .then(url => setImagem(url))
      .catch(error => console.error(error))

  }
  const handleUploadError = error => {
    console.error(error);
  }
  return (
    <div >
      <Header />
      <div className='tituloBase'>
        <h2 >Gerenciamento de Servicos</h2>

      </div>

      <main >
        <div className="groupServicos width85 columnServicos ">
          <div className='main'>
            <div className='caixaCrudServicos'>
              <form className='formBaseServicos' onSubmit={salvar} >
                <div className='inputsServicos'>
                  <div className='columnServicos'>
                    <label>
                    Nome do servico<input maxLength='50' className='inputCRUDServicos' value={nome} onChange={event => setNome(event.target.value)} type="text" placeholder='Digite o nome do servico' required />
                    </label>
                    <label>
                      <label>
                        Descrição<textarea maxLength='512' className='inputCRUDServicos'  style={{  padding: '20px',  maxHeight: '400px', minHeight: '100px', maxWidth: '700px' }} required  value={descricao} onChange={event => setDescricao(event.target.value)} type="text" placeholder='Digite a descrição' />
                      </label>                    </label>
                    <label>
                      Link do imagem do servico<input className='inputCRUDServicos' value={imagem} onChange={event => setImagem(event.target.value)} type="text" placeholder='Digite o link da imagem' required />
                    </label>
                    <label>
                      Ou
                    </label>
                    <label className='columnUploader ' style={{ marginTop: '15px', borderRadius: 10, cursor: 'pointer' }}>
                      <CustomUploadButton
                        style={{ backgroundColor: 'var(--principal)', color: 'white', padding: 30, borderRadius: 10, cursor: 'pointer' }}
                        accept=".png,.jpg"
                        name="urlArquivo"
                        randomizeFilename
                        storageRef={storage.ref('servicos')}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        >
                        Selecione a imagem
                      </CustomUploadButton>
                    </label >
                  </div>




                </div>
                <div className='lateralServicos'>
                  <input className='inputCRUDServicos' style={{ backgroundColor: '#99313D', color: 'white' }} type='submit'  value='Publicar'></input>
                </div>


              </form>

            </div>

          </div>
          <div className='caixaCrud posicionamento'>
            {
              servicos.map((item, index) => {
                return (

                  <div className='cardCrudServicos'>
                    <div className='cardCrud'>
                      <div className='dados'>
                      <img src={item.imagem} alt={"Imagem referente à " + item.nome} />

                        <h6>{item.nome}</h6>
                        <p>{item.descricao}</p>
                      </div>

                    </div>



                    <button value={item.id} className='buttonServicos' onClick={event => editar(event)} >Editar</button>
                    <button value={item.id} className='buttonServicos'style={{ backgroundColor: 'red' }} onClick={event => remover(event)} >Remover</button>

                  </div>
                )
              })
            }
          </div>

        </div>

      </main>
      <Footer />
    </div >
  );
}

export default ServicosAdmin;
