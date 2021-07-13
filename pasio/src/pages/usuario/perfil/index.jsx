import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import './index.css'
import { db, storage } from '../../../utils/firebaseConfig';
import BrM from 'br-masks'

import { useToasts } from 'react-toast-notifications';



const Perfil = () => {
  const { addToast } = useToasts();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  let token = localStorage.getItem('uid')

  const [urlArquivo, setUrlArquivo] = useState('');
  const [categoria, setCategoria] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [usuario, setUsuario] = useState([])
  const states = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const salvar = (event) => {
    event.preventDefault();
    const usuario = {
      nome: nome,
      telefone: BrM.phone(telefone),
      dataNascimento: dataNascimento,
      localizacao: [estado, cidade],
      categoria: categoria,
    }

    db.collection('usuarios')
      .doc(token)
      .set(usuario)
      .then(() => {
        addToast('Dados Alterados', { appearance: 'success', autoDismiss: true });
        listarCategorias();
        listarUsuario();

        limparCampos();
      })
      .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
      )

    listarUsuario();

  }
  const editar =  (event) => {
    event.preventDefault();
    var elementos =  document.getElementsByClassName('pointerEvents');
    console.log(elementos)
    for(let i = 0; i < elementos.length; i++){
      elementos[i].style['pointer-events'] = "all";

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
  const listarUsuario = () => {
    try {
      db.collection("usuarios").doc(token)
        .get()
        .then((result) => {

          setUsuario(result.data());
          setNome(result.data().nome)
          setDataNascimento(result.data().dataNascimento)
          setCategoria(result.data().categoria)
          setEstado(result.data().localizacao[0])
          setCidade(result.data().localizacao[1])
          setTelefone(result.data().telefone.replace(/\D/g, ""))
          setUrlArquivo(result.data().curriculo)
          console.log(result.data())
        })
    }
    catch (error) {
      console.error(error)
      addToast(error, { appearance: 'error', autoDismiss: true });
      limparCampos()

    }

  }
  useEffect(() => {
    listarUsuario()
  },
    [])
  const limparCampos = () => {
    setUsuario('');
    setNome('')
    setDataNascimento('')
    setCategoria('')
    setEstado('')
    setCidade('')
    setTelefone('')
    setUrlArquivo('')
  }
  return (
    <div >
      <Header />
      <main>
        <div className="groupPerfil columnPerfil">
          <div className='containerPerfil groupPerfil columnPerfil'>
            <div className='h3Perfil'>
              <h3>Perfil de Usuário</h3>
            </div>
            <form action="" className='formPerfil'>
              <div className='labelInputs'>
                <label  >Nome</label>
                <input className='pointerEvents' type='text' value={nome} onChange={event => setNome(event.target.value)} />
                <label  >Data de Nascimento</label>
                <input className='pointerEvents' type='date' value={dataNascimento} onChange={event => setDataNascimento(event.target.value)} />
                <label >Área</label>
                <input className='pointerEvents' type='text' value={categoria} onChange={event => setCategoria(event.target.value)} />
                <label >Estado</label>
                <select  className='pointerEvents' value={estado} onChange={event => setEstado(event.target.value)} name="estados-brasil">
                  <option value="" disabled selected>Selecione seu Estado</option>

                  {
                    states.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>{item.label}</option>
                      )
                    })
                  }
                </select>
                <label >Cidade</label>
                <input className='pointerEvents' type='text' value={cidade} onChange={event => setCidade(event.target.value)} />
                <label >Telefone</label>
                <input className='pointerEvents' type='text' value={telefone} onChange={event => setTelefone(event.target.value)} />

              </div>
              <div className='buttonsPerfil'>
                <input className='inputCRUDPerfil' style={{ backgroundColor: 'white', color: 'var(--principal)' }} type="submit" value='Trocar Senha' />
                <input className='inputCRUDPerfil' style={{ backgroundColor: 'white', color: 'var(--principal)' }} type="submit" value='Trocar Email' />

                <input className='inputCRUDPerfil' style={{ backgroundColor: 'white', color: 'var(--principal)' }} onClick={editar} value='Editar' />

                <input className='inputCRUDPerfil' style={{ backgroundColor: 'var(--principal)', color: 'white' }} onClick={salvar} value='Salvar' />
              </div>
            </form>


          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
