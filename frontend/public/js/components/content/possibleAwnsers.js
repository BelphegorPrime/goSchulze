import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import Minus from 'material-ui/svg-icons/content/remove';

class PossibleAwnser extends Component {

    setPossibleAwnser(index, event){
        this.props.possibleAwnsers[index] = event.target.value
        this.props.dispatch({type:"SET_POSSIBLE_AWNSER_ROWS", possibleAwnsers: this.props.possibleAwnsers})
    }

    addPossibleAwnserRow(){
        this.props.possibleAwnsers[this.props.possibleAwnsers.length] = ""
        this.props.dispatch({type:"SET_POSSIBLE_AWNSER_ROWS", possibleAwnsers: this.props.possibleAwnsers})
    }

    removePossibleAwnserRow(index){
        let possibleAwnsers = this.props.possibleAwnsers.filter((awnser,awnserIndex)=>awnserIndex!==index)
        this.props.dispatch({type:"SET_POSSIBLE_AWNSER_ROWS", possibleAwnsers: possibleAwnsers})
    }

    onKeyUp(event){
        if(event.keyCode === 13){
            this.addPossibleAwnserRow()
        }
    }

    render() {
        let floatingLabelStyle ={color: "#fffff"}
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
                            onKeyUp={this.onKeyUp.bind(this)}
                        />,
                        <Minus className="possible-awnser-icon-minus" onClick={this.removePossibleAwnserRow.bind(this, index)} />,
                        <Divider />]
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
