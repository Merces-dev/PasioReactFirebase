import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';

import './index.css'



const Perfil = () => {

  return (
    <div >
      <Header />
      <main>
        <div className="groupPerfil columnPerfil width85">
            <div>
                <h1>Perfil</h1>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
