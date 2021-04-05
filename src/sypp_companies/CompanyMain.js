import React, {Component} from 'react';
import CalendarWeekview from './../sypp_calendar/CalendarWeekview'

import './../sypp_applications/ApplicationsMain.scss'
import './Companies.scss'
import {setApps} from './../redux/application-reducer/applicationAction'
import {connect} from 'react-redux'

import CompanyList from './company_list/CompanyList'
import CompanyDetail from './company_detail/CompanyDetail'




class CompanyMain extends Component {
    state = {
        toggleDeadline : true,
        companyID : ''
    }
    onClickToggleDeadline = () =>{
        this.setState({
            toggleDeadline : !this.state.toggleDeadline
        })
        console.log(this.props.apps)
    }

    onClickCompany = (companyID) =>{
        this.setState({
            companyID : companyID
        })
        this.setState({})
        console.log(this.state.companyID)
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
                        <div className = "sypp-companyMain-list">
                            <CompanyList onClickCompany = {this.onClickCompany} extended = {false}/>
                        </div>
                        <div className = "sypp-companyMain-detail">
                            <CompanyDetail companyID = {this.state.companyID} extended = {false}/>
                        </div>
                        </div> :
                    <div className = "sypp-applicationMain-subContainer-extended">
                        <div className = "sypp-companyMain-list-extended">
                            <CompanyList onClickCompany = {this.onClickCompany} extended = {true}/>
                        </div>
                        <div className = "sypp-companyMain-detail-extended">
                            <CompanyDetail companyID = {this.state.companyID} extended = {true}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default CompanyMain