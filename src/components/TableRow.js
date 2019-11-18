import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.nome}
                </td>
                <td>
                    {this.props.obj.cpfMascara}
                </td>
                <td>
                    {this.props.obj.endereco.cepMascara}
                </td>
                <td>
                    {this.props.obj.endereco.cidade}
                </td>
                <td>
                    <Link to={'/edicao/' + this.props.obj.id} className="btn btn-primary" >Editar</Link>
                </td>
                <td>
                    <button className="btn btn-danger">Excluir</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;