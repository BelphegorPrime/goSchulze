import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, getMuiTheme, createMuiTheme, lightBaseTheme } from 'material-ui/styles';
import Background, { appendMuiBackground, dark, light } from 'material-ui-background';

import Sidebar from './sidebar/index'
import Content from './content/index'

class SiteApp extends Component {
    static guid(){
        function string4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return string4() + string4()
    }

    constructor(props) {
        super(props)
        props.dispatch({type: "SET_UUID", uuid: SiteApp.guid()})
    }

    render() {
        console.log(this.props.uuid)
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
        uuid: state.site.get("uuid"),
    };
})(SiteApp)
