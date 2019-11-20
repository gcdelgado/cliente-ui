import React, {Component} from 'react';
import axios from 'axios';
import AuthService from "../service/auth.service";
import {Link} from "react-router-dom";

export default class Consulta extends Component {

    constructor(props) {
        super(props);
        this.state = {clientes: []};
    }

    componentDidMount() {
        console.log('AUTH ', AuthService.getAuthHeader());
        axios.get('http://localhost:8080/clientes', AuthService.getAuthHeader())
            .then(response => {
                this.setState({clientes: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onClickExcluir = (id) => {
        axios.delete('http://localhost:8080/clientes/' + id, AuthService.getAuthHeader()).then(response => {
                window.open('/consulta', '_top');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };

    tabRow = (onClickExcluir) => {

        return this.state.clientes.map(function (obj, i) {

            return (
                <tr>
                    <td>
                        {obj.nome}
                    </td>
                    <td>
                        {obj.cpfMascara}
                    </td>
                    <td>
                        {obj.endereco.cepMascara}
                    </td>
                    <td>
                        {obj.endereco.cidade}
                    </td>
                    <td>
                        <Link to={'/edicao/' + obj.id} className="btn btn-primary">Editar</Link>
                    </td>
                    <td>
                        <button className="btn btn-danger"
                                onClick={onClickExcluir.bind(this, obj.id)} disabled={AuthService.getUserName() !== "admin"}>Excluir
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div>
                <h3 align="center">Clientes</h3>

                <Link to={'/edicao'} className="btn btn-primary">+ Novo</Link>

                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>CEP</th>
                        <th>Cidade</th>
                        <th colSpan="2">Ação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow(this.onClickExcluir)}
                    </tbody>
                </table>
            </div>
        );
    }
}