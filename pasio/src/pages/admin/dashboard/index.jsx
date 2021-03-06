import React from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Form, Button } from 'react-bootstrap';
import Logo from '../../../utils/img/pasio.png'
import { MdChevronRight } from 'react-icons/md'
import './index.css'
import { motion } from "framer-motion"


const Dashboard = () => {

  return (
    <div >
      <Header />
      <div id="lateral">
        <div id='seta'>
          <MdChevronRight style={{ color: 'white', fontSize: '40px' }} />

        </div>
        <div id="menu">

          <h3 class="link-titulo">Dashboard</h3>
          <ul class="box">
            <li><a href="/admin/candidatos">Visualizar Candidatos</a></li>
            <li><a href="/admin/categorias">Gerenciar Categorias</a></li>
            <li ><a href="/admin/oportunidades">Gerenciar Oportunidades</a></li>
            <li ><a href="/admin/equipe">Gerenciar Equipe</a></li>
            <li ><a href="/admin/servicos">Gerenciar Serviços</a></li>
            <li ><a href="/admin/funcionarios">Gerenciar Funcionários</a></li>

          </ul>

        </div>
        <div id="link">
          <img src={Logo} alt="" />
        </div>
      </div>
      <main>
          <motion.div className='groupDashboard columnDashboard width85'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <a href="/admin/candidatos">
              <div className='cardDashboard'>
                <div>
                  <h3>Visualizar Candidatos</h3>
                </div>
                <div className='cardDashboardImg'>
                  <img src="https://exame.com/wp-content/uploads/2018/06/candidatos.jpg" alt="" />
                </div>

              </div>
            </a>


            <a href="/admin/categorias">
              <div className='cardDashboard'>
                <div>
                  <h3>Gerenciar Categorias</h3>
                </div>
                <div className='cardDashboardImg'>
                  <img src="https://electiservicos.com.br/wp-content/uploads/2020/08/Por-que-contratar-uma-empresa-de-RH-para-fazer-o-recrutamento-e-sele%C3%A7%C3%A3o-1.jpg" alt="" />
                </div>

              </div>
            </a>
            <a href="/admin/oportunidades">
              <div className='cardDashboard'>
                <div>
                  <h3>Gerenciar Oportunidades</h3>
                </div>
                <div className='cardDashboardImg'>
                  <img src="https://www.moblee.com.br/blog/wp-content/uploads/sites/2/2017/08/Como-fazer-os-melhores-crach%C3%A1s-para-o-seu-evento.png" alt="" />
                </div>

              </div>
            </a>


            <a href="/admin/equipe">
              <div className='cardDashboard'>
                <div>
                  <h3>Gerenciar Equipe</h3>
                </div>
                <div className='cardDashboardImg'>
                  <img src="https://electiservicos.com.br/wp-content/uploads/2020/08/Por-que-contratar-uma-empresa-de-RH-para-fazer-o-recrutamento-e-sele%C3%A7%C3%A3o-1.jpg" alt="" />
                </div>

              </div>
            </a>
            <a href="/admin/servicos">
              <div className='cardDashboard'>
                <div>
                  <h3>Gerenciar Serviços</h3>
                </div>
                <div className='cardDashboardImg'>
                  <img src="https://electiservicos.com.br/wp-content/uploads/2020/08/Por-que-contratar-uma-empresa-de-RH-para-fazer-o-recrutamento-e-sele%C3%A7%C3%A3o-1.jpg" alt="" />
                </div>

              </div>
            </a>
            <a href="/admin/funcionarios">
              <div className='cardDashboard'>
                <div>
                  <h3>Gerenciar Funcionários</h3>
                </div>
                <div className='cardDashboardImg'>
                  <img src="https://electiservicos.com.br/wp-content/uploads/2020/08/Por-que-contratar-uma-empresa-de-RH-para-fazer-o-recrutamento-e-sele%C3%A7%C3%A3o-1.jpg" alt="" />
                </div>

              </div>
            </a>
          </motion.div>


      </main>
    </div>
  );
}

export default Dashboard;
