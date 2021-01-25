import React, { Component } from "react";

import {setApps} from './../redux/application-reducer/applicationAction'

import {connect} from 'react-redux'

const mapStatetoProps = state => {
    return{
        apps: state.application.applications,
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        setApps: () => dispatch(setApps()),
    }
}

class CalendarDetail extends Component {
    renderCalendarComponent = () =>{
        if(this.props.taskArray.length !== 0){
            for(var i=0;i<this.props.taskArray.length; i++){
                var taskDate = new Date(this.props.taskArray[0].Task.Time)
                var currDate = new Date(this.props.date)
                // console.log(taskDate.toString() + currDate.toString())
                if(taskDate.getDate() === currDate.getDate() && taskDate.getMonth()+1 === currDate.getMonth()+1 && taskDate.getFullYear()===currDate.getFullYear()){
                    console.log(taskDate.toString() + currDate.toString())
                    return(
                        <div>
                            It's finally Rendered?
                        </div>
                    )
                }
            }
        }
        
    }
    render(){
       

        // if(this.props.taskArray.length !== 0){
        //     for(var i=0;i<this.props.taskArray.length; i++){
        //         var taskDate = new Date(this.props.taskArray[i].Time)
        //         if(taskDate.getDate()+1)
        //         console.log(taskDate.getMonth()+1 )
        //     }
        // }

        //     for(var i=0; this.props.taskArray.length;i++){
        //         // if(taskArray[i].Task.Time.getDate())
        //         console.log(new Date(this.props.taskArray[i].Task.Time).getDate())
        //     }
        // }
        return(
            <div>
                {this.renderCalendarComponent()}
                <div>{new Date(this.props.date).getMonth()}</div>
                {
                    this.props.taskArray.length !== 0?  
                    <div>{new Date(this.props.taskArray[0].Task.Time).getDate().toString()}</div>:
                    undefined
                }
                
            </div>
        );
    }
}
export default CalendarDetail
