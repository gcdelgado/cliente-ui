import React, { Component } from 'react';

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
                    {this.props.obj.endereco.logradouro}
                </td>
                <td>
                    <button className="btn btn-primary">Editar</button>
                </td>
                <td>
                    <button className="btn btn-danger">Excluir</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;