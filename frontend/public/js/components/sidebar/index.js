import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
    render() {
        return <div className={this.props.className}>
                Sidebar!
            </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(Sidebar)
