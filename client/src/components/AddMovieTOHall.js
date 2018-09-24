import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import './movieDetails.css';
import {connect} from "react-redux";

class AddMovieTohall extends React.Component {

    constructor() {
        super();
        this.state = {
            movieList:[],
            selectedMovie:""
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData) {
            if (nextProps.moviesData.data) {
                this.setState({
                    movieList: nextProps.moviesData.data.moviesList
                });

            }
        }
    }

    componentWillMount(){
        this.props.getMovies();
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            selectedMovie : e.target.value
        });
        /*var value = this.state.optionsdata.filter(function(item) {
            return item.key == e.target.value
        })*/
    }


    addMovie(){
        var details = {};
        alert(this.state.selectedMovie);
        details.movieId = this.state.selectedMovie;
        details.hallId = 1;
        let movie_times ="";
        if(this.state.t1!=undefined)
        {
            movie_times = this.state.t1;
        }
        if(this.state.t2!=undefined)
        {
            if(movie_times!="")
                movie_times = movie_times +"|"+this.state.t2;
            else
                movie_times = this.state.t2;
        }
        if(this.state.t3!=undefined)
        {
            alert(this.state.t3);
            if(movie_times!="")
                movie_times = movie_times +"|"+this.state.t3;
            else
                movie_times = this.state.t3;
        }
        details.movie_times = movie_times;
        this.props.addMovieToHall(details).then(
            (data) => {
                alert("movie added");
            },
            (err) => {
                this.setState({
                    error : "Unable to add movie"
                });
            }
        );
    }


    render() {
        console.log(this.state.movieList);
        return (
            <div className="container-fluid">
                <div className="mb30">
                    <h4>Select movie you want to add to hall:</h4>
                    <select className="select-style" required onChange={this.handleChange.bind(this)}>
                        {this.state.movieList.map(function(movie, key){
                            return (
                            <option key={key} value={movie.movie_id}>{movie.title}</option> )
                        })}
                    </select>
                    <input type="checkbox" name="chk1"  onChange={(e) => {this.setState({t1:"9-11"})}}/>9-11<br/>
                    <input type="checkbox" name="chk2" onChange={(e) => {this.setState({t2:"11-2"})}}/>11-2<br/>
                    <input type="checkbox" name="chk3"  onChange={(e) => {this.setState({t3:"2-4"})}}/>2-4<br/>
                    <button className="btn btn-primary" onClick={this.addMovie.bind(this)}>Link Now</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        moviesData : state.movies
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, moviesDetails),dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(AddMovieTohall);
//export default Landing;