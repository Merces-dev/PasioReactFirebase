import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { db, storage } from '../../../utils/firebaseConfig';
import './index.css'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


const Imagens = () => {
  const [imagens, setImagens] = useState([]);
  const { addToast } = useToasts();
  const [id, setId] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [pagina, setPagina] = useState('');
  const [urlArquivo, setUrlArquivo] = useState('');

  useEffect(() => {
    listarImagens();
  }, [])

  const listarImagens = () => {
    try {
      db.collection('imagens')
        .get()
        .then((result) => {
          const data = result.docs.map(doc => {
            return {
              id: doc.id,
              titulo: doc.data().titulo,
              urlArquivo: doc.data().urlArquivo,
              pagina: doc.data().pagina,

            }
          })
          setImagens(data);
        })
        .catch(error => {
          console.error(error);
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  const salvar = (event) => {
    event.preventDefault();
    const imagem = {
      titulo: titulo,
      urlArquivo: urlArquivo,
    }
    if (id === 0) {
      db.collection('imagens')
        .add(imagem)
        .then(() => {
          addToast('Imagem Cadastrada', { appearance: 'success', autoDismiss: true });
          listarImagens();
          limparCampos();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )

    }
    else {
      db.collection('imagens')
        .doc(id)
        .set(imagem)
        .then(() => {
          addToast('Imagem Alterada', { appearance: 'success', autoDismiss: true });
          listarImagens();
          limparCampos();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )
    }
    listarImagens();

    limparCampos();

  }
  const handleUploadSuccess = filename => {
    console.log('SUCESSO UPLOAD: ' + filename);

    storage
      .ref('imagens')
      .child(filename)
      .getDownloadURL()
      .then(url => setUrlArquivo(url))
      .catch(error => console.error(error))

  }
  const handleUploadError = error => {
    console.error(error);
  }
  const editar = (event) => {
    event.preventDefault();
    try {
      db.collection('imagens')
        .doc(event.target.value)
        .get()
        .then(doc => {
          setId(doc.id);
          setUrlArquivo(doc.data().urlArquivo);
          setPagina(doc.data().pagina);
          setTitulo(doc.data().titulo);

        })
    }
    catch (error) {
      console.error(error)
      addToast(error, { appearance: 'error', autoDismiss: true });
    }
  }
  const limparCampos = () => {
    setId(0);
    setTitulo('');
    setUrlArquivo('');
  }
  return (
    <div >
      <Header />
      <main>
        <div className="groupImagens width85 columnImagens ">
          <div className='main'>
            <div className='caixaCrud'>
              <form className='formBase' onSubmit={salvar}>
                <div className='inputs'>

                  <label>
                    Nome da imagem<input maxLength='50' className='inputCRUD' value={titulo} onChange={event => setTitulo(event.target.value)} type="text" placeholder='Digite o nome da categoria' required />
                  </label>


                  <label className='columnUploader' style={{ padding: 14, borderRadius: 10, cursor: 'pointer' }}>
                    <CustomUploadButton
                      style={{ backgroundColor: 'var(--principal)', color: 'white', padding: 30, borderRadius: 10,cursor: 'pointer' }}
                      accept=".png,.jpg"
                      name="urlArquivo"
                      randomizeFilename
                      storageRef={storage.ref('imagens')}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      required>
                      Selecione o arquivo do seu currículo:
                      </CustomUploadButton>
                  </label >
                </div>


                <div className='botoes'>
                  <input className='submit1' style={{ backgroundColor: 'white', color: 'red' }} type='submit' value='Publicar'></input>

                </div>
              </form>

            </div>
          </div>
          <div className='caixaCrud posicionamento'>
            {
              imagens.map((item, index) => {
                return (

                  <div className='cardCrudOportunidades'>
                    <div className='cardCrud'>
                      <div className='dados'>
                        <h6>{item.titulo}</h6>
                        <img src={item.urlArquivo} />
                      </div>

                    </div>



                    <button value={item.id} onClick={event => editar(event)} >Editar</button>

                  </div>
                )
              })
            }
          </div>

        </div>


      </main >
      <Footer />
    </div >
  );
}

export default Imagens;
