import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

class Question extends Component {

    setQuestion(event){
        this.props.dispatch({type:"SET_QUESTION", question: event.target.value})
    }

    onKeyUp(event){
        if(event.keyCode === 13){
            this.props.possibleAnswers[this.props.possibleAnswers.length] = ""
            this.props.dispatch({type:"SET_POSSIBLE_ANSWERS_ROWS", possibleAnswers: this.props.possibleAnswers})
        }
    }

    render() {
        let floatingLabelStyle ={color: "#fffff"}
        return <div className={this.props.className}>
            <TextField
                className="question-textfield"
                floatingLabelText="Question"
                floatingLabelStyle={floatingLabelStyle}
                onChange={this.setQuestion.bind(this)}
                onKeyUp={this.onKeyUp.bind(this)}
            />
        </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(Question)
