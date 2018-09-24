import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import './movieDetails.css';
import {connect} from "react-redux";
import ReactPlayer from 'react-player';

class BookingUserList extends React.Component {

    constructor() {
        super();
        this.state = {
            title:"",
            trailer_link:"",
            release_date:"",
            movie_characters:"",
            see_it_in:"",
            genre:"",
            movie_length:""
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData){
            if(nextProps.moviesData.data.movieInfo){
                this.setState ({
                    title:nextProps.moviesData.data.movieInfo.title,
                    trailer_link:nextProps.moviesData.data.movieInfo.trailer_link,
                    release_date:nextProps.moviesData.data.movieInfo.release_date,
                    movie_characters:nextProps.moviesData.data.movieInfo.characters,
                    see_it_in:nextProps.moviesData.data.movieInfo.see_it_in,
                    genre:nextProps.moviesData.data.movieInfo.genre,
                    movie_length:nextProps.moviesData.data.movieInfo.movie_length
                });
            }
        }
    }

    componentWillMount(){
        console.log(this.props);
        let movie_id = this.props.match.params.movie_id;
        this.props.getMovieDetails(movie_id);
        //this.props.getHalls();
        //this.props.getGenreList();
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

    addMovie(){
        this.props.addMovie(this.state);
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="display-flex justify-content-md-center mt40">
                    <div className="col-md-8  justify-content-md-center">
                        <div>
                            <h1>{this.state.title}</h1>
                            <hr/>
                            <div className="row">
                                <div className="col-md-5 details-font">
                                    <h2>Movie Details</h2>
                                    <hr/>
                                    <div className="spacing">Release Date : {this.state.release_date}</div>
                                    <div className="spacing">Duration : {this.state.movie_length}</div>
                                    <div className="spacing">Genre : {this.state.genre}</div>
                                    <div className="spacing">See It In : {this.state.see_it_in}</div>
                                    <div className="spacing">Average Rating : 3</div>
                                    <button className="btn btn-warning spacing">Book Now</button>
                                </div>
                                <div className="col-md-7">
                                    <ReactPlayer url={this.state.trailer_link}/>
                                </div>
                            </div>
                        </div>
                        <div className="mt60">
                            <h1>CAST</h1>
                            <hr/>
                            <div className="details-font">
                                {this.state.movie_characters.split(",").map((char,i) =>
                                    <div key={i}>
                                        <div>{char}</div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(BookingUserList);
//export default Landing;