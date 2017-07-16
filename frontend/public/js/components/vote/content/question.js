import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

class Question extends Component {

    render() {
        let floatingLabelStyle ={color: "#fffff"}
        return <div className={this.props.className}>
            <TextField
                className="question-textfield"
                floatingLabelText="Question"
                floatingLabelStyle={floatingLabelStyle}
                value={this.props.question.Question}
                disabled={true}
            />
        </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(Question)
