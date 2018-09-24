import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {latest10Bills, searchByDate, searchByMonth, updatePageClick} from "../../actions/adminActions";
import {BILLS} from '../../actions/pageClickEnums';
import {connect} from "react-redux";
// import DatePicker from 'react-datepicker';
// import './datePicker.css';
import moment from 'moment';
import Moment from 'react-moment';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
  color: 'white'
};

class Bills extends Component {

  constructor (props) {
      super(props)
      let d = new Date(moment());
      let date_str = d.getFullYear() + '-0' + (d.getMonth()+1) + '-' + d.getDate();
      let month_str = d.getMonth()+1;
      this.state = {
        bills: [],
        startDate: new Date(),
        dateString: date_str,
        monthString: month_str,
        autoOk: true,
        disableYearSelection: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.getBillsByMonth = this.getBillsByMonth.bind(this);
      this.getBillsByDate = this.getBillsByDate.bind(this);
  }

  componentWillReceiveProps(){}

  componentDidMount() {
    console.log("Did mount called in bills");
    this.props.latest10Bills(1);
    this.props.updatePageClick(BILLS);
  }

  getBillsByDate() {
    console.log("date string: " + this.state.dateString);
    this.props.searchByDate(this.state.dateString, 1);
  }

  getBillsByMonth() {
    console.log("month string: " + this.state.monthString);
    this.props.searchByMonth(this.state.monthString, 1);
  }

  handleChange(event, date_str) {
    console.log("date is: " + date_str);
    var epoch_date = new Date(date_str).getTime();
    let dateObj = new Date(epoch_date);
    let date_in_string = dateObj.getFullYear() + '-0' + (dateObj.getMonth()+1) + '-' + dateObj.getDate();
    let month_in_string = dateObj.getMonth()+1;
    console.log("date in string: " + date_in_string);
    console.log("month in string: " + month_in_string);
    this.setState({
      startDate: dateObj,
      dateString: date_in_string,
      monthString: month_in_string
    });
  }

  render() {
    console.log("this props admin: " + JSON.stringify(this.props.admin));
    return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <br/><br/>
          <p style={{color: 'white'}}>Search by Date/Month</p>
          <div style={{color: 'white'}}>
              <DatePicker
                onChange={this.handleChange}
                autoOk={this.state.autoOk}
                floatingLabelText="Select Date"
                defaultDate={this.state.startDate}
                disableYearSelection={this.state.disableYearSelection}
              />
          </div>
          <Button color="primary" size="sm" onClick={this.getBillsByMonth}>
              Filter by Month
          </Button>
          {' '}
          <Button color="primary" size="sm" onClick={this.getBillsByDate}>
              Filter by Date
          </Button>
          <br/>
          <br/>
          <Table style={{color: 'white'}}>
             <thead>
               <tr>
                 <th>#</th>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>Ticket Count</th>
                 <th>Amount ($)</th>
                 <th>Tax (%)</th>
                 <th>Date</th>
                 <th>View Details</th>
               </tr>
            </thead>
            <tbody>
               {
                 this.props.admin.data.bills.map((billInfo, index) => (
                   <tr key = {index}>
                       <th>{index+1}</th>
                       <td>{billInfo.firstName}</td>
                       <td>{billInfo.lastName}</td>
                       <td>{billInfo.ticketCount}</td>
                       <td>{billInfo.amount}</td>
                       <td>{billInfo.tax}</td>
                       <td><Moment date={billInfo.date} /></td>
                       <td>
                          <span>
                                <Link
                                    to={`/purchase-details/${billInfo.BillingId}`}
                                    className="btn btn-link"
                                    key={billInfo.BillingId}
                                    style={{color: 'white'}}
                                  >
                                View
                              </Link>
                          </span>
                        </td>
                    </tr>
                 ))
               }
             </tbody>
          </Table>
      </div>
    </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ admin }) {
  return { admin };
}

export default connect(mapStateToProps, {latest10Bills, searchByDate, searchByMonth, updatePageClick})(withRouter(Bills));
