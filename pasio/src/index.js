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
import Servicos from './pages/servicos';
const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/oportunidades' component={Oportunidades} />
      <Route path='/cadastro' component={Cadastro} />
      <Route path='/servicos' component={Servicos} />
      <Route path='/quemsomos' component={QuemSomos} />
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
