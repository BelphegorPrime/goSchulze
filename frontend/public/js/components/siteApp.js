import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SiteApp extends Component {

  render() {
    //if(this.props.user && this.props.token && this.props.user.account!== undefined){
    //  this.props.dispatch(getLevelValues("Buildings", this.props.token, this.props.user.account.planets[0]))
    //}
    return <MuiThemeProvider>
            <div>
                Hello World!
            </div>
          </MuiThemeProvider>
  }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(SiteApp)
