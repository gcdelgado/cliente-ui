import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Edicao from './components/edicao.component';
import Consulta from './components/consulta.component';
import Login from "./components/login.component";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    {localStorage.getItem("userToken") != null &&
                    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/consulta'} className="nav-link">Consultar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/edicao'} className="nav-link">Cadastrar</Link>
                                </li>
                                <li className="nav-item">
                                    <a href={'/'} className="nav-link" >Sair</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    }
                    <br/>
                    <h2>SURITTEC - Cadastro de Clientes</h2> <br/>
                    <Switch>
                        <Route exact path='/' component={ Login } />
                        <Route exact path='/edicao' component={ Edicao } />
                        <Route exact path="/edicao/:id" component={ Edicao } /> } />
                        <Route path='/consulta' component={ Consulta } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;