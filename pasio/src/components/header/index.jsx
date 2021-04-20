import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

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
                        <a href="/"><img src="https://www.amug.com/wp-content/uploads/2016/09/you-logo-here.png" alt="logo" /></a>

                    </div>
                    <div id="openMenu">
                        <button  className='botaoStyle' onClick={openNavDropDown}>
                            <IoMenuOutline  className='tamIcon' />
                        </button>
                    </div>
                    <Nav className='navDesktop'>


                        <Nav.Link className='hover' href="/timeline">
                            <div>
                                Início
                            </div>

                        </Nav.Link>
                        <Nav.Link className='hover' href="/timeline">
                            <div>
                                Cadastre-se
                            </div>

                        </Nav.Link>
                        <Nav.Link className='hover' href="/timeline">
                            <div>
                                Serviços
                            </div>

                        </Nav.Link>
                        <Nav.Link className='hover' href="/timeline">
                            <div>
                                Oportunidades
                            </div>

                        </Nav.Link>
                        <Nav.Link className='hover' href="/timeline">
                            <div>
                                Quem Somos
                            </div>

                        </Nav.Link>

                        <Nav.Link className='hover' href="/timeline">
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
                            <Nav.Link className='hover' href="/timeline">
                                <div className="hoverMobile">
                                    Início
                                </div>

                            </Nav.Link>
                            <Nav.Link className='hover' href="/timeline">
                                <div className="hoverMobile">
                                    Cadastre-se
                                </div>

                            </Nav.Link>
                            <Nav.Link className='hover' href="/timeline">
                                <div className="hoverMobile">
                                    Serviços
                                </div>

                            </Nav.Link>
                            <Nav.Link className='hover' href="/timeline">
                                <div className="hoverMobile">
                                    Oportunidades
                                </div>

                            </Nav.Link>
                            <Nav.Link className='hover' href="/timeline">
                                <div className="hoverMobile">
                                    Quem Somos
                                </div>

                            </Nav.Link>

                            <Nav.Link className='hover' href="/timeline">
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