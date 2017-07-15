import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Question from './question'
import PossibleAwnsers from './possibleAwnsers'

class Content extends Component {

    sendNewQuestion(){
        console.log(this.props.uuid)
        console.log(this.props.question)
        console.log(this.props.possibleAwnsers)
    }

    render() {
        return <div className={this.props.className}>
            <Question className="col-md-12"/>
            <PossibleAwnsers className="col-md-12" possibleAwnsers={this.props.possibleAwnsers} />
            <div className="col-md-9"/>
            <RaisedButton className="col-md-3 save-btn" primary={true}
                          onClick={this.sendNewQuestion.bind(this)}>
                Send
            </RaisedButton>
        </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
        uuid: state.site.get("uuid"),
        possibleAwnsers: state.site.get("possibleAwnsers"),
        question: state.site.get("question"),
    };
})(Content)
