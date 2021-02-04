import React, {Component} from 'react';

import ApplicationDetailEvents from './../../sypp_applications/application_detail/application_detail_components/ApplicationDetailEvents'
import ApplicationDetailChecklists from './../../sypp_applications/application_detail/application_detail_components/ApplicationDetailChecklists'
import ApplicationDetailNotes from './../../sypp_applications/application_detail/application_detail_components/ApplicationDetailNotes'
import ApplicationDetailFollowUp from './../../sypp_applications/application_detail/application_detail_components/ApplicationDetailFollowUp'
import ApplicationDetailContacts from './../../sypp_applications/application_detail/application_detail_components/ApplicationDetailContacts'

import CreateEditChecklist from './../../components/create_edit_components/create_edit_checklist/CreateEditChecklist'
import CreateEditContact from './../../components/create_edit_components/create_edit_contact/CreateEditContact'
import CreateEditEvent from './../../components/create_edit_components/create_edit_event/CreateEditEvent'
import CreateEditNote from './../../components/create_edit_components/create_edit_note/CreateEditNote'
import CreateEditConversation from './../../components/create_edit_components/create_edit_conversation/CreateEditConversation'
import './../../sypp_applications/application_detail/application_detail_components/ApplicationDetailComponents.scss'

import {setCompany} from './../../redux/company-reducer/companyAction'
import {connect} from 'react-redux'

import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal';



const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        setCompany: () => dispatch(setCompany()),
    }
}


class CompanyDetailComponents extends Component {
    constructor(){
        super();
        this.state = {
            show : false,
            selectedValue : '1'
        }
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

    handleClose =() =>{
        this.setState({
            show: false
        })
    }
    handleShow = () =>{
        this.setState({
            show:true
        })
    }
    onClick = (value) => {
        if(value === '1'){
            this.setState({
                show:true,
                selectedValue : '1'
            })
            this.props.setRadioValue('1')
        }
        else if(value==='2'){
            this.setState({
                show:true,
                selectedValue : '2'
            })
            this.props.setRadioValue('2')
        }
        else if(value==='3'){
            this.setState({
                show:true,
                selectedValue : '3'
            })
            this.props.setRadioValue('3')
        }
        else if(value==='4'){
            this.setState({
                show:true,
                selectedValue : '4'
            })
            this.props.setRadioValue('4')
        }
        else if(value==='5'){
            this.setState({
                show:true,
                selectedValue : '5'  
        })
            this.props.setRadioValue('5')
        }
    }

    triggerComponents = () =>{
        if(this.state.selectedValue === '1'){
            return(
                <CreateEditEvent Event = {''} handleClose = {this.handleClose} companyID = {this.props.companyID} type ={'company'}/>
            );
        }
        else if(this.state.selectedValue === '2'){
            return(
                <CreateEditNote Note = {''} handleClose = {this.handleClose} companyID = {this.props.companyID} type ={'company'}/>
            );
        }
        else if(this.state.selectedValue === '3'){
            return(
                <CreateEditContact Contact = {''} handleClose = {this.handleClose} companyID = {this.props.companyID} type ={'company'}/>
            );
        }
        else if(this.state.selectedValue === '4'){
            return(
                <CreateEditConversation FollowUp = {''} handleClose = {this.handleClose} companyID = {this.props.companyID} type ={'company'} editorState = {''}/>
            );
        }
        else if(this.state.selectedValue === '5'){
            return(
                <CreateEditChecklist Checklist = {''} handleClose = {this.handleClose} companyID = {this.props.companyID} type ={'company'} editorState = {''}/>
            );
        }
        return(
            <div></div>
        )
    }

    display = () =>{
        if(this.props.companyID !== ''){
            switch(this.props.radioValue){
                case '0':
                    return (
                        <div class = "container">
                            <div class = "row">
                                <div class = "col">
                                {
                                    this.props.companyDetail.events.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Events</div>
                                        {this.props.companyDetail.events.map((event) =>(
                                            <ApplicationDetailEvents onSaveEventNote = {this.onSaveEventNote} Event = {event} companyID = {this.props.companyID} type ={'company'}/>))}
                                    </div>:
                                        undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.companyDetail.notes.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Notes</div>
                                        {this.props.companyDetail.notes.map((note) =>(
                                            <ApplicationDetailNotes onSaveNote = {this.onSaveNote}  Note = {note} companyID = {this.props.companyID} type ={'company'}/>))}
                                    </div>
                                        :undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.companyDetail.contacts.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Contacts</div>
                                        {this.props.companyDetail.contacts.map((data) => (
                                            <ApplicationDetailContacts onSaveContactNote = {this.onSaveContactNote} contact = {data} companyID = {this.props.companyID} type ={'company'}/>))}
                                    </div>:
                                        undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.companyDetail.followUps.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Conversational Histories</div>
                                        {this.props.companyDetail.followUps.map((FollowUp) =>(
                                            <ApplicationDetailFollowUp onSaveConversation = {this.onSaveConversation} FollowUp = {FollowUp} companyID = {this.props.companyID} type ={'company'}/>))}
                                    </div>:
                                        undefined
                                }
                                </div>
                                <div class = "col">
                                {
                                    this.props.companyDetail.checklists.length !== 0 ? 
                                    <div>
                                        <div className = "sypp-applicationDetail-all-title">Checklist</div>
                                        {this.props.companyDetail.checklists.map((checklist) =>(
                                            <ApplicationDetailChecklists onSaveChecklist = {this.onSaveChecklist}  Checklist = {checklist} companyID = {this.props.companyID} type ={'company'}/>))}
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
                            this.props.companyDetail.events.map((event) =>(
                                <ApplicationDetailEvents onSaveEventNote = {this.onSaveEventNote} Event = {event} companyID = {this.props.companyID} type ={'company'}/>
                            ))
                            }
                        </div>
                    )
                case '2':
                    return (
                        <div>
                            {
                            this.props.companyDetail.notes.map((note) =>(
                                <ApplicationDetailNotes onSaveNote = {this.onSaveNote} Note = {note} companyID = {this.props.companyID} type ={'company'}/>
                            ))
                            }
                        </div>
                    )
                case '3':
                    return (
                        <div>
                            {
                            this.props.companyDetail.contacts.map((data) => (
                                <ApplicationDetailContacts onSaveContactNote = {this.onSaveContactNote} contact = {data} companyID = {this.props.companyID} type ={'company'}/>
                            ))
                            }
                        </div>                
                    )
                case '4':
                    return (
                        <div>
                            {
                            this.props.companyDetail.followUps.map((FollowUp) =>(
                                <ApplicationDetailFollowUp onSaveConversation = {this.onSaveConversation} FollowUp = {FollowUp} companyID = {this.props.companyID} type ={'company'}/>
                            ))
                            }
                        </div>
                    )
                case '5':
                    return (
                        <div>
                            {
                            this.props.companyDetail.checklists.map((checklist) =>(
                                <ApplicationDetailChecklists onSaveChecklist = {this.onSaveChecklist} Checklist = {checklist} companyID = {this.props.companyID} type ={'company'}/>
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
                <Popup
                trigger={
                    <button 
                    className = "sypp-detail-add-button">+</button>
                }
                position={'right'}
                closeOnEscape
                closeOnDocumentClick
                >
                <div className = "sypp-tooltip-button-container">
                    <button className = "sypp-create-detail-button sypp-create-detail-button1" onClick = {() => this.onClick('1')}>Events</button>
                    <button className = "sypp-create-detail-button sypp-create-detail-button2" onClick = {() => this.onClick('2')}>Notes</button>
                    <button className = "sypp-create-detail-button sypp-create-detail-button3" onClick = {() => this.onClick('3')}>Contacts</button>
                    <button className = "sypp-create-detail-button sypp-create-detail-button4" onClick = {() => this.onClick('4')}>Conversation Histories</button>
                    <button className = "sypp-create-detail-button sypp-create-detail-button5" onClick = {() => this.onClick('5')}>Checklists</button>
                    </div>
                </Popup>
                <Modal 
                show={this.state.show}
                onHide={this.handleClose}
                centered
                dialogClassName = "sypp-create-detail-modal sypp-modal-content"
                className = "sypp-modal-content"
                >
                    <div className = 'sypp-create-detail-modal-container'>
                        <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
                        {this.triggerComponents()}
                    </div>
                </Modal>
            </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyDetailComponents)