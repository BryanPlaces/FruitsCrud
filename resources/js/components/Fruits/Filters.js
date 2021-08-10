import React from 'react';
import Swal from 'sweetalert2';

class FruitFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={this.props.filters.name}
            onChange={this.props.handleChangeFilters}
          />
        </div>
        <div className="col-md-4">
          <select
            name="size"
            className="form-control"
            value={this.props.filters.size}
            onChange={this.props.handleChangeFilters}
          >
           { this.props.sizes.map(size =>
            <option key={size.id} value={size.id}>{size.name}</option>
           )}
          </select>
        </div>
        <div className="col-md-4 text-right">
          <button
            className="btn btn-primary col-md-4"
            type="button"
            data-toggle="modal"
            onClick={() => this.props.openCreateModalFruit()}
            data-target="#fruitModal"
          >
            Añadir fruta
          </button>
        </div>
      </div>
    );
  }
}

export default FruitFilters;
