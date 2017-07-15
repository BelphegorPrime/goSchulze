import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import Minus from 'material-ui/svg-icons/content/remove';

class PossibleAnswers extends Component {

    setPossibleAnswers(index, event){
        this.props.possibleAnswers[index] = event.target.value
        this.props.dispatch({type:"SET_POSSIBLE_ANSWERS_ROWS", possibleAnswers: this.props.possibleAnswers})
    }

    addPossibleAnswersRow(){
        this.props.possibleAnswers[this.props.possibleAnswers.length] = ""
        this.props.dispatch({type:"SET_POSSIBLE_ANSWERS_ROWS", possibleAnswers: this.props.possibleAnswers})
    }

    removePossibleAnswersRow(index){
        let possibleAnswers = this.props.possibleAnswers.filter((answers, answersIndex)=> answersIndex!==index)
        this.props.dispatch({type:"SET_POSSIBLE_ANSWERS_ROWS", possibleAnswers: possibleAnswers})
    }

    onKeyUp(event){
        if(event.keyCode === 13){
            this.addPossibleAnswersRow()
        }
    }

    render() {
        let floatingLabelStyle ={color: "#fffff"}
        return <div className={this.props.className}>
                <Paper zDepth={2} className="possible-answer-paper">
                    {this.props.possibleAnswers.map((answer,index)=>{
                        return [<TextField
                            className="possible-answer-textfield"
                            floatingLabelText="Possible answer"
                            floatingLabelStyle={floatingLabelStyle}
                            underlineShow={false}
                            onChange={this.setPossibleAnswers.bind(this, index)}
                            value={answer}
                            onKeyUp={this.onKeyUp.bind(this)}
                        />,
                        <Minus className="possible-answer-icon-minus" onClick={this.removePossibleAnswersRow.bind(this, index)} />,
                        <Divider />]
                    })}
                    <Add className="possible-answer-icon" onClick={this.addPossibleAnswersRow.bind(this)} />
                </Paper>
            </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(PossibleAnswers)
