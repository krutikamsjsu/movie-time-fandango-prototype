import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import '../App.css';
import {connect} from "react-redux";
import {Redirect,withRouter} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class BookingsList extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData){
            if(nextProps.moviesData.data){
                this.setState ({
                    moviesList : nextProps.moviesData.data.moviesList,
                    hallsList : nextProps.moviesData.data.hallsList,
                    genreList : nextProps.moviesData.data.genreList,
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
    render() {
        return (
            <div className="container-fluid">
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
export default connect(mapStateToProps,mapDispatchToProps)(BookingsList);
//export default Landing;