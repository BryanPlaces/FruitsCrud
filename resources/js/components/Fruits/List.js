import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FruitsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fruits:[]
    }
  }

  componentDidMount() {
    this.fetchFruits();
  }

  fetchFruits() {
    axios.get('/api/fruits')
      .then(response=>{
        this.setState({fruits:response.data});
      }).catch(error=>{
        alert("Error "+error);
      })
  }

  handleEdit(id) {
    console.log(id);
  }

  handleDelete(id) {
    axios.delete(`/api/fruits/${id}`)
    .then(response=>{
      this.fetchFruits();
    }).catch(error=>{
      alert("Error "+error);
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">CRUD de Frutas</div>
              <div className="card-body">
                <table className="table table-bordered order-table ">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tamaño</th>
                      <th>Color</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody id="bodytable">
                    {this.renderFruitsList()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFruitsList() {
    return this.state.fruits.map((data)=>{
      return(
        <tr key={data.id}>
          <td>{data.name}</td>
          <td>{data.size_text}</td>
          <td>{data.color}</td>
          <td>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                test
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" type="button" onClick={() => this.handleEdit(data.id)}>Editar</a>
                <a className="dropdown-item" type="button" onClick={() => this.handleDelete(data.id)}>Eliminar</a>
              </div>
            </div>
          </td>
        </tr>
      )
    })
  }
}
if (document.getElementById('fruit')) {
  ReactDOM.render(<FruitsList />, document.getElementById('fruit'));
}
