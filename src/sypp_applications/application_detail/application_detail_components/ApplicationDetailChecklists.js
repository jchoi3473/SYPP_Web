import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterMetadata, RichUtils, ContentBlock, genKey, ContentState, EditorState, convertFromRaw, contentBlocks} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Checkbox from '@material-ui/core/Checkbox';
import 'draft-js/dist/Draft.css';
import './ApplicationDetailNotes.scss'
import './../ApplicationDetail.scss'
import './ApplicationDetailChecklists.scss'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { faListAlt} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Checkbox } from 'semantic-ui-react'
import CreateEditChecklist from './../../../components/create_edit_components/create_edit_checklist/CreateEditChecklist'
// import CreateEditChecklist from './../create_edit_applications_components/create_edit_checklist/CreateEditChecklist'

import {getDefaultKeyBinding, KeyBindingUtil, getSelection, getCurrentContent, editorState, changeDepth, keyBindingFn} from 'draft-js';
import {connect} from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";


  const {hasCommandModifier} = KeyBindingUtil;
  

class ApplicationDetailChecklists extends React.Component {
    constructor(props) {
        super(props);
        const contentBlocksArray = []
        const checkboxArray =[]
        for (var i=0;i<this.props.Checklist.Contents.length;i++){
            if(this.props.Checklist.Contents.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.Checklist.Contents[i].checklistID,
                        type: 'unstyled',
                        depth: 0,
                        text: this.props.Checklist.Contents[i].Type
                      })
                )
            }
            checkboxArray.push({
                checklistID : this.props.Checklist.Contents[i].checklistID,
                checkboxBoolean: this.props.Checklist.Contents[i].Submission
            })
        }
          this.state = {
          editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray)),
          checkboxState : checkboxArray,
          show : false
        };
      }
    
    //API calls here, need to save the checkbox status to the application
    onCheckBoxClick = (checkboxID) => {
        var tempCheckbox = this.state.checkboxState
        for(var i=0;i<this.state.checkboxState.length;i++){
            if(checkboxID === this.state.checkboxState[i].checklistID){
                tempCheckbox[i].checkboxBoolean = !tempCheckbox[i].checkboxBoolean
            }
            this.setState({
                checkboxState : tempCheckbox 
            })
        }
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

    handleCheckbox = (checkboxState) =>{
      this.setState({
        checkboxState : checkboxState
      })
    }
     
    
      render() {
        return (
          <div className="sypp-ApplicationDetailNote-container">
            <div className="sypp-ApplicationDetailNote-title-container">
            <div className = "sypp-applicationDetailTextTitle">{this.props.Checklist.Detail.Title}</div>
            </div>
            <div className = "sypp-ApplicationDetailChecklists-container">
            <div className = "sypp-CheckList-Container" style = {{"height":""+this.state.checkboxState.length*16.363333333}}>
            {
                // className = "Checkbox-padding checkbox-root checkboxIcomButton-root Icon-root Checkbox-Checked" 
                this.state.checkboxState.map((checkbox) => (
                    // <FormGroup row>
                    <FormControlLabel 
                    className = "sypp-FormRoot"
                    control = {
                    <Checkbox 
                    icon=  {<FontAwesomeIcon className = "sypp-CheckBox-icon" icon={faSquare}/> }
                    checkedIcon= {<FontAwesomeIcon className = "sypp-CheckBox-icon sypp-checked" icon={faCheckSquare}/> }
                    className = "sypp-Checkbox-padding sypp-Checkbox-padding2"
                    checked = {checkbox.checkboxBoolean} 
                    onChange = {() => this.onCheckBoxClick(checkbox.checklistID)}/>}
                    />
                    // </FormGroup>
                ))
            }
            </div>
            <div className = "sypp-Editor-Container" onClick = {this.handleOpen}>
            {
              this.props.Checklist.Contents.map((data) => (
                <div className = "sypp-checklist-body">{data.Type}</div>
              ))
            }
            </div>
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
                    <CreateEditChecklist onSaveChecklist = {this.props.onSaveChecklist} _handleChange = {this._handleChange} handleCheckbox = {this.handleCheckbox} Checklist = {this.props.Checklist} handleClose = {this.handleClose} type ={this.props.type} companyID = {this.props.companyID} applicationID = {this.props.applicationID}
                    checkboxState = {this.state.checkboxState} editorState = {this.state.editorState}/>
                </div>
            </Modal>
          </div>
        );
      }
}
export default connect(null, null)(ApplicationDetailChecklists)