import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import TextosAdmin from './pages/admin/textos';
import OportunidadesAdmin from './pages/admin/oportunidades';
import NotFound from './pages/notfound';


const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/oportunidades' component={Oportunidades} />
      <Route path='/cadastro' component={Cadastro} />
      <Route path='/login' component={Login} />
      <Route path='/servicos' component={Servicos} />
      <Route path='/quemsomos' component={QuemSomos} />
      <Route path='/servicos' component={Servicos} />
      <Route path='/termos' component={Termos} />
      <Route path='/politica' component={Politica} />
      <Route path='/admin/candidatos' component={Candidatos} />
      <Route path='/admin/categorias' component={Categorias} />
      <Route path='/admin/dashboard' component={Dashboard} />
      <Route path='/admin/textos' component={TextosAdmin} />
      <Route path='/admin/oportunidades' component={OportunidadesAdmin} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
