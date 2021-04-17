import React, { useState } from 'react';
import { IoIosSearch, IoIosReturnLeft } from 'react-icons/io';
import { IoMenuOutline } from 'react-icons/io5';
import { AiOutlineClose } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import {Link} from 'react-router-dom';

import '../Header/index.css';
const Header = () => {
    

    return (
        <div className='total'>
            <div className='container1'>
                <div className='containerPos'>
                    <div>
                        <a href="/"><img src="https://www.amug.com/wp-content/uploads/2016/09/you-logo-here.png" alt="logo" /></a>

                    </div>
                    <div id="divBusca">
                        <input type="text" id="txtBusca" onChange={event => setPesquisa(event.target.value)} />
                        <button>
                            <Link to='/produtos/'>
                                <IoIosSearch style={{ color: 'rgb(13,92,99,1)', fontSize: '40px' }} className='tamIcon' />

                            </Link>
                        </button>
                    </div>
                    <div id="divMenu">
                        <button onClick={openNavDropDown}>
                            <IoMenuOutline style={{ color: 'rgb(13,92,99,1)', fontSize: '40px' }} className='tamIcon' />
                        </button>
                    </div>
                </div>
                <div id='idNavDropDown'>
                    <div>
                    <p style={{ color: '#78cdd7', fontWeight: '500', marginTop:'25px', marginLeft: '40px' }}>Menu</p>

                    </div>
                    <div className='columnNav navMenu'>
                    {renderHeader()}
                    <p><a href="/produtos">Produtos</a></p>
                    <button onClick={openFiltersNav}>
                        <p>Filtros</p>
                    </button>
                    <button onClick={closeNavDropDown}>
                        <AiOutlineClose className='tamIcon02' />
                    </button>

                    </div>

                </div>
                <div id='idFilters'>
                    <div className='filtros'>
                    <p style={{ color: '#78cdd7', fontWeight: '500', marginTop:'25px', marginLeft: '40px' }}>Filtros</p>
                        <button onClick={openNavDropDown}>
                            <IoIosReturnLeft className='tamIcon03' />
                        </button>

                        <button onClick={closeFiltersNav}>
                            <AiOutlineClose className='tamIcon02' />
                        </button>

                    </div>
                    <div id='idfiltervalues'>
                        <a href="" className='linkDoacao'>Disponível para doação</a>
                        <p style={{ marginTop: '10px' }}>Preços</p>
                        <p><a href="">Até R$ 20</a></p>
                        <p><a href="">De R$ 20 a 50R$</a></p>
                        <p><a href="">De R$ 50 a 100R$</a></p>
                        <p>Data Validade:</p>
                        <p style={{ display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.7)' }}>Até: <input style={{ width: '100px' }} maxLength="10" type="text" id="txtBusca" placeholder="dd/mm/aaaa" /></p>


                    </div>
                </div>

            </div>
            <div id="divBuscaMobile">
                <input type="text" id="txtBusca" />
                <button>
                    <IoIosSearch style={{ color: 'rgb(13,92,99,1)' }} className='tamIcon' />
                </button>
            </div>
        </div>



    )
}
export default Header;