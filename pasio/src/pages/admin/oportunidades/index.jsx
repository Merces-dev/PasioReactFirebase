import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import { Link } from "react-router-dom";

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
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
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
      <h2 className='tituloBase'>Gerenciamento de Oportunidades</h2>

      <main >
        <div className="groupOportunidades width85 columnOportunidades ">
          <div className='main'>
            <div className='caixaCrud'>
              <form className='formBase' onSubmit={salvar}>
                <div className='inputs'>

                <label>
                  Nome da empresa<input maxLength='50' className='inputCRUD' value={empresa} onChange={event => setEmpresa(event.target.value)} type="text" placeholder='Digite o nome da empresa' required />
                </label>
                
                <label>
                  Título<input maxLength='50' className='inputCRUD' value={empresa} onChange={event => setEmpresa(event.target.value)} type="text" placeholder='Título da sua dúvida' required />
                </label>
                
                <label>
                  Turno<input maxLength='50' className='inputCRUD' value={turno} onChange={event => setTurno(event.target.value)} type="text" placeholder='Digite o turno da vaga' required />
                </label>
                
                <label>
                  Título<input maxLength='50' className='inputCRUD' value={empresa} onChange={event => setEmpresa(event.target.value)} type="text" placeholder='Título da sua dúvida' required />
                </label>
                
                <label>
                  Título<input maxLength='50' className='inputCRUD' value={empresa} onChange={event => setEmpresa(event.target.value)} type="text" placeholder='Título da sua dúvida' required />
                </label>

                <label>
                  Descrição<textarea maxLength='512' style={{ minWidth: '200px', padding: '20px', width: '400px', maxHeight: '400px', minHeight: '100px', maxWidth: '700px' }} required className='inputCRUD' value={descricao} onChange={event => setDescricao(event.target.value)} type="text" placeholder='Qual é a sua dúvida?' />
                </label>

                <label>Tipo
                                
                <select className='inputCRUD' value={categoria} onChange={event => setCategoria(event.target.value)} required >
                    <option value="" disabled selected>Selecione uma categoria</option>
                    {
                    categorias.map((item, index) => {
                      return (
                        <option key={index} value={item.titulo}>{item.titulo}</option>
                      )
                    })
                  }
                  </select>
                </label>
                </div>


                <div className='botoes'>
                  <input className='submit1' type='submit' value='Publicar'></input>

                  <Link to="/oportunidades">
                    <button className='submit1'>
                      Visualizar Página de Oportunidades          
                    </button>
                  </Link>

                  <Link to="/admin/dashboard">
                    <button className='submit1'>
                      Retornar à Dashboard
                    </button>
                  </Link>
                </div>
              </form>

            </div>
          </div>
          <div className='caixaCrud posicionamento'>
                    {
                        oportunidades.map((item, index) => {
                            return (
                              <div className='cardCrudOportunidades'>
                                <div className='cardCrud'>
                                <div className='dados'>
                                <h4>{item.empresa}</h4>
                                <h6>Vaga publicada em: 11/02/2021</h6>
                                <h6>Área: Logística</h6>
                                <h6>Vaga publicada em: 11/02/2021</h6>
        
                              </div>
                              <div className='descricao'>
                                <h5>Descrição da oportunidade:</h5>
        
                                <p>{item.descricao}</p>
                              </div>
                              <div className='contatos'>
                                <h5>Contatos:</h5>
                                <p>11 99999-9999</p>
                                <p>pasio@consultoria.com</p>
                              </div>
                                </div>




                                    <button value={item.id} onClick={event => editar(event)} ><p>Editar</p></button>
                                    <button style={{backgroundColor:'red'}} value={item.id} onClick={event => remover(event)} ><p>Remover</p></button>
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
