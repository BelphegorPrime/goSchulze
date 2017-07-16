import React, {Component} from "react";
import {connect} from "react-redux";

import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

class PossibleAnswers extends Component {

    inputValueChanged(answer, event){
        this.changeAnswer(answer, parseInt(event.target.value))
    }

    changeAnswer(answer, vote){
        answer.vote = vote
        let possibleAnswers = this.props.possibleAnswers.map(possibleAnswer=>{
            if(possibleAnswer.Id === answer.Id){
                return answer
            }
            return possibleAnswer
        })
        this.props.dispatch({type:"SET_POSSIBLE_ANSWERS_VOTES", possibleAnswers})
    }

    render() {
        let floatingLabelStyle = {color: "#fffff"}
        return <div className={this.props.className}>
            <Paper zDepth={2} className="possible-answer-paper">
                {this.props.possibleAnswers.map((answer, index) => {
                    if(answer.vote === undefined){
                        this.changeAnswer(answer, index + 1)
                    }
                    return [
                        <input type="number"
                               className="possible-answer-vote-input"
                               defaultValue={index + 1}
                               onChange={this.inputValueChanged.bind(this, answer)}
                        />,
                        <TextField
                            className="possible-answer-vote-textfield"
                            floatingLabelText="Possible answer"
                            floatingLabelStyle={floatingLabelStyle}
                            underlineShow={false}
                            value={answer.Value}
                            disabled={true}
                        />,
                        <Divider />
                    ]
                })}
            </Paper>
        </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(PossibleAnswers)
