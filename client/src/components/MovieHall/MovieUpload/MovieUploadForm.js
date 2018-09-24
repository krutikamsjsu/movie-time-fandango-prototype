import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitNewMovie } from '../../../actions';

class MovieUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      file: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    var values = {
      title: this.state.value
    };
    var file = this.state.file;
    this.props.submitNewMovie(values, file);
  }

  onFileChange(event) {
    this.setState({
      file: event.target.files[0]
    });
  }
  renderField(field) {
    return (
      <div className="form-group">
        <label>
          {field.label}
        </label>

        <input className="form-control" type="text" {...field.input} />
        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  onSubmit() {
    this.props.onMovieSubmit();
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input
          onChange={this.onFileChange.bind(this)}
          type="file"
          accept="image/*"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
function validate(values) {
  const errors = {};
  return errors;
}

export default connect(null, { submitNewMovie })(withRouter(MovieUploadForm));
