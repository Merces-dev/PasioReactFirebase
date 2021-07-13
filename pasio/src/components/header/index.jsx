import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Logo from '../../utils/img/pasio.png'
import { IoMenuOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useToasts } from 'react-toast-notifications';

import { RiAccountCircleLine } from 'react-icons/ri';


import '../header/index.css';
const Header = () => {
    const history = useHistory();
    const { addToast } = useToasts();
    const token = localStorage.getItem('token');
    if (token === null) {
        decoded = 'unlogged'
    } else {
        var decoded = jwt_decode(token);
    }

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
        history.push('/');
        addToast(`Deslogado com sucesso`, { appearance: 'success', autoDismiss: true });


    }
    const openNavDropDown = () => {
        let navdd = document.getElementById('idDivMenu');
        if (navdd.style.display == "flex") {
            navdd.style.display = "none";

        } else {
            navdd.style.display = "flex";

        }

    }
    const renderAccountMobile = () => {

        if (token === null) {
            return (
                <Nav>
                    <Nav.Link className='hover' href="/">
                        <div className="hoverMobile">
                            Início
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/login">
                        <div href="/login" className="hoverMobile">
                            Login
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/cadastro">
                        <div className="hoverMobile">
                            Cadastre-se
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/servicos">
                        <div className="hoverMobile">
                            Serviços
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/oportunidades">
                        <div className="hoverMobile">
                            Oportunidades
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos">
                        <div className="hoverMobile">
                            Quem Somos
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos#trabalheconosco">
                        <div className="hoverMobile">
                            Trabalhe Conosco
                        </div>
                    </Nav.Link>

                </Nav>

            )
        } else if (decoded.role == "admin") {
            return (
                <Nav >
                    <Nav.Link className='hover' href="/">
                        <div className="hoverMobile">
                            Início
                        </div>

                    </Nav.Link>

                    <Nav.Link className='hover' href="/admin/dashboard">
                        <div className="hoverMobile">
                            Dashboard
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/candidatos">
                        <div className="hoverMobile">
                            Candidatos
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/oportunidades">
                        <div className="hoverMobile">
                            Oportunidades
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/funcionarios">
                        <div className="hoverMobile">
                            Funcionarios
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/perfil">
                        <div className="hoverMobile">
                        Meu Perfil

                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' onClick={event => logout(event)} >
                        <div className="hoverMobile">
                            Sair
                        </div>

                    </Nav.Link>
                </Nav>
            )
        }
        else if (decoded.role == "funcionario") {
            return (
                <Nav >
                    <Nav.Link className='hover' href="/">
                        <div className="hoverMobile">
                            Início
                        </div>

                    </Nav.Link>

                    <Nav.Link className='hover' href="/admin/dashboard">
                        <div className="hoverMobile">
                            Dashboard
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/candidatos">
                        <div className="hoverMobile">
                            Candidatos
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/oportunidades">
                        <div className="hoverMobile">
                            Oportunidades
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/funcionarios">
                        <div className="hoverMobile">
                            Servicos
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/perfil">
                        <div className="hoverMobile">
                        Meu Perfil

                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' onClick={event => logout(event)} >
                        <div className="hoverMobile">
                            Sair
                        </div>

                    </Nav.Link>
                </Nav>
            )
        }
        else {
            return (
                <Nav >
                    <Nav.Link className='hover' href="/">
                        <div className="hoverMobile">
                            Início
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/servicos">
                        <div className="hoverMobile">
                            Serviços
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/oportunidades">
                        <div className="hoverMobile">
                            Oportunidades
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos">
                        <div className="hoverMobile">
                            Quem Somos
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos#trabalheconosco">
                        <div className="hoverMobile">
                            Trabalhe Conosco
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/perfil">
                        <div className="hoverMobile">
                            Meu Perfil
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' onClick={event => logout(event)} >
                        <div className="hoverMobile">
                            Sair
                        </div>

                    </Nav.Link>
                </Nav>
            )

        }
    }
    const renderAccount = () => {
        if (token === null) {
            return (
                <Nav className='navDesktop'>
                    <Nav.Link className='hover' href="/">
                        <div className="hoverMobile">
                            Início
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/login">
                        <div href="/login" className="hoverMobile">
                            Login
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/cadastro">
                        <div className="hoverMobile">
                            Cadastre-se
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/servicos">
                        <div className="hoverMobile">
                            Serviços
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/oportunidades">
                        <div className="hoverMobile">
                            Oportunidades
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos">
                        <div className="hoverMobile">
                            Quem Somos
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos#trabalheconosco">
                        <div className="hoverMobile">
                            Trabalhe Conosco
                        </div>
                    </Nav.Link>

                </Nav>

            )
        } else if (decoded.role == "admin") {
            return (
                <Nav className='navDesktop'>
                    <Nav.Link className='hover' href="/">
                        <div>
                            Início
                        </div>

                    </Nav.Link>

                    <Nav.Link className='hover' href="/admin/dashboard">
                        <div className="hoverMobile">
                            Dashboard
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/candidatos">
                        <div className="hoverMobile">
                            Candidatos
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/oportunidades">
                        <div className="hoverMobile">
                            Oportunidades
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/admin/funcionarios">
                        <div className="hoverMobile">
                            Funcionarios
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/perfil">
                        <div className="hoverMobile">
                            Meu Perfil
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' onClick={event => logout(event)} >
                        <div className="hoverMobile">
                            Sair
                        </div>

                    </Nav.Link>
                </Nav>
            )
        }
        else {
            return (
                <Nav className='navDesktop'>
                    <Nav.Link className='hover' href="/">
                        <div>
                            Início
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' href="/servicos">
                        <div>
                            Serviços
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/oportunidades">
                        <div>
                            Oportunidades
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos">
                        <div>
                            Quem Somos
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/quemsomos#trabalheconosco">
                        <div>
                            Trabalhe Conosco
                        </div>
                    </Nav.Link>
                    <Nav.Link className='hover' href="/perfil">
                        <div className="hoverMobile">
                            Meu Perfil
                        </div>

                    </Nav.Link>
                    <Nav.Link className='hover' onClick={event => logout(event)} >
                        <div className="hoverMobile">
                            Sair
                        </div>

                    </Nav.Link>
                </Nav>
            )

        }
    }

    const closeNavDropDown = () => {
        let navdd = document.getElementById('idDivMenu');
        navdd.style.display = "none";
    }
    return (
        <div className='total'>

            <div className='container1'>
                <div className='containerPos'>
                    <div>
                        <a href="/"><img src={Logo} alt="Logo Pasio" /></a>
                    </div>
                    <div id="openMenu">
                        <button className='botaoStyle' onClick={openNavDropDown}>
                            <IoMenuOutline className='tamIcon' />
                        </button>
                    </div>
                    <Nav className='navDesktop'>
                        {renderAccount()}
                    </Nav>
                </div>
            </div>
            <div id="idDivMenu">
                <div className='navMobile'>
                    <Nav>
                        {renderAccountMobile()}

                    </Nav>

                </div>
            </div>
        </div>



    )
}
export default Header;