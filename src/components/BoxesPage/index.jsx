import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../style/App.css';
import BoxList from './BoxList';
import BoxDetail from './BoxDetail';
import CreateBoxForm from './CreateBoxForm';
import Header from '../Header';
import { fetchUsers } from './actions';


class BoxesPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      boxes: [],
      selectedBox: null
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div className="App">
        <Header history={this.props.history}/>
        <div className="App-intro" >
          <div className="col-xs-6 col-md-4">
            <BoxList/>
          </div>
          <div className="col-xs-6 col-md-8">
            <BoxDetail />
            <CreateBoxForm />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers }, dispatch);
}

export default connect(null, mapDispatchToProps)(BoxesPage);
