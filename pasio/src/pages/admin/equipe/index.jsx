import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import './index.css'
import { useToasts } from 'react-toast-notifications';

import firebase from 'firebase/app';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

const EquipeAdmin = () => {
  const [id, setId] = useState(0);

  const [equipe, setEquipe] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  let time = firebase.firestore.Timestamp.now();

  const { addToast } = useToasts();


  useEffect(() => {
    listarEquipe();
  }, [])
  const listarEquipe = () => {
    try {
      db.collection('equipe')

        .get()
        .then((result) => {
          const data = result.docs.map(doc => {

            return {
              id: doc.id,
              nome: doc.data().nome,
              descricao: doc.data().descricao,
              imagem: doc.data().imagem,
              cargo: doc.data().cargo,

            }

          })

          setEquipe(data);
          console.log(data)
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  const salvar = (event) => {
    event.preventDefault();
    const equipe = {
      nome: nome,
      descricao: descricao,
      imagem: imagem,
      cargo: cargo,

      ordem: time
    }
    if (id === 0) {
      db.collection('equipe')
        .add(equipe)
        .then(() => {
          addToast('Membro da Equipe Cadastrada', { appearance: 'success', autoDismiss: true });
          listarEquipe();
          limparCampos();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )

    }
    else {
      db.collection('equipe')
        .doc(id)
        .set(equipe)
        .then(() => {
          addToast('Membro da Equipe Alterada', { appearance: 'success', autoDismiss: true });
          listarEquipe();
          limparCampos();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )
    }
    listarEquipe();

    limparCampos();

  }

  const remover = (event) => {
    event.preventDefault();
    db.collection('equipe')
      .doc(event.target.value)
      .delete()
      .then(() => {
        addToast('Membro da Equipe Removida', { appearance: 'success', autoDismiss: true });
        listarEquipe();
      })
  }

  const editar = (event) => {
    event.preventDefault();
    try {
      db.collection('equipe')
        .doc(event.target.value)
        .get()
        .then(doc => {
          setId(doc.id);
          setNome(doc.data().nome);
          setDescricao(doc.data().descricao);
          setImagem(doc.data().imagem);
          setCargo(doc.data().cargo);

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
    setCargo('');

  }
  const handleUploadSuccess = filename => {
    console.log('SUCESSO UPLOAD: ' + filename);

    storage
      .ref('equipe')
      .child(filename)
      .getDownloadURL()
      .then(url => setImagem(url))
      .catch(error => console.error(error))
      if(imagem !== null){
        addToast('Currículo salvo com sucesso', { appearance: 'info', autoDismiss: true });

      }
  }
  const handleUploadError = error => {
    console.error(error);
    addToast('Falha ao salvar currículo, tente novamente', { appearance: 'error', autoDismiss: true });

  }
  return (
    <div >
      <Header />
      <div className='tituloBase'>
        <h2 >Gerenciamento de Equipe</h2>

      </div>

      <main >
        <div className="groupEquipe width85 columnEquipe ">
          <div className='mainEquipe columnEquipe'>
            <div className='caixaCrudEquipe'>
              <form className='formBaseEquipe' onSubmit={salvar} >
                <div className='inputsEquipe'>
                  <div className='columnEquipe'>
                    <label>
                      Nome do Membro da Equipe<input maxLength='50' className='inputCRUDEquipe' value={nome} onChange={event => setNome(event.target.value)} type="text" placeholder='Digite o nome do Membro da Equipe' required />
                    </label>
                    <label>
                      <label>
                        Descrição<textarea maxLength='512' className='inputCRUDEquipe' style={{ padding: '20px', maxHeight: '400px', minHeight: '100px', maxWidth: '700px' }} required value={descricao} onChange={event => setDescricao(event.target.value)} type="text" placeholder='Digite a descrição' />
                      </label>                    </label>
                    <label>
                      Cargo<input maxLength='50' className='inputCRUDEquipe' value={cargo} onChange={event => setCargo(event.target.value)} type="text" placeholder='Digite o cargo do membro' required />
                    </label>
                    <label>
                      Link do imagem da Membro da Equipe<input className='inputCRUDEquipe' value={imagem} onChange={event => setImagem(event.target.value)} type="text" placeholder='Digite o link da imagem' required />
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
                        storageRef={storage.ref('equipe')}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                      >
                        Selecione a imagem
                      </CustomUploadButton>
                    </label >
                  </div>




                </div>
                <div className='lateralEquipe'>
                  <input className='inputCRUDEquipe' style={{ backgroundColor: '#99313D', color: 'white' }} type='submit' value='Publicar'></input>
                </div>


              </form>

            </div>
            <div className='caixaCrudEquipe columnEquipe'>
            {
              equipe.map((item, index) => {
                return (

                  <div className='cardCrudEquipe'>
                    <div className='cardCrud'>
                      <div className='dados'>
                        <img src={item.imagem} />

                        <h6>{item.nome} - {item.cargo}</h6>
                        <p>{item.descricao}</p>
                      </div>

                    </div>



                    <button value={item.id} className='buttonEquipe' onClick={event => editar(event)} >Editar</button>
                    <button value={item.id} className='buttonEquipe' style={{ backgroundColor: 'red' }} onClick={event => remover(event)} >Remover</button>

                  </div>
                )
              })
            }
          </div>
          </div>
          

        </div>

      </main>
      <Footer />
    </div >
  );
}

export default EquipeAdmin;
