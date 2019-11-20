import React, {Component} from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import AuthService from "../service/auth.service";

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
            id: null,
            nome: '',
            cpf: '',
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
            emails: [{email: ''}],
            telefones: [{numero: '', tipo: ''}],
        };

        if (this.props.match.params.id) {
            axios.get('http://localhost:8080/clientes/' + this.props.match.params.id, AuthService.getAuthHeader())
                .then(
                    res => {
                        console.log(res.data);
                        this.setState({
                            id: res.data.id,
                            nome: res.data.nome,
                            cpf: res.data.cpf,
                            cep: res.data.endereco.cep,
                            logradouro: res.data.endereco.logradouro,
                            bairro: res.data.endereco.bairro,
                            cidade: res.data.endereco.cidade,
                            uf: res.data.endereco.uf,
                            emails: res.data.emails,
                            telefones: res.data.telefones
                        })
                    }
                );
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
            <div key={i} className="form-group">
                <div className="input-group">
                    <input type="email"
                           value={el.email || ''}
                           onChange={this.onChangeEmail.bind(this, i)}
                           className="form-control"
                           required/>
                    <span className="input-group-btn">
                <input type='button'
                       value='X'
                       onClick={this.onClickRemoveEmail.bind(this, i)}
                       className="btn btn-secondary"
                       disabled={i === 0}/>
                </span>
                </div>
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
                    <select className='form-control'
                            value={el.tipo}
                            onChange={this.onChangeTipoTelefone.bind(this, i)}
                            required>
                        <option value='' label='Tipo'/>
                        <option value='CEL' label='Celular'/>
                        <option value='RES' label='Residencial'/>
                        <option value='COM' label='Comercial'/>
                    </select>
                    <InputMask type="text" value={el.numero || ''} onChange={this.onChangeTelefone.bind(this, i)}
                               className="form-control"
                               mask={el.tipo === 'CEL' ? '(99) 99999-9999' : '(99) 9999-9999'}
                               required/>
                    <span className="input-group-btn">
                <input type='button' value='X'
                       onClick={this.onClickRemoveTelefone.bind(this, i)}
                       className="btn btn-secondary"
                       disabled={i === 0}/>
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

    onClickBuscaCep() {
        axios.get('http://localhost:8080/enderecos/' + this.state.cep, AuthService.getAuthHeader())
            .then(
                res => {
                    console.log(res.data);
                    this.setState({
                        logradouro: res.data.logradouro,
                        bairro: res.data.bairro,
                        cidade: res.data.cidade,
                        uf: res.data.uf
                    });
                }
            );
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id: this.state.id,
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

        axios.post('http://localhost:8080/clientes', obj, AuthService.getAuthHeader())
            .then(res => console.log(res.data));

        this.setState({
            id: '',
            nome: '',
            cpf: '',
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
            emails: [{email: ''}],
            telefones: [{numero: '', tipo: ''}]
        });

    }

    render() {

        return (
            <div style={{marginTop: 10}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor='nome'>Nome *</label>
                        <input id='nome'
                               type="text"
                               className="form-control"
                               value={this.state.nome}
                               onChange={this.onChangeNome}
                               minLength='3'
                               maxLength='100'
                               pattern="[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                               placeholder="Apenas letras e números são permitidos"
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='cpf'>CPF *</label>
                        <InputMask id='cpf'
                                   type="text"
                                   className="form-control"
                                   value={this.state.cpf}
                                   onChange={this.onChangeCpf}
                                   mask="999.999.999-99"
                                   required/>
                    </div>
                    <fieldset>
                        <legend>Endereço:</legend>
                        <div className="form-group">
                            <label htmlFor='cep'>CEP *</label>
                            <div className="input-group">
                                <InputMask id='cep'
                                           type="text"
                                           className="form-control"
                                           value={this.state.cep}
                                           onChange={this.onChangeCep}
                                           mask="99999-999"
                                           required/>
                                <input type='button' value="Localizar"
                                       onClick={this.onClickBuscaCep.bind(this)}
                                       className="btn btn-secondary"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='logradouro'>Logradouro *</label>
                            <input id='logradouro'
                                   type="text"
                                   className="form-control"
                                   value={this.state.logradouro}
                                   onChange={this.onChangeLogradouro}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor='bairro'>Bairro *</label>
                            <input id='bairro'
                                   type="text"
                                   className="form-control"
                                   value={this.state.bairro}
                                   onChange={this.onChangeBairro}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor='uf'>UF *</label>
                            <select id='uf'
                                    className="form-control"
                                    value={this.state.uf}
                                    onChange={this.onChangeUf}
                                    required>
                                <option value="">Selecione</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AM">AM</option>
                                <option value="AP">AP</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MG">MG</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="PR">PR</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SE">SE</option>
                                <option value="SP">SP</option>
                                <option value="TO">TO</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor='cidade'>Cidade *</label>
                            <input id='cidade'
                                   type="text"
                                   className="form-control"
                                   value={this.state.cidade}
                                   onChange={this.onChangeCidade}
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
                        <input type="submit" value="Salvar" className="btn btn-primary" disabled={AuthService.getUserName() !== "admin"}/>
                    </div>
                </form>
            </div>
        )
    }

}