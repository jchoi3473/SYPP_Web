import React, { Component } from "react";

import moment from 'moment'
import CalendarDetail from './CalendarDetail'
import './CalendarMain.scss'
import {connect} from 'react-redux'

const mapStatetoProps = state => {
  return{
      apps: state.application.applications,
  }
}

class CalendarMain extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        month: moment(),
        selected: moment().startOf('day')
      };
      
      this.previous = this.previous.bind(this);
      this.next = this.next.bind(this);
    }
    
    previous() {
      const {
        month,
      } = this.state;
  
      this.setState({
        month: month.subtract(1, 'month'),
      });
    }
  
    next() {
      const {
        month,
      } = this.state;
  
      this.setState({
        month: month.add(1,'month'),
      });
    }
    
    select(day) {
      this.setState({
        selected: day.date,
        month: day.date.clone(),
      });
    }
  
    renderWeeks(taskArray) {
      let weeks = [];
      let done = false;
      let date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday");
      let count = 0;
      let monthIndex = date.month();
  
      const {
        selected,
        month,
      } = this.state;
      
      while (!done) {
        weeks.push(
          <Week key={date} 
            date={date.clone()} 
            month={month} 
            select={(day)=>this.select(day)} 
            selected={selected} 
            taskArray = {taskArray}/>
        );
  
        date.add(1, "w");
        
        done = count++ > 2 && monthIndex !== date.month();
        monthIndex = date.month();
      }
  
      return weeks;
    };
  
    renderMonthLabel() {
      const {
        month,
      } = this.state;
  
      return <span className="month-label">{month.format("MMM YYYY")}</span>;
    }
    

    render() {
      var taskArray = []
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

      return (
        <section className="sypp-calendar-main">
          <header className="header">
            <div className="sypp-month-display sypp-row">
              <i className="arrow fa fa-angle-left sypp-calendar-arrow" onClick={this.previous}/>
              {this.renderMonthLabel()}
              <i className="arrow fa fa-angle-right sypp-calendar-arrow" onClick={this.next}/>
            </div>
            <DayNames />
          </header>
          {this.renderWeeks(taskArray)}
        </section>
      );
    }
  }
  
  class DayNames extends React.Component {
      render() {
          return (
            <div className="sypp-row sypp-day-names">
              <span className="sypp-weekday">Sun</span>
              <span className="sypp-weekday">Mon</span>
              <span className="sypp-weekday">Tue</span>
              <span className="sypp-weekday">Wed</span>
              <span className="sypp-weekday">Thu</span>
              <span className="sypp-weekday">Fri</span>
              <span className="sypp-weekday">Sat</span>
            </div>
          );
      }
  }
  
  class Week extends React.Component {
    render() {
      let days = [];
      let {
        date,
      } = this.props;
      
      const {
        month,
        selected,
        select,
      } = this.props;

      for (var i = 0; i < 7; i++) {
        let day = {
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date
        };
        days.push(
            <Day day={day}
            selected={selected}
            select={select}
            taskArray = {this.props.taskArray}/>
        );
  
        date = date.clone();
        date.add(1, "day");
      }
  
      return (
        <div className="sypp-row week" key={days[0]}>
          {days}
        </div>
      );
    }
  }

  
  class Day extends React.Component {
    constructor(){
      super();
      this.state ={
        favoriteType : ""
      }
    }
    onChangefavoriteType = (favType) =>{
    
      this.setState({
        favoriteType : favType
      })
    }
    render() {
      const {
        day,
        day: {
          date,
          isCurrentMonth,
          isToday,
          number
        },
        select,
        selected
      } = this.props;
  
      return (
        <div className = {"sypp-day-container" + (day.isToday ? " sypp-today " : " ") + this.state.favoriteType}>
            {/* <span 
            key={date.toString()} 
            className={"sypp-day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " sypp-different-month") + (date.isSame(selected) ? " selected" : "")} 
            onClick={()=>select(day)}>{number}
            </span> */}
            <CalendarDetail date = {day.date} taskArray = {this.props.taskArray} number = {number} key = {date.toString()} isToday = {isToday} isCurrentMonth = {isCurrentMonth} 
            selected = {selected} day = {day} select = {select} favoriteType = {this.state.favoriteType} onChangefavoriteType = {this.onChangefavoriteType}/>
        </div>
      );
    }
  }
  
export default connect(mapStatetoProps, null)(CalendarMain)