import React from "react";
import {bindActionCreators} from 'redux'
import { NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as getData from '../../actions/adminActions';
import {adminData} from "../../reducers/adminReducer";
import {AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Legend} from 'recharts';

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dMessage: "",
            uMessage: ""
        };
    };
    componentWillMount(){
        this.props.getTop10MovieRevenues().then(
            (data) => {
                console.log("after getTop10MovieRevenues",this.props.adminData.data.top10_movie_revenues);
                this.setState({
                    top10_movie_revenues: this.props.adminData.data.top10_movie_revenues
                });
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getCityWiseRevenuePerYearForMovie(1).then(
            (data) => {
                console.log("after getCityWiseRevenuePerYearForMovie",this.props.adminData.data.citywise_revenue_peryear_for_movie);
                this.setState({
                    citywise_revenue_peryear_for_movie: this.props.adminData.data.citywise_revenue_peryear_for_movie
                });
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getTop10HallsWithMaxRevenue().then(
            (data) => {
                console.log("after getTop10HallsWithMaxRevenue",this.props.adminData.data.top10_halls_with_max_revenue);
                this.setState({
                    top10_halls_with_max_revenue: this.props.adminData.data.top10_halls_with_max_revenue
                });
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getPageClicks().then(
            (data) => {
                console.log("after getPageClicks",this.props.adminData.data.pageClicks);
                var pageClicksArray = [];
                var obj = {pageName : "Login", clicks : this.props.adminData.data.pageClicks.Login}
                pageClicksArray[0] = obj;
                obj = {pageName : "Signup", clicks : this.props.adminData.data.pageClicks.Signup}
                pageClicksArray[1] = obj;
                obj = {pageName : "Home", clicks : this.props.adminData.data.pageClicks.Home}
                pageClicksArray[2] = obj;
                obj = {pageName : "Landing", clicks : this.props.adminData.data.pageClicks.Landing}
                pageClicksArray[3] = obj;
                obj = {pageName : "Dashboard", clicks : this.props.adminData.data.pageClicks.Dashboard}
                pageClicksArray[4] = obj;
                obj = {pageName : "MovieDetails", clicks : this.props.adminData.data.pageClicks.MovieDetails}
                pageClicksArray[5] = obj;
                obj = {pageName : "Bills", clicks : this.props.adminData.data.pageClicks.Bills}
                pageClicksArray[6] = obj;
                obj = {pageName : "BillDetails", clicks : this.props.adminData.data.pageClicks.BillDetails}
                pageClicksArray[7] = obj;

                this.setState({
                    pageClicksArray: pageClicksArray
                });
                console.log("this.props.adminData.data.pageClicks",this.state.pageClicksArray);
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getMovieClicks().then(
            (data) => {
                console.log("after getMovieClicks",this.props.adminData.data.movieClicks);
                this.setState({
                    movieClicks: this.props.adminData.data.movieClicks
                });
                console.log("this.props.adminData.data.movieClicks",this.state.movieClicks);
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getReviewsOnMovies(this.state).then(
            (data) => {
                console.log("after getReviewsOnMovies",this.props.adminData.data.reviewsOnMovies);
                var reviewData = this.props.adminData.data.reviewsOnMovies;
                var reviewArray = [];
                for(var i=0; i<reviewData.length; i++){
                    var obj = {name:reviewData[i].title,value:reviewData[i].avgRating}
                    reviewArray.push(obj);
                }
                console.log("reviews-------------------",reviewArray);
                //var revM = [{name:"A quite place",value:3.4},{name:"Deadpool",value:4},{name:"JP",value:2.2}];
                this.setState({
                    reviewsOnMovies: reviewArray
                });
                console.log("reviewsOnMovies",this.state.reviewsOnMovies);
            },
            (err) => {
                console.log("inside err");
            });

        /*this.props.getTop10MovieRevenues(this.state).then(
            (data) => {
                console.log("after getTop10MovieRevenues",this.props.adminData.data.top10_movie_revenues);
                this.setState({
                    top10_movie_revenues: this.props.adminData.data.top10_movie_revenues
                });
                console.log("this.props.adminData.data.top10_movie_revenues",this.state.top10_movie_revenues);
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getTop10MovieRevenues(this.state).then(
            (data) => {
                console.log("after getTop10MovieRevenues",this.props.adminData.data.top10_movie_revenues);
                this.setState({
                    top10_movie_revenues: this.props.adminData.data.top10_movie_revenues
                });
                console.log("this.props.adminData.data.top10_movie_revenues",this.state.top10_movie_revenues);
            },
            (err) => {
                console.log("inside err");
            });*/
    }

    render(){
        const data = [
            {text: 'Man', value: 300},
            {text: 'Woman', value: 100},
            {text: 'ChildMan', value: 50},
            {text: 'ChildWoman', value: 75}
        ];
        const margin = {top: 20, right: 20, bottom: 30, left: 40};

        const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
            {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]

        const data02 = [{name: 'A1', value: 100},
            {name: 'A2', value: 300},
            {name: 'B1', value: 100},
            {name: 'B2', value: 80},
            {name: 'B3', value: 40},
            {name: 'B4', value: 30},
            {name: 'B5', value: 50},
            {name: 'C1', value: 100},
            {name: 'C2', value: 200},
            {name: 'D1', value: 150},
            {name: 'D2', value: 50}]


        const dataForBar = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181}
        ];

        const dataForLine = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        ];

        const dataForBar1 = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        ];

        console.log("state : ",this.state);
        return(
            <div>
                <div className="page-header-container">
                    <div className="row">
                        <nav className="page-navigation">
                            <ul className="page-navigation-list">
                                <li><NavLink className="page-navigation-link" to="/User/EditProfile"> Upload Movie </NavLink> </li>
                            </ul>
                            <ul className="page-navigation-list">
                                <li><NavLink className="page-navigation-link" to="">  Edit Movie Hall </NavLink> </li>
                            </ul>
                            <ul className="page-navigation-list">
                                <li><NavLink className="page-navigation-link" to="">  Edit Movie Hall </NavLink> </li>
                            </ul>
                            <ul className="page-navigation-list">
                                <li><NavLink className="page-navigation-link" to="">  Purchase History </NavLink> </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="row">

                    {/*Retrieve data from database and show first 10 movies with its revenue/year*/}
                    <div className="col-sm-4">
                        Top 10 movies with its revenue/year - 2018
                        <br/><br/>
                        <BarChart width={400} height={200} data={this.state.top10_movie_revenues}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="title"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="totalRevenue" fill="#FFA500" />
                        </BarChart>
                    </div>

                    <div className="col-sm-4">
                        City wise revenue/year - 2018
                        <br/><br/>
                        <BarChart width={300} height={200} data={this.state.citywise_revenue_peryear_for_movie}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="city"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="totalRevenue" fill="#8884d8" />
                        </BarChart>
                    </div>

                    <div className="col-sm-4">
                        Top 10 halls with maximum revenue/year
                        <br/><br/>
                        <LineChart width={500} height={300} data={this.state.top10_halls_with_max_revenue}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="hallName"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="row">
                            Reviews for Movies
                            <br/><br/>
                            <PieChart width={800} height={500}>
                                <Pie data={this.state.reviewsOnMovies} cx={150} cy={150} innerRadius={50} outerRadius={90} fill="#82ca9d" label/>
                            </PieChart>
                            <br/>
                        </div>
                        <div className="row">
                            {this.state.reviewsOnMovies && this.state.reviewsOnMovies.map((reviews,i) =>
                                <h5 key={i}>
                                    <div className="col-md-2">{reviews.name} : {reviews.value}</div>
                                </h5>)}
                        </div>
                    </div>

                    <div className="col-sm-3">
                        Top 10 movies with its revenue/year
                        <br/><br/>
                        {/*<PieChart width={500} height={400}>
                            <Pie data={data01} cx={100} cy={100} outerRadius={40} fill="#8884d8"/>
                            <Pie data={data02} cx={100} cy={100} innerRadius={60} outerRadius={70} fill="#82ca9d" label/>
                        </PieChart>*/}
                    </div>

                    {/*area chart for pages seen*/}

                    <div className="col-sm-3">
                        Top 10 movies with its revenue/year
                        <br/><br/>
                        {/*<PieChart width={500} height={400}>
                            <Pie data={data01} cx={100} cy={100} outerRadius={40} fill="#8884d8"/>
                            <Pie data={data02} cx={100} cy={100} innerRadius={60} outerRadius={70} fill="#82ca9d" label/>
                        </PieChart>*/}
                    </div>

                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        Area wise graph
                        <br/><br/>
                        <AreaChart width={800} height={300} data={this.state.pageClicksArray}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="pageName"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type='monotone' dataKey='clicks' stackId="1" stroke='#F4A460' fill='#F4A460' />
                        </AreaChart>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        adminData : state.admin
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, getData), dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(Admin);