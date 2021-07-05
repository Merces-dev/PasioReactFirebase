import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import { db, storage } from '../../../utils/firebaseConfig';
import './index.css'


const Imagens = () => {
  const [imagens, setImagens] = useState([]);
  const {addToast} = useToasts();

  const [id, setId] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [pagina, setPagina] = useState('');
  const [imageLink, setImageLink] = useState('');

  useEffect(() => {
    listarCategorias();
  }, [])

  const listarCategorias = () => {
    try {
      db.collection('imagens')
        .get()
        .then((result) => {
          const data = result.docs.map(doc => {
            return {
              id: doc.id,
              titulo: doc.data().titulo,
              imageLink: doc.data().imageLink,
              pagina: doc.data().pagina,  

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


  const editar = (event) => {
    event.preventDefault();
    try {
      db.collection('imagens')
        .doc(event.target.value)
        .get()
        .then(doc => {
          setId(doc.id);
          setImageLink(doc.data().imageLink);
          setPagina(doc.data().pagina);
          setTitulo(doc.data().titulo);

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
                        <h6>Vaga publicada em: {item.dataNascimento}</h6>
                        <h6>Candidatos: {item.categoria}</h6>
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
