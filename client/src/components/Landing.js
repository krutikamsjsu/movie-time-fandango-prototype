import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import '../app.css';
import {connect} from "react-redux";
import {Redirect,withRouter} from 'react-router-dom';

class Landing extends React.Component {
    state={
        moviesList:[],
        moviesListBck:[],
        hallsList:[],
        hallsListBck:[],
        //genreList:[],
        priceList:[]
    };

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData){
            if(nextProps.moviesData.data){
                this.setState ({
                    moviesList : nextProps.moviesData.data.moviesList,
                    hallsList : nextProps.moviesData.data.hallsList,
                    //genreList : nextProps.moviesData.data.genreList,
                    moviesListBck : nextProps.moviesData.data.moviesList,
                    hallsListBck : nextProps.moviesData.data.hallsList
                });

                console.log(JSON.stringify(nextProps.moviesData.data));
                let price_list = [], price;
                for(let i=0;i<nextProps.moviesData.data.hallsList.length;i++){
                    price = nextProps.moviesData.data.hallsList[i].ticket_price;
                    if(price_list.indexOf(price)== -1) {
                        price_list.push(price);
                    }
                }
                this.setState({
                    priceList : price_list
                });
            }
        }
    }

    componentWillMount(){
        this.props.getMovies();
        this.props.getHalls();
        //this.props.getGenreList();
    }

    searchData(value){
        this.setState({
            moviesList : this.state.moviesListBck
        })
        var searchStr = value;
        if(searchStr == ""){
            this.setState({
                moviesList : this.state.moviesListBck,
                hallsList : this.state.hallsListBck
            })
        }else {
            this.setState({
                moviesList : this.state.moviesListBck.filter(function (movie) {
                    return (movie.title.toUpperCase().includes(searchStr.toUpperCase()));
                }),
                hallsList : this.state.hallsListBck.filter(function (hall) {
                    return (hall.name.includes(searchStr));
                })
            });
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
        this.searchData(e.target.value);
    }

    onHandleChangeRating(rating){
        this.setState({
            moviesList : this.state.moviesListBck.filter(function (movie) {
                return (movie.rating == rating);
            })
        });
    }

    onHandleChangePrice(price){
        this.setState({
            hallsList : this.state.hallsListBck.filter(function (hall) {
                return (hall.ticket_price == price);
            })
        });
    }

  renderAdvertisement() {
    const styles = {
      height: '170px'
    };

    return (
      <div className="container">
        <h1 className="my-4 text-center text-lg-left">Offers</h1>

        <div className="row text-center text-lg-left">
          <div className="col-lg-3 col-md-4 col-xs-6">
            <img
              style={styles}
              className="img-fluid img-thumbnail"
              src="http://hunt4freebies.com/wp-content/uploads/2011/03/Hollywood-Insider.png"
              alt="Popcorn add"
            />
          </div>
          <div className="col-lg-3 col-md-4 col-xs-6">
            <img
              style={styles}
              className="img-fluid img-thumbnail"
              src="http://www.documatics.com/wp-content/uploads/2017/06/hiring.jpeg"
              alt=""
            />
          </div>
          <div className="col-lg-3 col-md-4 col-xs-6">
            <img
              style={styles}
              className="img-fluid img-thumbnail"
              src="https://www.solocamion.es/wp-content/uploads/2017/12/coca-cola-truck.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }

  renderMoviesComingSoon() {
    return (
      <div className="container">
        <h1 className="my-4 text-center text-lg-left">Movies Coming Soon</h1>

        <div className="row text-center text-lg-left">
          <div className="col-lg-3 col-md-4 col-xs-6">
            <a href="#" className="d-block mb-4 h-100">
              <img
                className="img-fluid img-thumbnail"
                src="http://placehold.it/400x300"
                alt="Image"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }

    movieDetails(movie_id){
        this.props.history.push("/movie-details/"+movie_id);
    }

  renderMoviesNowPlaying() {
    return (
        <div className="container">
            <h1 className="my-4 text-center text-lg-left">Movies Now Playing</h1>


            <div className="row text-center text-lg-left">
                {this.state.moviesList.map((movie,i) =>
                    <h5 key={i}>
                        <div>
                            <div className="col-lg-3 col-md-4 col-xs-6">
                                <Link href="#" className="d-block mb-4 h-100"  to={'/movie-details/'+movie.movie_id}>
                                    <img
                                        className="img-fluid img-thumbnail"
                                        src={movie.photo}
                                        alt={movie.title}
                                    />
                                    <label>{movie.title}</label>
                                </Link>
                            </div>
                        </div>
                    </h5>)}
            </div>
        </div>
    );
  }
  render() {
    const styles = {
      width: '100%',
      height: '500px'
    };
    return (
      <div className="container-fluid">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#myCarousel" data-slide-to="1" />
            <li data-target="#myCarousel" data-slide-to="2" />
          </ol>

          <div className="carousel-inner">
            <div className="item active">
              <img
                src="http://www.etimesnow.com/wp-content/uploads/2016/04/deadpool-2.jpg"
                alt="Dead Pool"
                style={styles}
              />
            </div>

            <div className="item">
              <img
                src="https://boygeniusreport.files.wordpress.com/2017/12/guardians-of-the-galaxy-vol-2.jpg?quality=98&strip=all&w=1564"
                alt="Black Panther"
                style={styles}
              />
            </div>

            <div className="item">
              <img
                src="https://revengeofthefans.com/wp-content/uploads/2018/03/Avengers-Infinity-War-poster.jpg"
                alt="Avengers"
                style={styles}
              />
            </div>
          </div>

          <a
            className="left carousel-control"
            href="#myCarousel"
            data-slide="prev"
          >
            <span className="glyphicon glyphicon-chevron-left" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right" />
            <span className="sr-only">Next</span>
          </a>
            <input type="text"
                   name="search"
                   onChange={this.onChange.bind(this)}
                   placeholder="Search"
                   className="searchBox col-md-4"/><button type="submit" className="p510" onClick={() => this.searchData(this.state.search)}><i class="fa fa-search"></i></button>

        </div>
          <div>
              <label className="select-view mr50">Select Rating:</label>
              <label className="radio-label">
                  <input type="Radio" name="rating" onClick={() => this.onHandleChangeRating("1")}></input>1 Star
              </label>
              <label className="radio-label">
                  <input type="Radio" name="rating" onClick={() => this.onHandleChangeRating("2")}></input>2 Stars
              </label>
              <label className="radio-label">
                  <input type="Radio" name="rating" onClick={() => this.onHandleChangeRating("3")}></input>3 Stars
              </label>
              <label className="radio-label">
                  <input type="Radio" name="rating" onClick={() => this.onHandleChangeRating("4")}></input>4 Stars
              </label>
              <label className="radio-label">
                  <input type="Radio" name="rating" onClick={() => this.onHandleChangeRating("5")}></input>5 Stars
              </label>
          </div>


        {this.renderMoviesNowPlaying()}
        {this.renderMoviesComingSoon()}
        {this.renderAdvertisement()}
        <br />
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
export default connect(mapStateToProps,mapDispatchToProps)(Landing);
