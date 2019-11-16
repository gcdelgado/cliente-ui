import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeCpf = this.onChangeCpf.bind(this);
        this.onChangeCep = this.onChangeCep.bind(this);
        this.onChangeLogradouro = this.onChangeLogradouro.bind(this);
        this.onChangeBairro = this.onChangeBairro.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
        this.onChangeUf = this.onChangeUf.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nome: '',
            cpf: '',
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: ''
        }
    }
    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }
    onChangeCpf(e) {
        this.setState({
            cpf: e.target.value
        })
    }
    onChangeCep(e) {
        this.setState({
            cep: e.target.value
        })
    }
    onChangeLogradouro(e) {
        this.setState({
            logradouro: e.target.value
        })
    }
    onChangeBairro(e) {
        this.setState({
            bairro: e.target.value
        })
    }
    onChangeCidade(e) {
        this.setState({
            cidade: e.target.value
        })
    }
    onChangeUf(e) {
        this.setState({
            uf: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            nome: this.state.nome,
            cpf: this.state.cpf,
            endereco: {
                cep: this.state.cep,
                logradouro: this.state.logradouro,
                bairro: this.state.bairro,
                cidade: this.state.cidade,
                uf: this.state.uf
            }
        };
        axios.post('http://localhost:8080/clientes', obj)
            .then(res => console.log(res.data));

        this.setState({
            nome: '',
            cpf: ''
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Adicionar Cliente</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.onChangeNome}
                        />
                    </div>
                    <div className="form-group">
                        <label>CPF: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.cpf}
                               onChange={this.onChangeCpf}
                        />
                    </div>
                    <div className="form-group">
                        <label>CEP: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.cep}
                               onChange={this.onChangeCep}
                        />
                    </div>
                    <div className="form-group">
                        <label>Logradouro: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.logradouro}
                               onChange={this.onChangeLogradouro}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bairro: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.bairro}
                               onChange={this.onChangeBairro}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cidade: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.cidade}
                               onChange={this.onChangeCidade}
                        />
                    </div>
                    <div className="form-group">
                        <label>UF: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.uf}
                               onChange={this.onChangeUf}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Salvar" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}