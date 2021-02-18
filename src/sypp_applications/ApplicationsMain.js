import React, {Component} from 'react';
import CalendarWeekview from './../sypp_calendar/CalendarWeekview'
import './ApplicationsMain.scss'
import {setApps} from './../redux/application-reducer/applicationAction'
import {connect} from 'react-redux'
import ApplicationList from './application_list/ApplicationList'
import ApplicationDetail from './application_detail/ApplicationDetail'

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

class ApplicationsMain extends Component {
    state = {
        toggleDeadline : true,
        applicationID : ''
    }
    onClickToggleDeadline = () =>{
        this.setState({
            toggleDeadline : !this.state.toggleDeadline
        })
        console.log(this.props.apps)
    }

    onClickProgressAll = (applicationID) =>{
        this.setState({
            applicationID : applicationID
        })
        console.log(this.state.applicationID)
    }

    render(){
        return(
            <div className = "sypp-applicationMain-Container">
                <div className = "sypp-calendarweekview-container">
                    <div className ="sypp-calendarweekview-button" onClick = {this.onClickToggleDeadline}>Hide Weekly Deadlines</div>
                    {this.state.toggleDeadline?
                            <CalendarWeekview/>:undefined
                    }
                </div>
                {this.state.toggleDeadline?
                    <div className = "sypp-applicationMain-subContainer">
                        <div className = "sypp-applicationMain-list">
                            <ApplicationList onClickProgressAll = {this.onClickProgressAll} extended = {false}/>
                        </div>
                        <div className = "sypp-applicationMain-detail">
                            <ApplicationDetail applicationID = {this.state.applicationID} extended = {false}/>
                        </div>
                        </div> :
                    <div className = "sypp-applicationMain-subContainer">
                        <div className = "sypp-applicationMain-list-extended">
                            <ApplicationList onClickProgressAll = {this.onClickProgressAll} extended = {true}/>
                        </div>
                        <div className = "sypp-applicationMain-detail-extended">
                        <ApplicationDetail applicationID = {this.state.applicationID} extended = {true}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationsMain)