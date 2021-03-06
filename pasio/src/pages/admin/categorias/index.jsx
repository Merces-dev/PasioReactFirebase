import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';

import './index.css'

import { useToasts } from 'react-toast-notifications';

const Categorias = () => {
  const {addToast} = useToasts();
  let time = firebase.firestore.Timestamp.now();
  const [id, setId] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    listarCategorias();
  }, [])

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
    const categoria = {
      titulo: titulo,
      descricao: descricao,
      ordem: time
    }
    if (id === 0) {
      db.collection('categorias')
        .add(categoria)
        .then(() => {
          addToast('Categoria Cadastrada', {appearance:'success', autoDismiss : true});
          listarCategorias();
          limparCampos();
        })
        .catch(error =>        addToast(error, {appearance:'error', autoDismiss : true})
        )

    }
    else {
      db.collection('categorias')
        .doc(id)
        .set(categoria)
        .then(() => {
          addToast('Categoria Alterada', {appearance:'success', autoDismiss : true});
          listarCategorias();
          limparCampos();
        })
        .catch(error =>         addToast(error, {appearance:'error', autoDismiss : true})
        )
    }
    listarCategorias();

    limparCampos();

  }

  const remover = (event) => {
    event.preventDefault();
    db.collection('categorias')
      .doc(event.target.value)
      .delete()
      .then(() => {
        addToast('Categoria Removida', {appearance:'success', autoDismiss : true});
        listarCategorias();
      })
  }

  const editar = (event) => {
    event.preventDefault();
    try {
      db.collection('categorias')
        .doc(event.target.value)
        .get()
        .then(doc => {
          setId(doc.id);
          setTitulo(doc.data().titulo);
          setDescricao(doc.data().descricao);
        })
    }
    catch (error) {
      console.error(error)
      addToast(error, {appearance:'error', autoDismiss : true});
    }
  }
  const limparCampos = () => {
    setId(0);
    setTitulo('');
    setDescricao('');
  }
  return (
    <div >
    <Header />
    <h2 className='tituloBase'>Gerenciamento de Categorias</h2>

    <main >
      <div className="groupCategorias width85 columnCategorias ">
        <div className='main'>
          <div className='caixaCrud'>
            <form className='formBase' onSubmit={salvar}>
              <div className='inputs'>

              <label>
                Nome da categoria<input maxLength='50' className='inputCRUD' value={titulo} onChange={event => setTitulo(event.target.value)}  type="text" placeholder='Digite o nome da categoria' required />
              </label>
            
              <label>
               Descri????o<input  className='inputCRUD' value={descricao} onChange={event => setDescricao(event.target.value)}  type="text" placeholder='Digite a descri????o da categoria'  />
              </label>
              </div>


              <div className='botoes'>
                <input className='submit1' style={{backgroundColor:'white', color:'red'}} type='submit' value='Publicar'></input>

                <Link to="/admin/dashboard">
                  <button className='submit1'>
                    Retornar ?? Dashboard
                  </button>
                </Link>
              </div>
            </form>

          </div>
        </div>
        <div className='caixaCrud posicionamento'>
                  {
                      categorias.map((item, index) => {
                          return (
          
                            <div  className='cardCrudOportunidades'>
                              <div className='cardCrud'>
                              <div className='dados'>
                                  <h6>{item.titulo}</h6>
                                  <p>{item.descricao}</p>
                                  </div>

                              </div>



                              <button value={item.id} onClick={event => editar(event)} >Editar</button>
                              <button value={item.id}  style={{backgroundColor:'red'}} onClick={event => remover(event)} >Remover</button>

                              </div>
                          )
                      })
                  }
              </div>
      
      </div>
    </main>
    <Footer />
  </div>
  );
}

export default Categorias;
