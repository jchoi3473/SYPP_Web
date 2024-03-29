import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterMetadata, RichUtils, ContentBlock, genKey, ContentState, EditorState, convertFromRaw, contentBlocks} from 'draft-js';
import {getDefaultKeyBinding, KeyBindingUtil, getSelection, getCurrentContent, editorState, changeDepth, keyBindingFn} from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import './ApplicationDetailNotes.scss'
import './../ApplicationDetail.scss'

import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Moment from 'moment';
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import CreateEditConversation from './../../../components/create_edit_components/create_edit_conversation/CreateEditConversation'

class ApplicationDetailFollowUp extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
            show: false,
            editorState : ''
        };
    }
    _handleChange = (editorState) =>{
        this.setState({
            editorState: editorState
        })
    }


    handleClose = () => {
    this.setState({
        show:false
    })
    }
    handleOpen = (e) =>{
    e.preventDefault()
    this.setState({
        show:true
    })
    }
    days_between = (date1) => {

        // The number of milliseconds in one day
        var date2 = new Date();
        // Convert both dates to milliseconds

        var Difference_In_Time = date2.getTime() - date1.getTime(); 
  
        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);   
        // Calculate the difference in milliseconds

        return Difference_In_Days
    }
      
    
    render() {
        return (
            <div className="sypp-ApplicationDetailNote-container">
            <div onClick = {this.handleOpen}>
                <div className="sypp-ApplicationDetailFollowup-title-container">
                    <div className = "sypp-applicationDetailTextTitle">{this.props.FollowUp.personnel.firstname +" "+this.props.FollowUp.personnel.lastname}</div>
                    <div className = "sypp-applicationDetailTextSubTitle">{this.props.FollowUp.personnel.title}</div>
                    <div className = "sypp-EventDateTime">{Moment(this.props.FollowUp.time).format('MMM DD, YYYY') + " (" +(Math.ceil((new Date().getTime() -new Date(this.props.FollowUp.time).getTime())/(1000*3600*24)))+" days ago)" }</div>
                </div>
                    {
                        this.props.FollowUp.description.map((data) => (
                        <div>
                        <div className = "sypp-note-text-header">{' • ' +data.header}</div>
                        {
                            data.contents_Text.length != 0 ?  
                            data.contents_Text.map((subText)=>(
                                <div className = "sypp-note-text-subText">{' • ' +subText}</div>
                            ))
                            : undefined
                        }
                        </div>
                        ))
                    }
            </div>
            <Modal 
            show={this.state.show}
            onHide={this.handleClose}
            centered
            dialogClassName = "sypp-create-detail-modal sypp-modal-content"
            className = "sypp-modal-content"
            >
                <div className = 'sypp-create-detail-modal-container'>
                    <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
                    <CreateEditConversation _handleChange = {this._handleChange} FollowUp = {this.props.FollowUp} onSaveConversation = {this.props.onSaveConversation} FollowUp = {this.props.FollowUp} handleClose = {this.handleClose} type ={this.props.type} applicationID = {this.props.applicationID} companyID = {this.props.companyID}/>
                </div>
            </Modal>
        </div>
        );
    }
}
export default connect(null, null)(ApplicationDetailFollowUp)