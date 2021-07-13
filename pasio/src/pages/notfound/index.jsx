import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import NotFoundImage from '../../utils/img/notFound.svg';
import './index.css'
const NotFound = () => {
    return(
        <div className='backgroundC' >
            <Header/>

                <div className="container container-404">
                    <div className="container-divs">
                        <img className='container-img'src={NotFoundImage} alt="imagem do erro 404"/>
                    </div>
                    <div className="container-divs">
                        <p  className="texto">Página Não Encontrada</p>
                        <a href="/" className="texto">Por Favor, Volte à nossa página inicial</a>
                    </div>
                </div>
                <div className='footer'>
                <Footer/>

                </div>

        </div>
    )
}
export default NotFound;