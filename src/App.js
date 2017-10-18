import React, { Component } from 'react';
import logo from './box_logo.png';
import './App.css';
import BoxList from './components/box-list'
import axios from 'axios'

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      boxes: [],
      selectedBox: null
    }
  }

  componentDidMount(){
    const magicBoxUrl = "http://localhost:8000"
    const boxListEndpoint = `${magicBoxUrl}/api/v1/box`
    const accessToken = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZWxiYXJ0byIsImVtYWlsIjoiYmFydG9sb21ld0BzaW1wc29ucy5jb20iLCJmaXJzdE5hbWUiOiJlbCIsImxhc3ROYW1lIjoiYmFydG8iLCJzdGF0dXMiOiJBQ1RJVkUiLCJpZCI6IjU5ZTdiMTdmODg2OWU0M2FjNTcwYmM4MCJ9LCJleHAiOjE1MDg2MTU2OTMsImlhdCI6MTUwODM1NjQ5MywiaXNzIjoibWFnaWNib3guYXVoIiwic3ViIjoiZWxiYXJ0byJ9.6wuZzg5FzpFQ29F8E_FbRR9gEP3bjn-HsWNRf_yPxnR0eC5DyMqbdzUhWkmJdgOCHdsI19dBiPITwMU5Mhif1A";

    axios.get(
      boxListEndpoint,
      {headers: {Authorization: accessToken}}
      )
      .then(res => {
        const boxes = res.data.results
        this.setState({boxes: boxes})
      });

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MagicBox</h1>
        </header>
        <BoxList
          onBoxSelect={selectedBox => this.setState({selectedBox})}
          boxes={this.state.boxes}
          className="App-intro" />
      </div>
    );
  }
}

export default App;
