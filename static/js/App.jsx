import React, { Component } from 'react';

var $ = require('jquery');

export default class App extends Component {
    getPythonHello() {
	$.get('/hello', (data) => {
	    console.log(data);
	});
    }

    render() {
	return <p onClick={this.getPythonHello}>test</p>;
    }
}
