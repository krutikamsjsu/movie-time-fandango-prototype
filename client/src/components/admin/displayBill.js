import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {getBill} from "../../actions/adminActions";
import {connect} from "react-redux";
import Moment from 'react-moment';
import './billDetails.css';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Dropdown
} from 'reactstrap';

const showTimes = ['11:05 AM', '12:15 PM', '1:30 PM',
    '2:15 PM', '3:00 PM', '4:15 PM',
    '6:00 PM', '9:00 PM', '10:15 PM',
    '10:40 PM', '11:00 PM'];
const screen = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
class BillsInfo extends Component {

    constructor (props) {
        super(props)
        this.state = {
            billingId: this.props.match.params.billingId
        };
    }

    componentDidMount() {
        // console.log("props info: " + JSON.stringify(this.props));
        this.props.getBill(this.state.billingId)
    }

    render() {
        return(
            <div className="container-fluid" style={{color: 'white'}}>
                <br/><br/><br/>
                <div id="purchaseDetails" className="module-standard">
                    <h2 className="header-secondary">Purchase Details</h2>
                    <hr/>
                    <div className="row">
                        <div className="purchaseInfo">
                            <div className="movieInfo">
                                <h3 className="movieTitle">{this.props.admin.data.billDetails.title}</h3>
                                <span className="movieRating">(NR)</span>
                                <br/><br/><br/>
                                <p className="showDate"><Moment date={this.props.admin.data.billDetails.date}/></p>
                                <p className="showTime">Showtime: {showTimes[Math.floor(Math.random() * showTimes.length)]}</p>
                                <p className="auditorium">Auditorium: {screen[Math.floor(Math.random() * screen.length)]}</p>
                                <p className="username">Name: {this.props.admin.data.billDetails.firstName} {this.props.admin.data.billDetails.lastName}</p>
                                <p className="numOfPeople">1 x Adult: ${this.props.admin.data.billDetails.totalAmount}</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="theaterInfo">
                            <h2 className="theaterName">{this.props.admin.data.billDetails.hallName}</h2>
                            <div className="address">
                                <p className="theaterMap">
                                    {this.props.admin.data.billDetails.city}, CA
                                    <br/>
                                    {this.props.admin.data.billDetails.zipcode}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ admin }) {
    return { admin };
}

export default connect(mapStateToProps, { getBill })(withRouter(BillsInfo));
