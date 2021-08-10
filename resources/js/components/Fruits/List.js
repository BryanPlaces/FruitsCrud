import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FruitForm from './Form.js';
import FruitFilters from './Filters.js';
import Swal from 'sweetalert2';

export default class FruitsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num:0,
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

    this.fetchFruits = this.fetchFruits.bind(this);
    this.handleChangeFilters = this.handleChangeFilters.bind(this);
    this.openCreateModalFruit = this.openCreateModalFruit.bind(this);
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
                <FruitFilters
                  sizes={this.state.sizes}
                  filters={this.state.filters}
                  handleChangeFilters={this.handleChangeFilters}
                  openCreateModalFruit={this.openCreateModalFruit}
                />
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

        <FruitForm
          key={this.state.num}
          sizes={this.state.sizes}
          fetchFruits={this.fetchFruits}
          fruit={this.state.fruit}
        />
      </div>
    );
  }

  handleChangeFilters(event){
    let field = event.target.name;
    let filters = {...this.state.filters};
    filters[field] = event.target.value;
    this.setState({filters: {...filters}});
    process.nextTick(() => {
      this.fetchFruits();
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

  handleEdit(id) {
    this.setState(state => ({ num: state.num + 1 }));
    const fruit = this.state.fruits.find(x => x.id === id);
    this.setState({ fruit: {...fruit}});
    this.setState({errors: []});

    process.nextTick(() => {
      $("#fruitModal").modal("show");
    })
  }

  handleDelete(id) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta fruta?',
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
      color:"#FFFFFF",
    };
    this.setState(state => ({ num: state.num + 1 }));
    this.setState({fruit: {...fruit}});
    this.setState({errors: []});

    process.nextTick(() => {
      $("#fruitModal").modal("show");
    })
  }
}
if (document.getElementById('fruit')) {
  ReactDOM.render(<FruitsList />, document.getElementById('fruit'));
}
