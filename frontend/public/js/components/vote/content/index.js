import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Cookies from 'universal-cookie';
import _ from "lodash"

import Question from './question'
import PossibleAnswers from './possibleAnswers'

import sendAnswer from '../../../actions/sendAnswer'
import setAlreadyAnswered from '../../../actions/setAlreadyAnswered'
import getResult from '../../../actions/getResult'

class Content extends Component {

    sendAnswer(){
        // if(!this.props.isAlreadyAnswered){
            let givenAwnser = _.orderBy(this.props.possibleAnswers, ['vote'], ['desc'])
                .map(awnser=>{
                    return awnser.Value
                }).join(">")
            this.props.dispatch(sendAnswer(this.props.uuid, givenAwnser))
        // }
    }

    showResult(){
        this.props.dispatch(getResult(this.props.uuid))
    }

    render() {
        const cookies = new Cookies();
        if(cookies.get(this.props.uuid)){
            this.props.dispatch(setAlreadyAnswered(true))
        }
        console.log(this.props.isAlreadyAnswered);
        return <div className={this.props.className}>
            <Question className="col-md-12" question={this.props.question}/>
            <PossibleAnswers className="col-md-12" possibleAnswers={this.props.possibleAnswers} />
            <div className="col-md-6"/>
            <RaisedButton className="col-md-3 save-btn" primary={true}
                          onClick={this.showResult.bind(this)}>
                Show Result
            </RaisedButton>
            <RaisedButton className="col-md-3 save-btn" primary={true}
                          onClick={this.sendAnswer.bind(this)}>
                Send
            </RaisedButton>
        </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
        uuid: state.site.get("uuid"),
        possibleAnswers: state.vote.get("possibleAnswers"),
        question: state.vote.get("question"),
        isAlreadyAnswered: state.vote.get('isAlreadyAnswered')
    };
})(Content)
