import React, {Component} from 'react';
import axios from 'axios';

export default class Edicao extends Component {
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
            uf: '',
            emails: [],
            telefones: []
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

    createEmails() {
        return this.state.emails.map((el, i) =>
            <div key={i} className="input-group">
                <input type="text" value={el.email || ''} onChange={this.onChangeEmail.bind(this, i)}
                       className="form-control"/>
                <span className="input-group-btn">
                <input type='button' value='X' onClick={this.onClickRemoveEmail.bind(this, i)}
                       className="btn btn-secondary"/>
                </span>
            </div>
        )
    }

    onChangeEmail(i, event) {
        let values = [...this.state.emails];
        values[i].email = event.target.value;
        this.setState({emails: values});
    }

    onClickAddEmail() {
        this.setState(prevState => ({emails: [...prevState.emails, {}]}))
    }

    onClickRemoveEmail(i) {
        let values = [...this.state.emails];
        values.splice(i, 1);
        this.setState({emails: values});
    }

    createTelefones() {
        return this.state.telefones.map((el, i) =>
            <div key={i} className="form-group">
                <div className="input-group">
                    <input type="text" value={el.numero || ''} onChange={this.onChangeTelefone.bind(this, i)}
                           className="form-control" required/>
                    <select className='form-control' value={el.tipo} onChange={this.onChangeTipoTelefone.bind(this, i)} required>
                        <option value='' label='Selecione'/>
                        <option value='CEL' label='Celular'/>
                        <option value='RES' label='Residencial'/>
                        <option value='COM' label='Comercial'/>
                    </select>
                    <span className="input-group-btn">
                <input type='button' value='X' onClick={this.onClickRemoveTelefone.bind(this, i)}
                       className="btn btn-secondary"/>
                </span>
                </div>
            </div>
        )
    }

    onChangeTelefone(i, event) {
        let values = [...this.state.telefones];
        values[i].numero = event.target.value;
        this.setState({telefones: values});
    }

    onChangeTipoTelefone(i, event) {
        let values = [...this.state.telefones];
        values[i].tipo = event.target.value;
        this.setState({telefones: values});
    }

    onClickAddTelefone() {
        this.setState(prevState => ({telefones: [...prevState.telefones, {}]}))
    }

    onClickRemoveTelefone(i) {
        let values = [...this.state.telefones];
        values.splice(i, 1);
        this.setState({telefones: values});
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
            },
            emails: this.state.emails,
            telefones: this.state.telefones
        };

        console.log(obj);

        axios.post('http://localhost:8080/clientes', obj)
            .then(res => console.log(res.data));

        this.setState({
            nome: '',
            cpf: '',
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
            emails: [],
            telefones: []
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Adicionar Cliente</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.onChangeNome}
                            required/>
                    </div>
                    <div className="form-group">
                        <label>CPF: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.cpf}
                               onChange={this.onChangeCpf}
                               required/>
                    </div>
                    <fieldset>
                        <legend>Endereço:</legend>
                        <div className="form-group">
                            <label>CEP: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.cep}
                                   onChange={this.onChangeCep}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>Logradouro: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.logradouro}
                                   onChange={this.onChangeLogradouro}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>Bairro: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.bairro}
                                   onChange={this.onChangeBairro}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>Cidade: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.cidade}
                                   onChange={this.onChangeCidade}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label>UF: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.uf}
                                   onChange={this.onChangeUf}
                                   required/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>E-mails</legend>
                        {this.createEmails()}
                        <div className="form-group">
                            <input type='button' value="+ Adicionar" onClick={this.onClickAddEmail.bind(this)}
                                   className="btn btn-secondary"/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Telefones</legend>
                        {this.createTelefones()}
                        <div className="form-group">
                            <input type='button' value="+ Adicionar" onClick={this.onClickAddTelefone.bind(this)}
                                   className="btn btn-secondary"/>
                        </div>
                    </fieldset>

                    <div className="form-group">
                        <input type="submit" value="Salvar" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}