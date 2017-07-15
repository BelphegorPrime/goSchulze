import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Question from './question'
import PossibleAnswers from './possibleAnswers'

import createNewQuestion from './../../actions/createNewQuestion'

class Content extends Component {

    sendNewQuestion(){
        let possibleAnswers = this.props.possibleAnswers.filter(answer=>answer.length>0)
        // a question needs more than one possible answer
        if(this.props.question.length > 0 && possibleAnswers.length > 1){
            console.log(this.props.uuid)
            console.log(this.props.question)
            console.log(possibleAnswers)
            this.props.dispatch(createNewQuestion(this.props.uuid, this.props.question, possibleAnswers))
        }
    }

    render() {
        return <div className={this.props.className}>
            <Question className="col-md-12" possibleAnswers={this.props.possibleAnswers} />
            <PossibleAnswers className="col-md-12" possibleAnswers={this.props.possibleAnswers} />
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
        possibleAnswers: state.site.get("possibleAnswers"),
        question: state.site.get("question"),
    };
})(Content)
