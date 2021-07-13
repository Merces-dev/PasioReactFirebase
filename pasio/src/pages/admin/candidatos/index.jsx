import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import './index.css'


const Candidatos = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  const listarFiltrado = (event, categoria) => {
    event.preventDefault();

    try {

      db.collection('usuarios')
        .where("categoria", "==", categoria)
        .get()
        .then((result) => {
          const data = result.docs.map(doc => {
            return {
              id: doc.id,
              dataNascimento: doc.data().dataNascimento,
              email: doc.data().email,
              nome: doc.data().nome,
              telefone: doc.data().telefone,
              curriculo: doc.data().curriculo,
              categoria: doc.data().categoria,
              estado: doc.data().localizacao[0],
              cidade: doc.data().localizacao[1],

            }
          })
          setUsuarios(data);
        })
    }
    catch (error) {
      console.error(error)
    }
  }
  const listarUsuarios = () => {
    try {
      db.collection('usuarios')
        .get()
        .then((result) => {
          const data = result.docs.map(doc => {
            return {
              id: doc.id,
              dataNascimento: doc.data().dataNascimento,
              email: doc.data().email,
              nome: doc.data().nome,
              telefone: doc.data().telefone,
              curriculo: doc.data().curriculo,
              categoria: doc.data().categoria,
              estado: doc.data().localizacao[0],
              cidade: doc.data().localizacao[1],

            }
          })
          setUsuarios(data);
        })
    }
    catch (error) {
      console.error(error)
    }
  }
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
  useEffect(() => {
    listarCategorias();
    listarUsuarios()
  }, [])
  return (
    <div >
      <Header />
      <main>

        <div className="groupCandidatos columnCandidatos width85">
          <div className='groupCandidatos2'>
            <h1>Visualizar Candidatos</h1>

            <div className='oportunidadeDiv1'>
              <div className='headerFiltro'>

                <div className='oportunidadeFiltro'>
                  <div className='filtrar'>

                    <form className='filtrarSelectButton' onSubmit={event => listarFiltrado(event, categoria)}>
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

                      <Button className={'marginMobile'} style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                        <p className='buttonPrincipal' >
                          Filtrar
                    </p>
                      </Button>
                    </form>
                  </div>
                </div>
                <div className='dadosPesquisa'>
                  <h4>
                    Candidatos cadastrados - {usuarios.length}
                  </h4>
                </div>
              </div>
              <div className='hr marginBottom'>

              </div>
              <div className='oportunidadeDiv2'>
                <div className='oportunidadeCard headerCard'>
                  <div className='dados'>
                    <h5>Dados</h5>
                  </div>
                  <div className='descricao'>
                    <h5>Curriculo:</h5>
                  </div>
                  <div className='contatos'>
                    <h5>Contatos:</h5>
                  </div>
                </div>
              </div>

              {
                usuarios.map((item) => {
                  return (
                    <div className='oportunidadeCard'>
                      <div className='dados'>
                        <h4>{item.nome}</h4>
                        <h6>Data de Nascimento: {item.dataNascimento}</h6>
                        <h6>Área: {item.categoria}</h6>
                        <p>{item.estado} - {item.cidade}</p>

                      </div>
                      <div className='descricao'>
                        <h5 className='textoHeader'>Currículo:</h5>

                        <div className='curriculodiv2'>
                          <iframe src={item.curriculo} ></iframe>
                          <a href={item.curriculo} target="_blank"> Clique aqui para visualizar o currículo   </a>
                        </div>

                      </div>
                      <div className='contatos'>
                        <h5 className='textoHeader'>Contatos:</h5>
                        <h6>Telefone: {item.telefone}</h6>
                        <h6>Email: {item.email}</h6>

                      </div>
                    </div>
                  )
                })
              }


            </div>

          </div>


        </div>

      </main >
      <Footer />
    </div >
  );
}

export default Candidatos;
