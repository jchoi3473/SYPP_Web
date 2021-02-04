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
import {setCompany} from './../../../redux/company-reducer/companyAction'
import {setApps} from './../../../redux/application-reducer/applicationAction'


  const {hasCommandModifier} = KeyBindingUtil;
  const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
        apps: state.application.applications,
        // pending: state.progress.isPending,
        // categories: state.categories.categories, 
        // applicationDetail : state.applicationDetail.application
    }
  }
  const mapDispatchToProps= dispatch =>{
    return {
        setApps : (applications) => dispatch(setApps(applications)),
        setCompany : (companies) => dispatch(setCompany(companies)),
    }
  }

class ApplicationDetailChecklists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: '',
          checkboxState : '',
          show : false
        };
      }

    //API calls here, need to save the checkbox status to the application
    // onCheckBoxClick = (checkboxID) => {
    //     var tempCheckbox = this.state.checkboxState
    //     for(var i=0;i<this.state.checkboxState.length;i++){
    //         if(checkboxID === this.state.checkboxState[i].checklistID){
    //             tempCheckbox[i].checkboxBoolean = !tempCheckbox[i].checkboxBoolean
    //         }
    //         this.setState({
    //             checkboxState : tempCheckbox 
    //         })
    //     }
    // }

    onCheckBoxClick = (checkboxArray, checklistID) =>{
      if(this.props.type === 'application'){
        var apps = this.props.apps
        for(var i=0;i<this.props.apps.length;i++){
          if(this.props.apps[i].applicationID === this.props.applicationID){
            for(var j=0;j<this.props.apps[i].checklists.length;j++){
              if(this.props.apps[i].checklists[j].checklistID === this.props.Checklist.checklistID){
                for(var k=0;k<this.props.apps[i].checklists[j].files.length;k++){
                  if(checkboxArray[k].checklistID === checklistID){
                    apps[i].checklists[j].files[k].isChecked = !apps[i].checklists[j].files[k].isChecked
                  }
              }
            }
          }
        }
      }
      this.props.setApps(apps)
      }
      if(this.props.type === 'company'){
        var companies = this.props.companies
        for(var i=0;i<this.props.companies.length;i++){
          if(this.props.companies[i].companyID === this.props.companyID){
            for(var j=0;j<this.props.companies[i].checklists.length;j++){
              if(this.props.companies[i].checklists[j].checklistID === this.props.Checklist.checklistID){
                for(var k=0;k<this.props.companies[i].checklists[j].files.length;k++){
                  if(checkboxArray[k].checklistID === checklistID){
                  companies[i].checklists[j].files[k].isChecked = !companies[i].checklists[j].files[k].isChecked
                  }
              }
            }
          }
        }
      }
      this.props.setCompany(companies)
    }
    this.setState({})
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

    checkboxDisplay = () =>{
      var checkboxArray =[]
      for (var i=0;i<this.props.Checklist.files.length;i++){
        var checklistID = genKey();
          checkboxArray.push({
            checklistID : checklistID,
            checkboxBoolean: this.props.Checklist.files[i].isChecked
        })
      }
      return(
        <div>
        {
          checkboxArray.map((checkbox) => (
            <div className = "sypp-checkbox-container">
            <FormControlLabel 
              className = "sypp-FormRoot"
              control = {
              <Checkbox 
              icon=  {<FontAwesomeIcon className = "sypp-CheckBox-icon" icon={faSquare}/> }
              checkedIcon= {<FontAwesomeIcon className = "sypp-CheckBox-icon sypp-checked" icon={faCheckSquare}/> }
              className = "sypp-Checkbox-padding sypp-Checkbox-padding2"
              checked = {checkbox.checkboxBoolean} 
              onChange = {() => this.onCheckBoxClick(checkboxArray, checkbox.checklistID)}/>}
              />
            </div> 
          ))
        }
        </div>
      )
    }
     
    
      render() {
        return (
          <div className="sypp-ApplicationDetailNote-container">
            <div className="sypp-ApplicationDetailNote-title-container">
            <div className = "sypp-applicationDetailTextTitle">{this.props.Checklist.type}</div>
            </div>
            <div className = "sypp-ApplicationDetailChecklists-container">
            <div className = "sypp-CheckList-Container">
              {
                  this.checkboxDisplay()
              }
            </div>
            <div className = "sypp-Editor-Container" onClick = {this.handleOpen}>
            {
              this.props.Checklist.files.map((data) => (
                <div className = "sypp-checklist-body">{data.title}</div>
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
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationDetailChecklists)