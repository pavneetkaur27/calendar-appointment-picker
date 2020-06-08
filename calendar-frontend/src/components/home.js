import React, { Component } from 'react';
import {connect} from "react-redux";
import { Switch, Route,withRouter } from 'react-router-dom';
import CalendarComponent from './calendarComponent';
import Alert from './shared/Alert';
import Loader from './shared/Loader';
import Cookies from 'universal-cookie';
import bvalid from 'bvalid/lib/bvalid.es';
const cookies = new Cookies();

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      // isLoggedIn : false
    }
  }


  
 

  render(){
    // console.log(this.props);
    return (
      <div className="main-body">

        <Alert/>
        <div >
          <Loader loading={this.props.loading}/>
          <Switch>
              <Route path="/" render={() => <CalendarComponent /> }/>
            </Switch>
        </div>
      </div>
    );
  }
}


class InvalidPage extends Component {
  render() {
      return (
          <div className="page-not-found">
            Sorry! Page not found.
          </div>
      );
  }
}

const mapStateToProps = state => {
  return {
      loading: state.calendarReducer.loading,
      calpanel : state.calendarReducer
  }
}

const mapDispatchToProps = {};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))