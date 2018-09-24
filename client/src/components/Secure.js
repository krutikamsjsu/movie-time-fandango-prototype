import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MovieUploadForm from './MovieHall/MovieUpload/MovieUploadForm';

const Dashboard = () => <h2> DashBoard</h2>;

class Secure extends Component {
  render() {
    console.log('Secure is here');
    return (
      <div>
        <div className="container">
          <Route exact path="/secure/dashboard" component={Dashboard} />

          <Route exact path="/secure/movieUpload" component={MovieUploadForm} />
        </div>
      </div>
    );
  }
}
export default Secure;
