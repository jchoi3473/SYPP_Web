import React, { Component } from "react";

import {setApps} from './../redux/application-reducer/applicationAction'

import './../sypp_applications/application_list/progress/ProgressBar.scss'
import './CalendarMain.scss'
import {connect} from 'react-redux'

import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const mapStatetoProps = state => {
    return{
        apps: state.application.applications,
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        setApps: (applications) => dispatch(setApps(applications))
    }
}

class CalendarDetail extends Component {

    onClickIsFavorite = (task) =>{
        var apps = this.props.apps
        if(task.type === 'application'){
            for(var i=0; i<this.props.apps.length; i++){
                if(apps[i].applicationID === task.id){
                    for(var j=0;j<apps[i].tasks.length;j++){
                        if(apps[i].tasks[j].midTaskID === task.Task.midTaskID){
                            apps[i].tasks[j].isFavorite = !apps[i].tasks[j].isFavorite
                        }
                    }
                }
            }
        }
        // for(var i =0;i<this.props.taskArray.length;i++){
            if(this.props.favoriteType == "" && task.Task.isFavorite &&task.Task.status){
                this.props.onChangefavoriteType("sypp-calendar-favorite-completed")
              }
              else if((this.props.favoriteType == ""||this.props.favoriteType == "sypp-calendar-favorite-completed")&&task.Task.isFavorite&& !task.Task.status){
                this.props.onChangefavoriteType("sypp-calendar-favorite-notCompleted")
              }
              if(!task.Task.isFavorite){
                this.props.onChangefavoriteType("")
              }
        // }
        this.props.setApps(apps)    
        this.setState({})    
    }

    renderCalendarComponent = () =>{

        if(this.props.taskArray.length !== 0){
            for(var i=0;i<this.props.taskArray.length; i++){
                var taskDate = new Date(this.props.taskArray[i].Task.time)
                var currDate = new Date(this.props.date)
                if(taskDate.getDate() === currDate.getDate() && taskDate.getMonth()+1 === currDate.getMonth()+1 && taskDate.getFullYear()===currDate.getFullYear()){
                    if(this.props.favoriteType == ""&&this.props.taskArray[i].isFavorite && this.props.taskArray[i].Task.status){
                        this.props.onChangefavoriteType("sypp-calendar-favorite-completed")
                        this.setState({favoriteType : "sypp-calendar-favorite-completed"})
                      }
                      else if((this.props.favoriteType == ""||this.props.favoriteType == "sypp-calendar-favorite-completed")&&this.props.taskArray[i].isFavorite&& !this.props.taskArray[i].Task.status){
                        this.props.onChangefavoriteType("sypp-calendar-favorite-notCompleted")
                      }
                    return(
                        <div className = "sypp-calendar-detail-container">
                            <div className = "sypp-calendar-progress-container">
                                {this.props.taskArray[i].Task.status?
                                <div className = "sypp-applicationFirst sypp-completed"></div>:
                                <div className="sypp-applicationFirst sypp-notCompleted"></div>
                                }
                                <Rating className ="sypp-starIcon sypp-calendar-star" applicationName = {this.props.taskArray[i].id} stop={1} initialRating = {this.props.taskArray[i].Task.isFavorite?1:0} 
                                onClick = {() => this.onClickIsFavorite(this.props.taskArray[i])}
                                emptySymbol="fa fa-star-o starSize starIcon"
                                fullSymbol = "fa fa-star starSize starIcon"
                                />
                            </div>
                            <div className = "sypp-calendar-title-container">
                                {this.props.taskArray[i].CompanyName !==''?
                                    <div className = "sypp-calendarDetail-title">{this.props.taskArray[i].CompanyName}</div>:undefined
                                }
                                {this.props.taskArray[i].PositionName !== ''?
                                    <div className = "sypp-calendarDetail-subTitle">{this.props.taskArray[i].PositionName}</div>:undefined
                                }
                                {this.props.taskArray[i].Task.title !== ''?
                                    <div className = "sypp-calendarDetail-task-title">{this.props.taskArray[i].Task.title}</div>:undefined
                                }                                
                            </div>
                        </div>
                    )
                }
            }
        }
        
    }
    render(){
        return(
            <div>
                {/* <span
                className={"sypp-day" + (this.props.isToday ? " today" : "") + (this.props.isCurrentMonth ? "" : " sypp-different-month") } 
               >
                    {this.props.number}
                </span> */}
                {this.renderCalendarComponent()}
            </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CalendarDetail)
