import './App.css';
import MainPage from './sypp_main/MainPage'
import React, { Component } from 'react';
import {requestApplication} from './redux/application-reducer/applicationAction'
import {setSelectedCategories} from './redux/addApp-reducer/addAppAction'

import {connect} from 'react-redux'

const mapStatetoProps = state => {
  return{
      apps: state.application.applications,
      pending: state.application.isPending,
      categories: state.categories.categories
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onRequestApplication: () => dispatch(requestApplication()),
    setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories)),

  }
}

class App extends Component{
  async componentDidMount(){
    const apps = await this.props.onRequestApplication();
    var newCategory = [];
    for (var i=0;i<this.props.categories.length;i++){
      newCategory = newCategory.concat({
        Type : this.props.categories[i].name,
        SuggestionsOrSeleceted : []
      })
    }
    this.props.setSelectedCategories(newCategory)
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
