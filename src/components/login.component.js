import React, {Component} from 'react';
import AuthService from "../service/auth.service";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
        };
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    login = (e) => {
        e.preventDefault();
        const credentials = {"username": this.state.username, "password": this.state.password};
        AuthService.login(credentials).then(res => {
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem("userToken", JSON.stringify(res.data));
                localStorage.setItem("userName", this.state.username);
                window.open('/consulta', '_top');
            } else {
                this.setState({message: res.data.message});
            }
        });
    };

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <div style={{width: 500}}>

                <form>
                    <h4 align="center">{this.state.message}</h4>
                    <div className="form-group">
                        <label>Usuário</label>
                        <input type="text" name="username"
                               value={this.state.username}
                               className="form-control"
                               onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        Senha
                        <input type="password" name="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <input type="button" className="btn btn-primary" onClick={this.login} value="Login"/>
                    </div>
                </form>
            </div>


        )
    }

}