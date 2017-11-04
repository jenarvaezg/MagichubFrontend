import React, { Component } from 'react';

import '../../style/App.css';
import BoxList from './BoxList';
import BoxDetail from './BoxDetail';
import CreateBoxForm from './CreateBoxForm';
import Header from '../Header';

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
        <Header />
        <div className="App-intro" >
          <div className="col-xs-4">
            <BoxList/>
          </div>
          <div className="col-xs-8">
            <BoxDetail />
            <CreateBoxForm />
          </div>
        </div>
      </div>
    );
  }
}
