import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import './movieDetails.css';
import {connect} from "react-redux";
import {Redirect,withRouter} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class MovieDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            title:"",
            trailer_link:"",
            release_date:"",
            movie_characters:"",
            see_it_in:"",
            genre:"",
            movie_length:"",
            minimum_age:3,
            description:"",
            image_url:""
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData){
            if(nextProps.moviesData.data.movieInfo){
                this.setState ({
                    title:nextProps.moviesData.data.movieInfo.title,
                    movie_id:nextProps.moviesData.data.movieInfo.movie_id,
                    trailer_link:nextProps.moviesData.data.movieInfo.trailer_link,
                    //release_date:nextProps.moviesData.data.movieInfo.release_date,
                    movie_characters:nextProps.moviesData.data.movieInfo.characters,
                    see_it_in:nextProps.moviesData.data.movieInfo.see_it_in,
                    genre:nextProps.moviesData.data.movieInfo.genre,
                    movie_length:nextProps.moviesData.data.movieInfo.movie_length,
                    ratingList:nextProps.moviesData.data.movieInfo.ratingList,
                    minimum_age:nextProps.moviesData.data.movieInfo.minimum_age,
                    description:nextProps.moviesData.data.movieInfo.description,
                    image_url:nextProps.moviesData.data.movieInfo.image_url
                });
            }
        }
    }

    componentWillMount(){
        if(this.props.match.params.movie_id){
            //alert(this.props.match.params.movie_id);
            let movie_id = this.props.match.params.movie_id;
            this.props.getMovieDetails(movie_id);
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            release_date: date
        });
    }

    addMovie(e){
        e.preventDefault();
        let movieDetails = this.state;
        if(this.props.match.params.movie_id) {
            movieDetails.action = "edit";
        }else{
            movieDetails.action = "add";
        }
        this.props.addMovie(movieDetails).then(
            (data) => {
                this.props.history.push("/movie-details/"+this.props.match.params.movie_id+"");
            },
            (err) => {
                this.setState({
                    error : "Unable to add or edit movie"
                });
            });
    }


    render() {
        return (
            <div className="container-fluid">
                <h1 className="text-center">{this.props.match.params.movie_id ?  'Edit Movie' : 'Add Movie'}</h1>
                {this.state.error && <div className="success-block">{this.state.error}</div>}
                <form className="col-md-offset-3 col-md-6 add-movie-form" style={{marginBottom:'40px'}}>
                <input
                    className="form-control"
                    placeholder="Enter Movie Name"
                    type="text"
                    required
                    label=""
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Trailer Link"
                    type="url"
                    required
                    label=""
                    name="trailer_link"
                    value={this.state.trailer_link}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Movie Characters seperated by comma"
                    type="text"
                    required
                    label=""
                    name="movie_characters"
                    value={this.state.movie_characters}
                    onChange={this.onChange.bind(this)}
                />
                <div>
                    <h4 className="font-white">Release Date</h4>
                    <DatePicker  required
                                 selected={this.state.release_date}
                                 onChange={this.handleDateChange.bind(this)}
                    />
                </div>
                <input
                    className="form-control"
                    placeholder="Add Movie Length"
                    type="text"
                    required
                    label=""
                    name="movie_length"
                    value={this.state.movie_length}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="See it in"
                    type="text"
                    required
                    label=""
                    name="see_it_in"
                    value={this.state.see_it_in}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Genre"
                    type="text"
                    required
                    label=""
                    name="genre"
                    value={this.state.genre}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Minimum Age"
                    type="text"
                    required
                    label=""
                    name="minimum_age"
                    value={this.state.minimum_age}
                    onChange={this.onChange.bind(this)}
                />
                    <input
                        className="form-control"
                        placeholder="Add Description"
                        type="text"
                        required
                        label=""
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange.bind(this)}
                    />
                    <input
                        className="form-control"
                        placeholder="Add Movie Image URL"
                        type="text"
                        required
                        label=""
                        name="image_url"
                        value={this.state.image_url}
                        onChange={this.onChange.bind(this)}
                    />
                <button className="btn btn-warning mt20" onClick={this.addMovie.bind(this)}>
                    {this.props.match.params.movie_id ?  'Edit Movie' : 'Add Movie'}
                </button>
                </form>
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
export default connect(mapStateToProps,mapDispatchToProps)(MovieDetails);
//export default Landing;