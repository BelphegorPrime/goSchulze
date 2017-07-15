import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';

class PossibleAwnser extends Component {

    setPossibleAwnser(index, event){
        this.props.possibleAwnsers[index] = event.target.value
        this.props.dispatch({type:"SET_POSSIBLE_AWNSER_ROWS", possibleAwnsers: this.props.possibleAwnsers})
    }

    addPossibleAwnserRow(){
        this.props.possibleAwnsers[this.props.possibleAwnsers.length] = ""
        this.props.dispatch({type:"SET_POSSIBLE_AWNSER_ROWS", possibleAwnsers: this.props.possibleAwnsers})
    }

    render() {
        let floatingLabelStyle ={color: "#fffff"}

        console.log(this.props.possibleAwnsers)

        return <div className={this.props.className}>
                <Paper zDepth={2} className="possible-awnser-paper">
                    {this.props.possibleAwnsers.map((awnser,index)=>{
                        return [<TextField
                            className="possible-awnser-textfield"
                            floatingLabelText="Possible awnser"
                            floatingLabelStyle={floatingLabelStyle}
                            underlineShow={false}
                            onChange={this.setPossibleAwnser.bind(this, index)}
                            value={awnser}
                        />, <Divider />]
                    })}
                    <Add className="possible-awnser-icon" onClick={this.addPossibleAwnserRow.bind(this)} />
                </Paper>
            </div>
    }
}

export default connect((state, props, dispatch) => {
    return {
        dispatch: dispatch,
    };
})(PossibleAwnser)
