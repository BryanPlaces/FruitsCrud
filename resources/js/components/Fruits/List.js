import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

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
      filters: {
        name: '',
        size: '',
      },
      errors: [],
    }

    this.handleChangeFruit = this.handleChangeFruit.bind(this);
    this.handleChangeFilters = this.handleChangeFilters.bind(this);
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>CRUD de Frutas</h1>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Buscar por nombre"
                      value={this.state.filters.name}
                      onChange={this.handleChangeFilters}
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      name="size"
                      className="form-control"
                      value={this.state.filters.size}
                      onChange={this.handleChangeFilters}
                    >
                     { this.state.sizes.map(size =>
                      <option key={size.id} value={size.id}>{size.name}</option>
                     )}
                    </select>
                  </div>
                  <div className="col-md-4 text-right">
                    <button
                      className="btn btn-primary col-md-4"
                      type="button"
                      data-toggle="modal"
                      onClick={() => this.openCreateModalFruit()}
                      data-target="#fruitModal"
                    >
                      Añadir fruta
                    </button>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-md-12">
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
                                <button
                                  className="btn btn-secondary btn-lg dropdown-toggle"
                                  type="button" id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                />
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
                {(() => {
                  if (Object.keys(this.state.errors).length > 0) {
                    return (
                      <ul className="alert alert-danger" role="alert">
                        {this.state.errors.map(error =>
                          <li key={error}>{error}</li>
                        )}
                      </ul>
                    )
                  }
                })()}
                <div className="modal-body">
                  <div className="form-group">
                   <label>Nombre</label>
                   <input
                    name="name"
                    type="text"
                    className="form-control"
                    value={this.state.fruit.name}
                    onChange={this.handleChangeFruit}
                    required
                  />
                  </div>
                  <div className="form-group">
                    <label>Tamaño</label>
                    <select
                      name="size"
                      required
                      className="form-control"
                      value={this.state.fruit.size}
                      onChange={this.handleChangeFruit}
                    >
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

  handleChangeFilters(event){
    let field = event.target.name;
    let filters = {...this.state.filters};
    filters[field] = event.target.value;
    this.setState({filters: {...filters}});
    process.nextTick(() => {
      this.fetchFruits()
    })
  }

  componentDidMount() {
    this.fetchFruits();
  }

  fetchFruits() {
    axios.get('/api/fruits', {
      params: {
        name: this.state.filters.name,
        size: this.state.filters.size,
      }
    })
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
        this.showMessage('Fruta añadida correctamente');
        $("#fruitModal").modal("hide");
        this.fetchFruits();
      })
      .catch(e => {
        if (e.response && e.response.data) {
          const errors = Object.values(e.response.data.errors);
          this.setState({errors: errors});
        }
      })
  }

  handleUpdate() {
    axios.patch(`/api/fruits/${this.state.fruit.id}`, this.state.fruit)
      .then(res => {
        this.showMessage('Fruta actualizada correctamente');
        $("#fruitModal").modal("hide");
        this.fetchFruits();
      })
      .catch(e => {
        if (e.response && e.response.data) {
          const errors = Object.values(e.response.data.errors);
          this.setState({errors: errors});
        }
      })
  }

  handleEdit(id) {
    const fruit = this.state.fruits.find(x => x.id === id);
    this.setState({ fruit: {...fruit}});
    this.setState({errors: []});
    $("#fruitModal").modal("show");
  }

  handleDelete(id) {
    Swal.fire({
      title: '¿Está seguro de eliminar esta fruta?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/fruits/${id}`)
        .then(res=>{
          this.showMessage('Fruta eliminada correctamente');
          this.fetchFruits();
        }).catch(error=>{
          alert("Error "+error);
        })
      }
    })
  }

  showMessage(text) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1200,
    })
  }

  openCreateModalFruit() {
    const fruit = {
      name:"",
      size:"",
      color:"#000000",
    };
    this.setState({fruit: {...fruit}});
    this.setState({errors: []});
    $("#fruitModal").modal("hide");
  }
}
if (document.getElementById('fruit')) {
  ReactDOM.render(<FruitsList />, document.getElementById('fruit'));
}
