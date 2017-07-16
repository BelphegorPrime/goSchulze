import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, getMuiTheme, createMuiTheme, lightBaseTheme } from 'material-ui/styles';
import Background, { appendMuiBackground, dark, light } from 'material-ui-background';

import Sidebar from './sidebar/index'
import Content from './vote/content/index'

import getQuestion from './../actions/getQuestion'

class VoteApp extends Component {

    constructor(props) {
        super(props)
        props.dispatch({type: "SET_UUID", uuid: props.location.search.split("=")[1]})
        props.dispatch(getQuestion(props.location.search.split("=")[1]))
    }

    render() {
        return <MuiThemeProvider muiTheme={appendMuiBackground(getMuiTheme(lightBaseTheme), dark)}>
            <div className="site-content">
                <Background className="background">
                </Background>
                <Sidebar className="col-md-3 sidebar" />
                <Content className="col-md-9 content" />
            </div>
        </MuiThemeProvider>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(VoteApp)
