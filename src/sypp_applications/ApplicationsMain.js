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
        applicationID : '',
        collapsed : false
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

    onClickCollapse = () =>{
        console.log("triggerdd")
        this.setState({
            collapsed : !this.state.collapsed
        })
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
                        {!this.state.collapsed?
                            <div className = "sypp-applicationMain-list">
                                <ApplicationList onClickProgressAll = {this.onClickProgressAll} extended = {false} />
                            </div>:undefined
                        }
                        <div className = "sypp-applicationMain-detail">
                            <ApplicationDetail applicationID = {this.state.applicationID} extended = {false} onClickCollapse = {this.onClickCollapse}/>
                        </div>
                        </div> :
                    <div className = "sypp-applicationMain-subContainer-extended">
                        {!this.state.collapsed?
                            <div className = "sypp-applicationMain-list-extended">
                                <ApplicationList onClickProgressAll = {this.onClickProgressAll} extended = {true} />
                            </div>:undefined
                        }
                        <div className = "sypp-applicationMain-detail-extended">
                        <ApplicationDetail applicationID = {this.state.applicationID} extended = {true} onClickCollapse = {this.onClickCollapse}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationsMain)