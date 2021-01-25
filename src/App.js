import './App.css';
import MainPage from './sypp_main/MainPage'
import React, { Component } from 'react';
import {requestApplication} from './redux/application-reducer/applicationAction'
import {connect} from 'react-redux'

const mapStatetoProps = state => {
  return{
      apps: state.application.applications,
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onRequestApplication: () => dispatch(requestApplication()),
  }
}

class App extends Component{
  async componentDidMount(){
    const apps = await this.props.onRequestApplication();
    
  }

  render(){
    return (
      <div className="App">
        <MainPage/>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);
