import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../utils/firebaseConfig';

import './index.css'
import Interview from '../../utils/img/Interview.svg'
import imageOportunidades from '../../utils/img/oportunidades.svg'


const Oportunidades = () => {
  const [oportunidades, setOportunidades] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    listarCategorias()
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
  const listarFiltrado = (event, categoria) => {
    event.preventDefault();

    try {

      db.collection('oportunidades')
        .where("categoria", "==", categoria)
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
          console.log(oportunidades)
        })
    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <div >
      <Header />
      <main>
        <div className="groupOportunidades columnOportunidades width85">
          <div className='rowOportunidades'>
            <div className='txtOportunidades'>
              <h4>
                Oportunidades
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis ipsum rem repudiandae itaque dolorem ducimus nesciunt architecto quam commodi consequatur animi incidunt saepe eos nemo amet odit, assumenda alias.</p>

              <a href="/Oportunidades" className='buttonPrincipal' >
                Confira algumas vagas
              </a>
            </div>
            <div className='imageOportunidades'>
              <img src={imageOportunidades} alt="" />
            </div>
          </div>
          <hr />

          <div className='oportunidadeDiv1'>
            <div className='oportunidadeFiltro'>
              <div className='filtrar'>

                <form className='filtrarSelectButton'onSubmit={event => listarFiltrado(event, categoria)}>
                  <div>

                    <p style={{ marginBottom: '20px' }}>Área Profissional : </p>

                    <select className='selectCategorias' value={categoria} onChange={event => setCategoria(event.target.value)} name="categorias">
                      <option value="" disabled selected>Selecione uma área profissional</option>

                      {
                        categorias.map((item, index) => {
                          return (
                            <option key={index} value={item.titulo}>{item.titulo}</option>
                          )
                        })
                      }
                    </select>

                  </div>

                  <Button style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                    <p className='buttonPrincipal' >
                      Filtrar
                    </p>
                  </Button>
                </form>
              </div>
            </div>

            <div className='hr marginBottom'>

            </div>
            <div className='oportunidadeDiv2'>
              {
                oportunidades.map((item) => {
                  return (
                    <div className='oportunidadeCard'>
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
                  )
                })
              }



            </div>
          </div>
        </div>
        <div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Oportunidades;
{/* <div className='filtrar'>
                

              </div> */}