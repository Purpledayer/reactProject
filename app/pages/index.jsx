
import React, { Component } from 'react';
import { hashHistory } from 'react-router-dom';
export default class Containers extends Component {
    
    render() {
        return (
            <div>
                <div>LeftNav</div>
                <div>MyHeader</div>
                <div> {this.props.children}</div>
            </div>
        )
    }
}
