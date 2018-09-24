import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import './movieDetails.css';
import {connect} from "react-redux";
import ReactPlayer from 'react-player';
import StarRatingComponent from 'react-star-rating-component';
import '../app.css'


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
            isAdmin : false,
            userList:[],
            ratingList:[],
            rating: 0,
            comment:""
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
                    movie_length:nextProps.moviesData.data.movieInfo.movie_length,
                    ratingList:nextProps.moviesData.data.movieInfo.ratingList
                });
            }
            this.setState({
                userList : nextProps.moviesData.data.userList
            });
        }
    }

    componentWillMount(){
        console.log(this.props);
        let movie_id = this.props.match.params.movie_id;
        this.props.getMovieDetails(movie_id);
        this.props.getBookedMovieUserList({hallId:1,screenId:1});
        //this.props.getHalls();
        //this.props.getGenreList();
    }

    rateNow(e){
        e.preventDefault();
        if(this.state.rating == 0){
            alert("Please select number of stars");
        }
        else{
            let ratingDetails = {};
            ratingDetails.review = this.state.comment;
            ratingDetails.rating = this.state.rating;
            ratingDetails.movieId = this.props.match.params.movie_id;
            ratingDetails.userId = 1;//this.props.match.params.movie_id;;
            this.props.rateNow(ratingDetails).then(
                (data) => {
                    this.props.getMovieDetails(this.props.match.params.movie_id);
                },
                (err) => {}
            );
        }
    }

    editMovie(path){
        this.props.history.push(path+this.props.match.params.movie_id+"");
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

    deleteBooking(id){
        this.props.cancelBooking(id).then(
            (data) => {
                this.setState({
                    successMessage: data.data.message
                })
                this.props.getBookedMovieUserList({hall_id:1,screen_id:1});
            },
            (err) => {});
}


    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const {successMessage} = this.state;
        return (
            <div className="container-fluid row">
                <div className="display-flex justify-content-md-center mt40">
                    <div className="col-md-8  justify-content-md-center">
                        {this.state.isAdmin ?
                            <div>
                                {successMessage && <div className="success-block">{successMessage}</div>}
                                {this.state.userList.map((user,i) =>
                                    <div key={i}>
                                        <div className="details-font display-flex mt20">
                                            <div className="col-md-7">{user.name}</div>
                                            <div className="col-md-3">{user.billing_id}</div>
                                            <div className="col-md-2 col-md-offset-8 cur-pointer" onClick={() => this.deleteBooking(user.billing_id)}>x</div>
                                        </div>
                                    </div>)}
                            </div>
                            :
                            <div>
                                <div>
                                    <div>
                                    <h1>{this.state.title}</h1>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-5 details-font">
                                            <h2>Movie Details</h2>
                                            <hr/>
                                            <div className="spacing">Release Date : {this.state.release_date}</div>
                                            <div className="spacing">Duration : {this.state.movie_length} Minutes</div>
                                            <div className="spacing">Genre : {this.state.genre}</div>
                                            <div className="spacing">See It In : {this.state.see_it_in}</div>
                                            <div className="spacing">Average Rating : 3</div>
                                            <button className="btn btn-warning spacing">Book Now</button>
                                        </div>
                                        <div className="col-md-7">
                                            <ReactPlayer url={this.state.trailer_link}/>
                                        </div>
                                    </div></div>
                                    <div><button className="btn btn-warning spacing" onClick={() =>  this.editMovie('/edit-movie/')}>Edit Movie</button></div>
                                </div>
                                <div className="mt60">
                                    <h1>CAST</h1>
                                    <hr/>
                                    {this.state.movie_characters ?
                                    <div className="details-font">
                                        {this.state.movie_characters.split(",").map((char,i) =>
                                            <div key={i}>
                                                <div>{char}</div>
                                            </div>)}
                                    </div>
                                        : ""}
                                </div>
                                <div className="mt60">
                                    <h1>REVIEWS AND RATINGS</h1>
                                    <hr/>
                                    {this.state.ratingList && this.state.ratingList.length >0 ?
                                    <div className="details-font">
                                        {this.state.ratingList.map((rating,i) =>
                                            <div key={i}>
                                                {/*<div>Rating - <label className="rating-font-color">{rating.rating}/5</label></div>*/}
                                                <div>
                                                    Rating -
                                                    <StarRatingComponent
                                                        name="rate1"
                                                        starCount={5}
                                                        value={rating.rating}
                                                    />
                                                </div>
                                                <div className="rating-user-font">By {rating.first_name} {rating.last_name}</div>
                                                <div>Review - <label className="review-style">{rating.review}</label></div>
                                                <hr/>
                                            </div>)}
                                    </div>
                                        : <div className="details-font">Not Rated Yet</div>}
                                </div>
                                <form  onSubmit={this.rateNow.bind(this)}>
                                <div>
                                    <h2>Rate the movie</h2>
                                    <StarRatingComponent
                                        required
                                        name="rate1"
                                        starCount={5}
                                        value={this.state.rating}
                                        onStarClick={this.onStarClick.bind(this)}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="comment"
                                        required
                                        onChange={(e) => this.setState({
                                            comment : e.target.value
                                        })}
                                    />
                                </div>
                                    <button className="btn btn-primary">Rate the movie</button>
                                </form>
                            </div>
                            }
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
export default connect(mapStateToProps,mapDispatchToProps)(MovieDetails);
//export default Landing;