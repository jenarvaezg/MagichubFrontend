import React, { Component } from 'react';
import logo from '../../box_logo.png';

import '../../style/App.css';
import BoxList from './BoxList';
import BoxDetail from './BoxDetail';
import CreateBoxDetail from './CreateBoxDetail';

export default class BoxesPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      boxes: [],
      selectedBox: null
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MagicBox</h1>
        </header>
        <div className="App-intro" >
          <div className="col-xs-4">
            <BoxList/>
          </div>
          <div className="col-xs-8">
            <BoxDetail />
            <CreateBoxDetail />
          </div>
        </div>
      </div>
    );
  }
}
