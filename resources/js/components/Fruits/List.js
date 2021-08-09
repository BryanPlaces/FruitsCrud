import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FruitsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fruits:[],
      fruit: {
        name:'',
        size: '',
        color: '',
      }
    }

    this.handleChangeFruit = this.handleChangeFruit.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                CRUD de Frutas
                <button
                  className="btn btn-primary col-md-4"
                  type="button"
                  data-toggle="modal"
                  onClick={() => this.openCreateModalFruit()}
                  data-target="#exampleModal"
                >
                  Crear producto
                </button>
              </div>

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

        <form>
          <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Añadir Fruta</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                   <label>Nombre</label>
                   <input name="name" type="text" className="form-control" value={this.state.fruit.name} onChange={this.handleChangeFruit} />
                  </div>
                  <div className="form-group">
                   <label>Tamaño</label>
                   <input name="size" type="text" className="form-control" value={this.state.fruit.size} onChange={this.handleChangeFruit} />
                  </div>
                  <div className="form-group">
                   <label>Color</label>
                   <input name="color" type="text" className="form-control" value={this.state.fruit.color} onChange={this.handleChangeFruit} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-primary" onClick={()=>this.handleSubmit()}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  handleChangeFruit(event){
    let field = event.target.name;
    let fruit = {...this.state.fruit};
    fruit[field] = event.target.value;
    this.setState({fruit: {...fruit}});
  }

  componentDidMount() {
    this.fetchFruits();
  }

  fetchFruits() {
    axios.get('/api/fruits')
      .then(res=>{
        this.setState({fruits:res.data});
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleSubmit() {
    axios.post('/api/fruits', this.state.fruit)
      .then(res => {
        $("#exampleModal").modal("hide");
        this.fetchFruits();
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleEdit(id) {
    console.log(id);
  }

  handleDelete(id) {
    axios.delete(`/api/fruits/${id}`)
    .then(res=>{
      this.fetchFruits();
    }).catch(error=>{
      alert("Error "+error);
    })
  }


  openCreateModalFruit() {
    const fruit = {
      name:"",
      size:"",
      color:"",
    };
    this.setState({fruit: {...fruit}});
    $("#exampleModal").modal("hide");
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
