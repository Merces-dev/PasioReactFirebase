import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import { Link } from "react-router-dom";
import BrM from 'br-masks'

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
    dataAtualFormatada();

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
  const dataAtualFormatada = () => {
    var data = new Date(),
      hora = data.getHours().toString(),
      horaF = (hora.length == 1) ? '0' + hora : hora,
      minuto = data.getMinutes().toString(),
      minutoF = (minuto.length == 1) ? '0' + minuto : minuto,
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    setDataCriacao(diaF + "/" + mesF + "/" + anoF + " - " + horaF + ":" + minutoF)
    return dataCriacao;
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
              dataCriacao: doc.data().dataCriacao,

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
      local: local,
      empresa: empresa,
      nivel: nivel,
      turno: turno,
      telefone: BrM.phone(telefone),
      descricao: descricao,
      email: email,
      categoria: categoria,
      dataCriacao: dataCriacao,
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
        addToast("Oportunidade Deletada com sucesso!", { appearance: 'success', autoDismiss: true });
      }).catch((error) => {
        addToast("Error removing document:" + error, { appearance: 'error', autoDismiss: true });

      });
  }

  const editar = (event) => {
    event.preventDefault();
    try {
      db.collection('oportunidades')
        .doc(event.target.value)
        .get()
        .then(doc => {
          setId(doc.id);

          setEmpresa(doc.data().empresa);
          setDescricao(doc.data().descricao);
          setCategoria(doc.data().categoria);
          setTurno(doc.data().turno);
          setEmail(doc.data().email);
          setTelefone(doc.data().telefone);
          setLocal(doc.data().local);
          setNivel(doc.data().nivel);

        })
    }
    catch (error) {
      console.error(error)
      addToast(error, { appearance: 'error', autoDismiss: true });

    }
  }
  const limparCampos = () => {
    setId(0);
    setDescricao('');
    setEmpresa('');
    setCategoria('');
    setTurno('');
    setTelefone('');
    setLocal('');
    setEmail('');
    setNivel('');

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
                    Nome da empresa<input maxLength='20' className='inputCRUD' value={empresa} onChange={event => setEmpresa(event.target.value)} type="text" placeholder='Digite o nome da empresa' required />
                  </label>



                  <label>
                    Turno<input maxLength='20' className='inputCRUD' value={turno} onChange={event => setTurno(event.target.value)} type="text" placeholder='Digite o turno da vaga' required />
                  </label>

                  <label>
                    Nível da vaga<input maxLength='24' className='inputCRUD' value={nivel} onChange={event => setNivel(event.target.value)} type="text" placeholder='Título da sua dúvida' required />
                  </label>

                  <label>
                    Contato<input maxLength='50' className='inputCRUD' value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder='Digite o Email para contato' required />
                    <input maxLength='15' className='inputCRUD' value={telefone} onChange={event => setTelefone(event.target.value)} type="tel" placeholder='11999999999' required />
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
                  <input className='submit1' style={{ backgroundColor: 'white', color: 'red' }} type='submit' value='Publicar'></input>

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
                        <h6>Vaga publicada em: {item.dataCriacao}</h6>
                        <h6>Área: {item.categoria}</h6>
                        <h6>Nível da vaga: {item.nivel}</h6>
                        <h6>Turno da vaga: {item.turno}</h6>

                      </div>
                      <div className='descricao'>
                        <h5>Descrição da oportunidade:</h5>

                        <p>{item.descricao}</p>
                      </div>
                      <div className='contatos'>
                        <h5>Contatos:</h5>
                        <p>{item.telefone}</p>
                        <p>{item.email}</p>
                      </div>
                    </div>
                    <button value={item.id} onClick={event => editar(event)} >Editar</button>
                    <button style={{ backgroundColor: 'red' }} value={item.id} onClick={event => remover(event)} >Remover</button>
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
