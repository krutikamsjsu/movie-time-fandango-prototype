import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import './movieDetails.css';
import {connect} from "react-redux";
import PieChart from 'react-simple-pie-chart';

class Revenue extends React.Component {

    constructor() {
        super();
        this.state={
            revenueList : [],
            colors : ['red','blue','green','aqua','brown','black','00f','f03']
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData){
            if(nextProps.moviesData.data){
                let revenueLst = nextProps.moviesData.data.revenueList;
                let revenueList = [];

                for(let i=0;i<revenueLst.length;i++){
                    let revenue = {};//{value:'',label:'',color:''};
                    revenue.label = revenueLst[i].title;
                    revenue.value = revenueLst[i].revenue;
                    revenue.color = this.state.colors[i];
                    revenueList.push(revenue);
                }
                this.setState ({
                    revenueList : revenueList
                })
            }
        }
    }

    componentWillMount(){
        console.log(this.props);
        let hall_id = this.props.match.params.hall_id;
        this.props.getMoviesRevenue(2);
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="display-flex justify-content-md-center mt40">
                    <div className="col-md-8  justify-content-md-center">
                        <div>
                            {
                                this.state.revenueList.map((revenue,i) =>
                                    <h5 key={i}>
                                        <label>{revenue.label} : {revenue.value}</label>
                                    </h5>
                                )}
                            <PieChart
                                slices={this.state.revenueList}
                            />
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

export default connect(mapStateToProps,mapDispatchToProps)(Revenue);