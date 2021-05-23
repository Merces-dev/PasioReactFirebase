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

  useEffect(() => {
    listarOportunidades();
  }, [])

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
          <div className='hr'>
          </div>
          <div className='oportunidadeDiv1'>
            <div className='oportunidadeFiltro'>
              <div className='filtrar'>

                <form className='filtrarSelectButton' action="">
                  <div>

                    <p style={{ marginBottom: '20px' }}>Área Profissional : </p>

                    <select id="categorias">
                      <option value="" disabled selected>Selecione uma opção</option>
                      <option value="administracao">Administração</option>
                      <option value="ti">Tecnologia da informação</option>
                      <option value="logistica">Logística</option>
                      <option value="telemarketing">Telemarketing</option>
                      <option value="contabilidade">Contabilidade</option>
                      <option value="saude">Saúde</option>
                      <option value="manutencao">Manutencao</option>
                      <option value="comercial">Comercial</option>
                    </select>
                  </div>

                  <Button style={{ backgroundColor: 'white', border: 'none' }} type="submit" >
                    <a href="" className='buttonPrincipal' >
                      Filtrar
                    </a>
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
                  )
                })
              }

              <div className='oportunidadeCard'>
                <div className='dados'>
                  <h4>Pasio</h4>
                  <h6>Vaga publicada em: 11/02/2021</h6>
                  <h6>Área: Logística</h6>
                  <h6>Vaga publicada em: 11/02/2021</h6>

                </div>
                <div className='descricao'>
                  <h5>Descrição da oportunidade:</h5>

                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatum dignissimos repellat voluptatem nobis maiores quos ipsa nostrum beatae magnam consectetur assumenda, ratione necessitatibus eveniet temporibus perferendis quidem illum omnis?</p>
                </div>
                <div className='contatos'>
                  <h5>Contatos:</h5>
                  <p>11 99999-9999</p>
                  <p>pasio@consultoria.com</p>
                </div>
              </div>

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