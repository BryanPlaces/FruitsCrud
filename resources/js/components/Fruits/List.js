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
      },
      sizes: [
        {id: '', name: 'Seleccionar tamaño'},
        {id: 0, name: 'Pequeño'},
        {id: 1, name: 'Mediano'},
        {id: 2, name: 'Grande'},
      ],
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
                  data-target="#fruitModal"
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
                    {this.state.fruits.map(data =>
                      <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.size_text}</td>
                        <td><button type="button" className="btn btn-circle btn-lg" style={{backgroundColor:data.color}} /></td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" type="button" onClick={() => this.handleEdit(data.id)}>Editar</a>
                              <a className="dropdown-item" type="button" onClick={() => this.handleDelete(data.id)}>Eliminar</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <form>
          <div className="modal fade" id="fruitModal" role="dialog" aria-labelledby="fruitModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="fruitModalLabel">Añadir Fruta</h5>
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
                   <select name="size" className="form-control" value={this.state.fruit.size} onChange={this.handleChangeFruit}>
                     { this.state.sizes.map(size =>
                      <option key={size.id} value={size.id}>{size.name}</option>
                     )}
                    </select>
                  </div>
                  <div className="form-group">
                   <label>Color</label>
                   <input name="color" type="color" className="form-control form-control-color" value={this.state.fruit.color} onChange={this.handleChangeFruit} />
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
    if (this.state.fruit.id) {
      this.handleUpdate();
    }else{
      this.handleCreate();
    }
  }

  handleCreate() {
    axios.post('/api/fruits', this.state.fruit)
      .then(res => {
        $("#fruitModal").modal("hide");
        this.fetchFruits();
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleUpdate() {
    axios.patch(`/api/fruits/${this.state.fruit.id}`, this.state.fruit)
      .then(res => {
        $("#fruitModal").modal("hide");
        this.fetchFruits();
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleEdit(id) {
    const fruit = this.state.fruits.find(x => x.id === id);
    this.setState({ fruit: {...fruit}});
    $("#fruitModal").modal("show");
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
      color:"#000000",
    };
    this.setState({fruit: {...fruit}});
    $("#fruitModal").modal("hide");
  }
}
if (document.getElementById('fruit')) {
  ReactDOM.render(<FruitsList />, document.getElementById('fruit'));
}
