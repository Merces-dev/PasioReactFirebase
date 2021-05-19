import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';

import './index.css'
import { useToasts } from 'react-toast-notifications';


const OportunidadesAdmin = () => {
  const [id, setId] = useState(0);
  const [local, setLocal] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nivel, setNivel] = useState('');
  const [email, setEmail] = useState('');

  const [telefone, setTelefone] = useState('');
  const [turno, setTurno] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');
  const [oportunidades, setOportunidades] = useState([]);
  const [descricao, setDescricao] = useState('')
  const [categorias, setCategorias] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    listarOportunidades();
    listarCategorias();
  }, [])

  const listarCategorias = () => {
    try {
      db.collection('categorias')
        .get()
        .then((result) => {
          console.log(result.docs);
          const data = result.docs.map(doc => {
            return {
              titulo: doc.data().titulo,

            }
          })
          setCategorias(data);
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  const listarOportunidades = () => {
    try {
      db.collection('oportunidades')
        .get()
        .then((result) => {
          console.log(result.docs);
          const data = result.docs.map(doc => {
            return {
              id: doc.id,
              local: doc.data().local,
              empresa: doc.data().empresa,
              nivel: doc.data().nivel,
              turno: doc.data().turno,
              telefone: doc.data().telefone,
              email: doc.data().email,
              descricao: doc.data().descricao,
              categoria: doc.data().categoria,

            }
          })
          setOportunidades(data);
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  const salvar = (event) => {
    event.preventDefault();
    const oportunidade = {
      id: id,
      local: local,
      empresa: empresa,
      nivel: nivel,
      turno: turno,
      telefone: telefone,
      descricao: descricao,
      categoria: categoria,
      dataCriacao: Date.now()
    }
    if (id === 0) {
      db.collection('oportunidades')
        .add(oportunidade)
        .then(() => {
          addToast('Oportunidade Cadastrada', { appearance: 'success', autoDismiss: true });
          listarOportunidades();
          limparCampos();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )

    }
    else {
  db.collection('oportunidades')
    .doc(id)
    .set(oportunidade)
    .then(() => {
      addToast('Oportunidade Alterada', { appearance: 'success', autoDismiss: true });
      listarOportunidades();
      limparCampos();
    })
    .catch(error =>   addToast(error, { appearance: 'error', autoDismiss: true })
    )

}
  }

const remover = (event) => {
  event.preventDefault();

  db.collection('oportunidades')
    .doc(event.target.value)
    .delete()
    .then(() => {
      addToast('Oportunidade Removida', { appearance: 'success', autoDismiss: true });
      listarOportunidades();
    })
}

const editar = (event) => {
  event.preventDefault();
  try {
    db.collection('oportunidades')
      .doc(event.target.value)
      .get()
      .then(doc => {
        setId(doc.id);
        setDataCriacao(doc.data().dataCriacao);
        setDescricao(doc.data().descricao);
        setEmpresa(doc.data().empresa);
        setCategoria(doc.data().categoria);
        setTurno(doc.data().turno);
        setTelefone(doc.data().telefone);
        setLocal(doc.data().local);

      })
  }
  catch (error) {
    console.error(error)
    addToast(error, { appearance: 'error', autoDismiss: true });

  }
}
const limparCampos = () => {
  setId(0);
  setDataCriacao('');
  setDescricao('');
  setEmpresa('');
  setCategoria('');
  setTurno('');
  setTelefone('');
  setLocal('');
}
return (
  <div >
    <Header />
    <main >
      <div className="groupCategorias width85 columnCategorias ">
        <h1>Gerenciar Categorias</h1>
        <h2>Categorias Atuais - {oportunidades.length}</h2>
        <div>
          <div>
            <Form onSubmit={event => salvar(event)}>
              <Form.Group>

              </Form.Group>

              <Form.Group controlId="formBasicNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" value={empresa} onChange={event => setEmpresa(event.target.value)} placeholder="Nome da oportunidade"></Form.Control>
              </Form.Group>


              <Form.Group controlId="formBasicNome">
                <Form.Label>categoria</Form.Label>
                <Form.Control as="select" value={categoria} onChange={event => setCategoria(event.target.value)} placeholder="Nome da oportunidade">
                  <option value={0}>Selecione sua área profissional</option>
                  {
                    categorias.map((item, index) => {
                      return (
                        <option key={index} value={item.titulo}>{item.titulo}</option>
                      )
                    })
                  }
                </Form.Control>
              </Form.Group>


              <Form.Group controlId="formBasicNome">
                <Form.Label>local</Form.Label>
                <Form.Control type="text" value={local} onChange={event => setLocal(event.target.value)} placeholder="Nome da oportunidade"></Form.Control>
              </Form.Group>


              <Form.Group controlId="formBasicNome">
                <Form.Label>turno</Form.Label>
                <Form.Control type="text" value={turno} onChange={event => setTurno(event.target.value)} placeholder="Nome da oportunidade"></Form.Control>
              </Form.Group>


              <Form.Group controlId="formBasicNome">
                <Form.Label>telefone</Form.Label>
                <Form.Control type="text" value={telefone} onChange={event => setTelefone(event.target.value)} placeholder="Nome da oportunidade"></Form.Control>
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
            oportunidades.map((item, index) => {
              return (
                <div>

                  <h6>{item.empresa}</h6>
                  <p>{item.descricao}</p>
                  <p>{item.dataCriacao}</p>
                  <p>{item.local}</p>
                  <p>{item.turno}</p>
                  <p>{item.telefone}</p>
                  <p>{item.categoria}</p>

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

export default OportunidadesAdmin;
