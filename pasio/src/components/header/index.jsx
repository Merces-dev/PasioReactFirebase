import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Logo from '../../utils/img/pasio.png'
import { IoMenuOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { RiAccountCircleLine } from 'react-icons/ri';


import '../header/index.css';
const Header = () => {
    const history = useHistory();

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('pasio-token');
        history.push('/');

    }
    const openNavDropDown = () => {
        let navdd = document.getElementById('idDivMenu');
        if (navdd.style.display == "flex") {
            navdd.style.display = "none";

        } else {
            navdd.style.display = "flex";

        }

    }
    const renderAccount = () => {
        const token = localStorage.getItem('pasio-token');
        // var decoded = jwt_decode(token);
        // var decodedHeader = jwt_decode(token, { header: true });
        // console.log(decodedHeader);

        if (token === null) {
            return (
                <Nav>
                    <Nav.Link className='hover' href="/login">
                        <div className="hoverMobile">
                            Login
                        </div>

                    </Nav.Link>

                </Nav>

            )
        } else {
            return (
                <Nav>
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
    const openAccount = () => {
        let acc = document.getElementById('idDivAccount');
        if (acc.style.display == "flex") {
            acc.style.display = "none";

        } else {
            acc.style.display = "flex";

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
                        <a href="/"><img src={Logo} alt="logo" /></a>
                    </div>
                    <div id="openMenu">
                        <button className='botaoStyle' onClick={openNavDropDown}>
                            <IoMenuOutline className='tamIcon' />
                        </button>
                    </div>
                    <Nav className='navDesktop'>
                        <Nav.Link className='hover' href="/">
                            <div>
                                Início
                            </div>

                        </Nav.Link>
                        <Nav.Link className='hover' href="/cadastro">
                            <div>
                                Cadastre-se
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
                        <Nav.Link onClick={openAccount}>
                            <div>
                                <RiAccountCircleLine style={{ fontSize: '40px', color: '#99313D' }} />
                            </div>
                        </Nav.Link>

                    </Nav>
                </div>
            </div>
            <div id="idDivMenu">
                <div className='navMobile'>
                    <Nav>
                        <Navbar.Text onClick={openAccount} className='account01'>
                            <button className='account'  >
                                <RiAccountCircleLine style={{ fontSize: '40px', color: '#99313D' }} />

                            </button>

                        </Navbar.Text>
                        <Navbar.Text id='idDivAccount'>
                            {renderAccount()}

                        </Navbar.Text>
                        <Nav.Link className='hover' href="/">
                            <div className="hoverMobile">
                                Início
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

                </div>
            </div>
        </div>



    )
}
export default Header;