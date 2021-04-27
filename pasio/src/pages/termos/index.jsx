import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Form, Button } from 'react-bootstrap';

import './index.css'



const Termos = () => {

  return (
    <div >
      <Header />
      <main>
        <div className="groupTermos columnTermos width85">
            <div>
                <h1>Termos</h1>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Termos;
