import React, {Component} from 'react';
import Moment from 'moment';
import CalendarDetail from './CalendarDetail'
import './CalendarMain.scss'
import './../sypp_applications/ApplicationsMain.scss'
import {connect} from 'react-redux';

const mapStatetoProps = state => {
    return{
        apps: state.application.applications,
    }
}
  

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

class ApplicationWeekview extends Component {
    constructor(props){
        super(props);
        this.state ={
          favoriteType : ""
        }
      }
      onChangefavoriteType = (favType) =>{
        this.setState({
          favoriteType : favType
        })
      }
    // dateDisplay = () => {

    //     return (

    //     )
    // }
    render(){
        var date = new Date();
        var taskArray = []
        let weekDays = [];

        for(var i=0; i<this.props.apps.length; i++){
          if(this.props.apps[i].tasks.length !== 0){
            for(var j=0;j<this.props.apps[i].tasks.length;j++){
              taskArray.push({
                CompanyName : this.props.apps[i].detail.companyName,
                PositionName : this.props.apps[i].detail.positionName,
                Task : this.props.apps[i].tasks[j],
                Time : this.props.apps[i].tasks[j].time,
                type : 'application',
                id : this.props.apps[i].applicationID,
                isFavorite : this.props.apps[i].tasks[j].isFavorite
              })
            }    
          }
        }
        for (var i = 0; i < 7; i++) {
            weekDays.push(
                <Weekday date = {addDays(date,i)} taskArray = {taskArray} number = {addDays(date,i).getDate()} key = {addDays(date,i).toString()} isToday = {true} isCurrentMonth = {true}/>
            );
        }

        return(
            <div className = "sypp-weeklyDeadline-container">
                {weekDays}
            </div>
        );
    }
}
export default connect(mapStatetoProps, null)(ApplicationWeekview)

class Weekday extends Component {
    constructor(props){
        super(props);
        this.state ={
          favoriteType : ""
        }
      }
      onChangefavoriteType = (favType) =>{
        this.setState({
          favoriteType : favType
        })
      }
      render(){
          return(
            <div className = {"sypp-weeklyDealine-individual " + (this.state.favoriteType)}>
                <div className = "sypp-weekday-day">{Moment(addDays(this.props.date,0)).format('ddd(MMM DD)')}</div>
                <CalendarDetail date ={this.props.date} taskArray = {this.props.taskArray} number = {this.props.number} key = {this.props.key} isToday = {this.props.isToday} 
                isCurrentMonth = {this.props.isCurrentMonth} favoriteType = {this.state.favoriteType} onChangefavoriteType = {this.onChangefavoriteType}/>
            </div>
          );
      }
}