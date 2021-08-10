import React from 'react';
import Swal from 'sweetalert2';

class FruitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruit: props.fruit,
      errors: [],
    }
    this.handleChangeFruit = this.handleChangeFruit.bind(this);
  }

  render() {
    return (
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
                    { this.props.sizes.map(size =>
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
    );
  }

  handleChangeFruit(event){
    let field = event.target.name;
    let fruit = {...this.state.fruit};
    fruit[field] = event.target.value;
    this.setState({fruit: {...fruit}});
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
        this.props.fetchFruits();
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
        this.props.fetchFruits();
      })
      .catch(e => {
        if (e.response && e.response.data) {
          const errors = Object.values(e.response.data.errors);
          this.setState({errors: errors});
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
}

export default FruitForm;
