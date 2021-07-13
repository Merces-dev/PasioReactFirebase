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
  const [id, setId] = useState('');

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  let token = localStorage.getItem('uid')
  const [idadeMin, setIdadeMin] = useState('');
  const [dataMax, setDataMax] = useState('');

  const [urlArquivo, setUrlArquivo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [role, setRole] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [usuario, setUsuario] = useState([])
  function dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = (dia.length === 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length === 1) ? '0' + mes : mes,
      anoF = data.getFullYear();

    setIdadeMin((anoF - 16) + "-" + mesF + "-" + diaF)
    setDataMax(anoF + "-" + mesF + "-" + diaF)
    return dataMax;
  }

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
    if (window.confirm('Os seus dados conferem ?')) {

      const usuario = {
        nome: nome,
        email: email,
        telefone: BrM.phone(telefone),
        dataNascimento: dataNascimento,
        localizacao: [estado, cidade],
        categoria: categoria,
        curriculo: urlArquivo,
        role: role
      }

      db.collection('usuarios')
        .doc(token)
        .set(usuario)
        .then(() => {
          addToast('Dados Alterados', { appearance: 'success', autoDismiss: true });
          listarCategorias();
          limparCampos()
          listarUsuario();
        })
        .catch(error => addToast(error, { appearance: 'error', autoDismiss: true })
        )

      listarUsuario();

    }
    listarCategorias();
    limparCampos()
    listarUsuario();
  }
  const editar = (event) => {
    event.preventDefault();
    var elementos = document.getElementsByClassName('pointerEvents');
    let all = 0
    let none = 0
    console.log(elementos)
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].style['pointer-events'] == 'all') {
        elementos[i].style['pointer-events'] = "none";
        elementos[i].style['cursor'] = "not-allowed";

        none++
      } else {
        elementos[i].style['pointer-events'] = "all";
        elementos[i].style['cursor'] = "text";

        all++
      }
    }
    if (all > none) {
      addToast('Agora você pode alterar seus dados', { appearance: 'info', autoDismiss: true });
    } else {
      addToast('Agora você não pode alterar seus dados', { appearance: 'info', autoDismiss: true });

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
          console.log(categorias)
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
          setId(result.data().id);
          setUsuario(result.data());
          setNome(result.data().nome)
          setDataNascimento(result.data().dataNascimento)
          setCategoria(result.data().categoria)
          setEstado(result.data().localizacao[0])
          setEmail(result.data().email)
          setCidade(result.data().localizacao[1])
          setTelefone(result.data().telefone.replace(/\D/g, ""))
          setRole(result.data().role)
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
    listarUsuario();
    listarCategorias();
    dataAtualFormatada();

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
                <input className='pointerEvents' type='date' value={dataNascimento} max={idadeMin} onChange={event => setDataNascimento(event.target.value)} />
                <label >Área</label>

                <select className='pointerEvents' value={categoria} onChange={event => setCategoria(event.target.value)} name="estados-brasil">
                  <option value="" disabled selected>Selecione sua área profissional</option>
                  {
                    categorias.map((item, index) => {
                      return (
                        <option key={index} value={item.titulo}>{item.titulo}</option>
                      )
                    })
                  }
                </select>

                <label >Estado</label>
                <select className='pointerEvents' value={estado} onChange={event => setEstado(event.target.value)} name="estados-brasil">
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

                <input className='inputCRUDPerfil' style={{ backgroundColor: 'white', color: 'var(--principal)' }} type="submit" onClick={editar} value='Editar' />

                <input className='inputCRUDPerfil' style={{ backgroundColor: 'var(--principal)', color: 'white' }} type="submit" onClick={salvar} value='Salvar' />
                <a className='inputCRUDPerfil' href='/trocarsenha' style={{ backgroundColor: 'white', color: 'var(--principal)' }} type="submit" value='Trocar Senha'>Trocar Senha</a>
                <a className='inputCRUDPerfil' href='/trocaremail' style={{ backgroundColor: 'white', color: 'var(--principal)' }} value='Trocar Email'>Trocar Email</a>
                <a className='inputCRUDPerfil' href='/atualizarCurriculo' style={{ backgroundColor: 'white', color: 'var(--principal)' }} value='Atualizar Curriculo'>Atualizar Currículo</a>

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
