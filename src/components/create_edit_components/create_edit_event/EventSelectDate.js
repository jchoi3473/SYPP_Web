import React, {Component} from 'react';
import Calendar from 'react-calendar';
import CalendarComponent from './../../calendar/CalendarComponent';
// import { Dropdown } from 'semantic-ui-react'

import 'font-awesome/css/font-awesome.min.css';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './CreateEvent.scss'
import { min } from 'moment';

class EventSelectDate extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible : true,
            hourDropDown: false,
            minuteDropDown: false,
            hour : '',
            minute : '',
        }
    }
    componentDidMount(){
        if(this.props.eventHour != 0){
            this.setState({
                hour : this.props.eventHour
            })
        }
        if(this.props.eventMinute != 0){
            this.setState({
                minute : this.props.eventMinute
            })
        }
    }

    expandCalendar = () =>{
        this.setState({
            visible : true,
            hourDropDown : false,
            minuteDropDown: false,
        })
    }
    onClickDropDownHour = () =>{
        this.setState({
            visible : false
        })
        if(!this.state.hourDropDown){
        this.setState({
            hourDropDown : true,
        })
        }
        else{
            this.setState({
                hourDropDown : false,
            })
        }
    }
    onClickDropDownMin = () =>{
        this.setState({
            visible : false
        })
        if(!this.state.minuteDropDown){
        this.setState({
            minuteDropDown : true,
        })
        }
        else{
            this.setState({
                minuteDropDown : false,
            })
        }
    }
    onSelectHour = (e) =>{
        console.log('triggered?')
        this.setState({
            hour: e.target.getAttribute('value')
        })
    }
    onSelectMin = (e) =>{
        console.log('triggered?')
        this.setState({
            minute: e.target.getAttribute('value')
        })
    }
    onChangeTime = (e) => {
        this.setState({
            hour : e.currentTarget.value
        })
    }
    onChangeMinute = (e) => {
        this.setState({
            minute : e.currentTarget.value
        })
    }
    onClickSelectDate = () => {
        var hour = this.state.hour
        var minute = this.state.minute
        if(this.state.hour === ''){
            hour = 0
        }
        if(this.state.minute === ''){
            minute = 0
        }
        var date = this.props.eventDate;
        if(this.props.eventDate === ''){
            date = new Date()
        }
        date.setHours(hour);
        date.setMinutes(minute)
        const time = hour +":"+ minute
        console.log(time)
        this.props.onChangeHour(this.state.hour)
        this.props.onChangeMinute(this.state.minute)
        this.props.onChangeDate(date)
        this.props.prevStep();
    }
    onClickRemoveSelection = () => {
        this.setState({
            hour:'',
            minute: ''
        })
    }

    render(){
        return(
            <div>
                <div className = "sypp-event-date-title">Date</div>
                <div className = "sypp-event-calendar">
                {this.state.visible?<CalendarComponent calendarChange = {this.props.onChangeDate}/> : <div className = "sypp-event-calendar-collapsed" onClick = {this.expandCalendar}>...</div> }
                </div>
                <div className = "sypp-event-date-title2">Time</div>
                <div  className = "sypp-time-container">
                <div className = "sypp-time-hour-container">
                    <input placeholder = "HH" value = {this.state.hour} className = "sypp-time-inputfield" onChange = {e => this.onChangeTime(e)}/> 
                    {/* <button onClick = {this.onClickDropDownHour}>D</button> */}
                    <FontAwesomeIcon className ="sypp-event-dropdown-button" icon={faCaretUp} onClick = {this.onClickDropDownHour}/>  
                    {this.state.hourDropDown? 
                        <div className = "sypp-dropdown-container" style={{overflowY: 'scroll', height: '200px'}}>
                        {(hour.map((data) => (
                        <button className = "sypp-timepicking-button" onClick = {e => this.onSelectHour(e)} value = {data.value}> {data.text} </button>
                        )))}
                        </div> :undefined
                    }
                    </div>
                    <div>
                    <input placeholder = "MM" value = {this.state.minute} className = "sypp-time-inputfield" onChange = {e => this.onChangeMinute(e)}/> 
                    {/* <button onClick = {this.onClickDropDownMin}>D</button> */}
                    <FontAwesomeIcon className ="sypp-event-dropdown-button" icon={faCaretUp} onClick = {this.onClickDropDownMin}/>  

                    {this.state.minuteDropDown? 
                        <div className = "sypp-dropdown-container" style={{overflowY: 'scroll', height: '200px'}}>
                        {(minute.map((data) => (
                        <button className = "sypp-timepicking-button" onClick = {e => this.onSelectMin(e)} value = {data.value}> {data.text} </button>
                        )))}
                        </div> :undefined
                    }
                    </div>
                </div>
                <div className = "sypp-event-bottom-options-container">
                    <button className = "sypp-event-bottom-option sypp-option1 sypp-option1-page2" onClick = {this.onClickRemoveSelection}>
                        Remove Selection
                    </button>
                    <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page2" onClick = {this.onClickSelectDate}>
                        {"Select Date & Time"}
                    </button>
                    <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page2" onClick = {e => this.props.handleClose()}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}
export default EventSelectDate

const hour = [
    {
    key: '0',
    text: '0',
    value: '0',
    },
    {
    key: '1',
    text: '1',
    value: '1',
    },
    {
    key: '2',
    text: '2',
    value: '2',
    },
    {
    key: '3',
    text: '3',
    value: '3',
    },
    {
    key: '4',
    text: '4',
    value: '4',
    },
    {
    key: '5',
    text: '5',
    value: '5',
    },
    {
    key: '6',
    text: '6',
    value: '6',
    },
    {
    key: '7',
    text: '7',
    value: '7',
    },
    {
    key: '8',
    text: '8',
    value: '8',
    },
    {
    key: '9',
    text: '9',
    value: '9',
    },
    {
    key: '10',
    text: '10',
    value: '0',
    },
    {
    key: '11',
    text: '11',
    value: '11',
    },
    {
    key: '12',
    text: '12',
    value: '12',
    },
    {
    key: '13',
    text: '13',
    value: '13',
    },
    {
    key: '14',
    text: '14',
    value: '14',
    },
    {
    key: '15',
    text: '15',
    value: '15',
    },
    {
    key: '16',
    text: '16',
    value: '16',
    },
    {
    key: '17',
    text: '17',
    value: '17',
    },
    {
    key: '18',
    text: '18',
    value: '18',
    },
    {
    key: '19',
    text: '19',
    value: '19',
    },
    {
    key: '20',
    text: '20',
    value: '20',
    },
    {
    key: '21',
    text: '21',
    value: '21',
    },
    {
    key: '22',
    text: '22',
    value: '22',
    },
    {
    key: '23',
    text: '23',
    value: '23',
    },
    {
    key: '24',
    text: '24',
    value: '24',
    },
]

const minute = [
    {
    key: '0',
    text: '0',
    value: '0',
    },
    {
    key: '1',
    text: '1',
    value: '1',
    },
    {
    key: '2',
    text: '2',
    value: '2',
    },
    {
    key: '3',
    text: '3',
    value: '3',
    },
    {
    key: '4',
    text: '4',
    value: '4',
    },
    {
    key: '5',
    text: '5',
    value: '5',
    },
    {
    key: '6',
    text: '6',
    value: '6',
    },
    {
    key: '7',
    text: '7',
    value: '7',
    },
    {
    key: '8',
    text: '8',
    value: '8',
    },
    {
    key: '9',
    text: '9',
    value: '9',
    },
    {
    key: '10',
    text: '10',
    value: '10',
    },
    {
    key: '11',
    text: '11',
    value: '11',
    },
    {
    key: '12',
    text: '12',
    value: '12',
    },
    {
    key: '13',
    text: '13',
    value: '13',
    },
    {
    key: '14',
    text: '14',
    value: '14',
    },
    {
    key: '15',
    text: '15',
    value: '15',
    },
    {
    key: '16',
    text: '16',
    value: '16',
    },
    {
    key: '17',
    text: '17',
    value: '17',
    },
    {
    key: '18',
    text: '18',
    value: '18',
    },
    {
    key: '19',
    text: '19',
    value: '19',
    },
    {
    key: '20',
    text: '20',
    value: '20',
    },
    {
    key: '21',
    text: '21',
    value: '21',
    },
    {
    key: '22',
    text: '22',
    value: '22',
    },
    {
    key: '23',
    text: '23',
    value: '23',
    },
    {
    key: '24',
    text: '24',
    value: '24',
    },
    {
    key: '25',
    text: '25',
    value: '25',
    },
    {
    key: '26',
    text: '26',
    value: '26',
    },
    {
    key: '27',
    text: '27',
    value: '27',
    },
    {
    key: '28',
    text: '28',
    value: '28',
    },
    {
    key: '29',
    text: '29',
    value: '29',
    },
    {
    key: '30',
    text: '30',
    value: '30',
    },
    {
    key: '31',
    text: '31',
    value: '31',
    },
    {
    key: '32',
    text: '32',
    value: '32',
    },
    {
    key: '33',
    text: '33',
    value: '33',
    },
    {
    key: '34',
    text: '34',
    value: '34',
    },
    {
    key: '35',
    text: '35',
    value: '35',
    },
    {
    key: '35',
    text: '36',
    value: '36',
    },
    {
    key: '37',
    text: '37',
    value: '37',
    },
    {
    key: '38',
    text: '38',
    value: '38',
    },
    {
    key: '39',
    text: '39',
    value: '39',
    },
    {
    key: '40',
    text: '40',
    value: '40',
    },
    {
    key: '41',
    text: '41',
    value: '41',
    },
    {
    key: '42',
    text: '42',
    value: '42',
    },
    {
    key: '43',
    text: '43',
    value: '43',
    },
    {
    key: '44',
    text: '44',
    value: '44',
    },
    {
    key: '45',
    text: '45',
    value: '45',
    },
    {
    key: '46',
    text: '46',
    value: '46',
    },
    {
    key: '47',
    text: '47',
    value: '47',
    },
    {
    key: '48',
    text: '48',
    value: '48',
    },
    {
    key: '49',
    text: '49',
    value: '49',
    },
    {
    key: '50',
    text: '50',
    value: '50',
    },
    {
    key: '51',
    text: '51',
    value: '51',
    },
    {
    key: '52',
    text: '52',
    value: '52',
    },
    {
    key: '53',
    text: '53',
    value: '53',
    },
    {
    key: '54',
    text: '54',
    value: '54',
    },
    {
    key: '55',
    text: '55',
    value: '55',
    },
    {
    key: '56',
    text: '56',
    value: '56',
    },
    {
    key: '57',
    text: '57',
    value: '57',
    },
    {
    key: '58',
    text: '58',
    value: '58',
    },
    {
    key: '59',
    text: '59',
    value: '59',
    },
    {
    key: '60',
    text: '60',
    value: '60',
    },
]