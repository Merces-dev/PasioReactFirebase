import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';

import './index.css'



const Politica = () => {

  return (
    <div >
      <Header />
      <main>
        <div className="groupPolitica columnPolitica width85">
            <div>
                <h1>Política e Privacidade</h1>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Politica;
