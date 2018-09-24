import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMovies } from '../../actions';
import _ from 'lodash';
class MovieView extends React.Component {
  onCancel() {
    this.props.history.push('/');
  }
  onSubmitUser() {
    this.props.history.push('/secure/movieUpload');
  }
  componentDidMount() {
    this.props.fetchMovies();
  }

  renderMovies() {
    return _.map(this.props.movies, movie => {
      console.log(movie);
      return (
        <li className="list-group-item" key={movie._id}>
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">
                {movie.imageUrl
                  ? <img
                      src={
                        'https://s3-us-west-1.amazonaws.com/my-movie-bucket/' +
                        movie.imageUrl
                      }
                      alt=""
                    />
                  : ''}
              </h4>
              <label>
                Movie Title: {movie.title}
              </label>
            </div>
          </div>
        </li>
      );
    });
  }
  render() {
    if (!this.props.movies) {
      return '';
    }
    return (
      <div>
        <div className="btn pull-left">
          <button
            className="btn btn-warning"
            onClick={this.onCancel.bind(this)}
          >
            Back
          </button>
        </div>
        <div className="btn pull-right">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmitUser.bind(this)}
          >
            Movie Upload
          </button>
        </div>
        <br />
        <br />
        <h2 align="center"> Movie List</h2>
        {this.renderMovies()}
      </div>
    );
  }
}
function mapStateToProps({ movies }) {
  return { movies };
}
export default connect(mapStateToProps, { fetchMovies })(withRouter(MovieView));
