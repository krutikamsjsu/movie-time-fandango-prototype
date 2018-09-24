import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import cookie from 'react-cookies';
import {connect} from "react-redux";
import {verifyLogin} from "../../actions/userActions";
let logo = require('../../images/login-logo.png');
let google = require('../../images/google.png');


class ViewProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userdata: {
                password: '',
                email: '',
                token:'',
                userId:''
            },
            isLoggedIn: false,
            validation_error: [],
            message: ''
        };
    }

    verifyLogin(){
      let errors = [];
      let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(this.state.userdata.email.length === 0){
           errors.push("Kindly enter email");
       } else if (!email_regex.test(this.state.userdata.email)){
           errors.push("Invalid Email");
       }
       if(this.state.userdata.password.length === 0){
             errors.push("Kindly enter a password");
       }

        if(errors.length === 0) {
          //Check in database
          console.log("In no errors");
          this.props.verifyLogin(this.state.userdata)
          .then((data)=>{
            this.setState({
              message: data.message
            })
          },
         (err) => {
           console.log(err);
           this.setState({
             message: "Could not Login. Please try again"
           })
         });
        }else{
          this.setState ({
                validation_error: errors
            })
        }

    }


    render(){
        return(
            <div className="errors">
            <div className="errors container">
                {/*<div className="col-md-3">*/}
                {this.state.validation_error && (
                    <div>
                        {this.state.validation_error.map((item,index)=><div key={index} className="alert alert-danger" role="alert">{item}</div>)}
                    </div>
                )}

                <div >
                    {/*<div className="col-md-3">*/}
                    {this.state.message && (
                        <div className="alert alert-warning" role="alert">
                            {this.state.message}
                        </div>
                    )}
                    {/*</div>*/}
                </div>
                {/*</div>*/}
            </div>
            <div className=""></div>
                <div className="page-header-container">
                </div>
            </div>
            </div>
            )
          }
        }

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { verifyLogin })(withRouter(ViewProfile));
