import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import cookie from 'react-cookies';
import {connect} from "react-redux";
import {verifyLogin} from "../../actions/userActions";
let logo = require('../../images/login-logo.png');
let google = require('../../images/google.png');


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            userdata: {
                firstName:'',
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

    signUp(){
      let errors = [];
      let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(this.state.userdata.firstName.length === 0){
            errors.push("Kindly enter your name");
      }
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
            <div className="login-div">
              <div className="registration">
                <div className="row comnntainer">


                  <div className="login-col panel">
                    <div className="sub-panel ">
                    <div className="p-buttom">
                      <img src={logo} alt="logo" className="login-img"></img>
                    </div>
                    <div className="p-buttom"> First Name </div>
                    <input type="email" className="form-control p-top" placeholder="Enter email" value={this.state.userdata.firstName}

                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               firstName: event.target.value
                                           }
                                       });
                                   }}/> <br/>
                    <div className="p-buttom"> Email Address </div>
                    <input type="email" className="form-control p-top" placeholder="Enter email" value={this.state.userdata.email}

                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               email: event.target.value
                                           }
                                       });
                                   }}/> <br/>
                            <div className="p-buttom"> Password </div>
                            <input type="password" className="form-control p-top" placeholder="Enter Password" value={this.state.userdata.password}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               password: event.target.value
                                           }
                                       });
                                   }}/><br/>
                                   <div className="p-buttom p-top">
                            <Button bsStyle="success" bsSize="sm" block onClick={()=>this.signUp()}> Create Account </Button>
                            </div>
                            <hr/>

                            <br/><br/><br/><br/><br/>

                    </div>

                  </div>
                </div>
              </div>
            </div>
            </div>
            )
          }
        }

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { verifyLogin })(withRouter(Signup));
