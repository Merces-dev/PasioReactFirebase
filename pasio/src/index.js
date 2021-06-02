import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from 'react-toast-notifications';
import { db, storage } from './utils/firebaseConfig';
import Home from './pages/home'
import QuemSomos from './pages/quemsomos'
import Oportunidades from './pages/oportunidades';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Politica from './pages/politica';
import Termos from './pages/termos';
import Servicos from './pages/servicos';
import Candidatos from './pages/admin/candidatos';
import Categorias from './pages/admin/categorias';
import Dashboard from './pages/admin/dashboard';
import OportunidadesAdmin from './pages/admin/oportunidades';
import NotFound from './pages/notfound';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './utils/firebaseConfig';

const token = localStorage.getItem('uid')


 function getRole() {
  if (token !== null) {
    var role =  db.collection("usuarios")
      .doc(token)
      .get()
      .then((doc) => {
        console.log(doc.data().role.toString())
        return doc.data().role.toString()
      })
    return role
  }
    // await new Promise((resolve, reject) => setTimeout(resolve, 500));

}

const RotaComum = ({ component: Component, ...rest }) => (

  <Route {...rest} render={props => (
    token === null ? (
      <Component {...props} />


    ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />

      )

  )}
  />
);
const RotaPrivada = ({ component: Component, ...rest }) => (

  <Route {...rest} render={props => (
    getRole() === 'admin' ? (
      <Component {...props} />


    ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />

      )

  )}
  />
);
const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/oportunidades' component={Oportunidades} />
      <RotaComum path='/cadastro' component={Cadastro} />
      <RotaComum path='/login' component={Login} />
      <Route path='/servicos' component={Servicos} />
      <Route path='/quemsomos' component={QuemSomos} />
      <Route path='/servicos' component={Servicos} />
      <Route path='/termos' component={Termos} />
      <Route path='/politica' component={Politica} />
      <RotaPrivada path='/admin/candidatos' component={Candidatos} />
      <RotaPrivada path='/admin/categorias' component={Categorias} />
      <RotaPrivada path='/admin/dashboard' component={Dashboard} />
      <RotaPrivada path='/admin/oportunidades' component={OportunidadesAdmin} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>

    <ToastProvider>
      {routing}
    </ToastProvider>
  </FirebaseAppProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
