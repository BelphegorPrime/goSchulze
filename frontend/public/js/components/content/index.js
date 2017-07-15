import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';


class Content extends Component {
    render() {
        return <div className={this.props.className}>
            Hello World!
            <RaisedButton primary={true}>Send</RaisedButton>
        </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(Content)
