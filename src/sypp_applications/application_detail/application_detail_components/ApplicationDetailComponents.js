import React, {Component} from 'react';

import ApplicationDetailEvents from './ApplicationDetailEvents'
import ApplicationDetailChecklists from './ApplicationDetailChecklists'
import ApplicationDetailNotes from './ApplicationDetailNotes'
import ApplicationDetailFollowUp from './ApplicationDetailFollowUp'
import ApplicationDetailContacts from './ApplicationDetailContacts'

import './ApplicationDetailComponents.scss'

import {setApps} from '../../../redux/application-reducer/applicationAction'
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


class ApplicationDetailComponents extends Component {
    constructor(){
        super();
    }
    onSaveEventNote = () =>{
        this.setState({})
    }
    onSaveConversation = () =>{
        this.setState({})
    }
    onSaveNote = () =>{
        this.setState({})
    }
    onSaveChecklist = () =>{
        this.setState({})
    }
    onSaveContactNote = () =>{
        this.setState({})
    }
    display = () =>{
        if(this.props.applicationID !== ''){
            switch(this.props.radioValue){
                case '0':
                    return (
                        <div class = "container">
                            <div class = "row">
                                <div class = "col">
                                {
                                    this.props.applicationDetail.events.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Events</div>
                                        {this.props.applicationDetail.events.map((event) =>(
                                            <ApplicationDetailEvents onSaveEventNote = {this.onSaveEventNote} Event = {event} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>))}
                                    </div>:
                                        undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.applicationDetail.notes.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Notes</div>
                                        {this.props.applicationDetail.notes.map((note) =>(
                                            <ApplicationDetailNotes onSaveNote = {this.onSaveNote}  Note = {note} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>))}
                                    </div>
                                        :undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.applicationDetail.contacts.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Contacts</div>
                                        {this.props.applicationDetail.contacts.map((data) => (
                                            <ApplicationDetailContacts onSaveContactNote = {this.onSaveContactNote} contact = {data} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>))}
                                    </div>:
                                        undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.applicationDetail.followUps.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Conversational Histories</div>
                                        {this.props.applicationDetail.followUps.map((FollowUp) =>(
                                            <ApplicationDetailFollowUp onSaveConversation = {this.onSaveConversation} FollowUp = {FollowUp} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>))}
                                    </div>:
                                        undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.applicationDetail.checklists.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Checklist</div>
                                        {this.props.applicationDetail.checklists.map((checklist) =>(
                                            <ApplicationDetailChecklists onSaveChecklist = {this.onSaveChecklist}  Checklist = {checklist} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>))}
                                    </div>:
                                        undefined
                                }
                                </div>
                            </div>
                        </div>
                    )
                case '1':
                    return (
                        <div>
                            {
                            this.props.applicationDetail.events.map((event) =>(
                                <ApplicationDetailEvents onSaveEventNote = {this.onSaveEventNote} Event = {event} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                            ))
                            }
                        </div>
                    )
                case '2':
                    return (
                        <div>
                            {
                            this.props.applicationDetail.notes.map((note) =>(
                                <ApplicationDetailNotes onSaveNote = {this.onSaveNote} Note = {note} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                            ))
                            }
                        </div>
                    )
                case '3':
                    return (
                        <div>
                            {
                            this.props.applicationDetail.contacts.map((data) => (
                                <ApplicationDetailContacts onSaveContactNote = {this.onSaveContactNote} contact = {data} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                            ))
                            }
                        </div>                
                    )
                case '4':
                    return (
                        <div>
                            {
                            this.props.applicationDetail.followUps.map((FollowUp) =>(
                                <ApplicationDetailFollowUp onSaveConversation = {this.onSaveConversation} FollowUp = {FollowUp} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                            ))
                            }
                        </div>
                    )
                case '5':
                    return (
                        <div>
                            {
                            this.props.applicationDetail.checklists.map((checklist) =>(
                                <ApplicationDetailChecklists onSaveChecklist = {this.onSaveChecklist} Checklist = {checklist} applicationID = {this.props.applicationDetail.applicationID} type ={'application'}/>
                            ))
                            }
                        </div>
                )
            }
        }
    }

    render(){

        return(
            <div>
                {this.display()}
            </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationDetailComponents)