import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Logo from '../../utils/img/pasio.png'
import { IoMenuOutline } from 'react-icons/io5';



import '../header/index.css';
const Header = () => {

    const openNavDropDown = () => {
        let navdd = document.getElementById('idDivMenu');
        if (navdd.style.display == "flex") {
            navdd.style.display = "none";

        }else{
            navdd.style.display = "flex";

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
                        <button  className='botaoStyle' onClick={openNavDropDown}>
                            <IoMenuOutline  className='tamIcon' />
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
                    </Nav>
                </div>
                </div>
            <div id="idDivMenu">
                    <div className='navMobile'>
                        <Nav>
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