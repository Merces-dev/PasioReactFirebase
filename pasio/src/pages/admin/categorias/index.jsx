import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';

import './index.css'

import { useToasts } from 'react-toast-notifications';

const Categorias = () => {
  const {addToast} = useToasts();

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
      <main >
        <div className="groupCategorias width85 columnCategorias ">
        <h1>Gerenciar Categorias</h1>
        <h2>Categorias Atuais - {categorias.length}</h2>
          <div>
            <div>
              <Form onSubmit={event => salvar(event)}>
                <Form.Group>

                </Form.Group>

                <Form.Group controlId="formBasicNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Nome da categoria"></Form.Control>
                </Form.Group>


                <Form.Group controlId="formBasicUrl">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)} />
                </Form.Group>

                <Button type="submit">Salvar</Button>
              </Form>
            </div>
          </div>
          <div className='width85'>
            {
              categorias.map((item, index) => {
                return (
                  <div>
                  
                    <h6>{item.titulo}</h6>
                    <p>{item.descricao}</p>
                    <button value={item.id} onClick={event => editar(event)} >Editar</button>
                    <button value={item.id} onClick={event => remover(event)} >Remover</button>
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
