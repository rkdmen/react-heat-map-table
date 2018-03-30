import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//
import TableContainer from './Table/TableContainer';

export default class App extends Component {
  render() {
    return (
      <div className="__r-hm-table-app">
        <TableContainer />
      </div>
    );
  }
}

