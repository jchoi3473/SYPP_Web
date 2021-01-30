import React, {Component} from 'react';

import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';

import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux'
import {setApps} from './../../../redux/application-reducer/applicationAction'
// import {setCompany} from './../../redux/company-reducer/companyAction'
import './../create_edit_event/CreateEvent.scss'
import './../CreateEditDetail.scss'


import { faListAlt} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormControlLabel from '@material-ui/core/FormControlLabel';

const mapStatetoProps = state => {
    return{
        apps: state.application.applications,
        // pending: state.progress.isPending,
        // categories: state.categories.categories, 
        // companies: state.companies.companies,
    }
  }
  
  const mapDispatchToProps= dispatch =>{
    return {
        setApps : (applications) => dispatch(setApps(applications)),
        // setCompany : (companies) => dispatch(setCompany(companies)),

    }
  }


export class CreateEditChecklist extends Component {
    state = {
        type: '',
        checkListsID : '',
        Title : '',
        Time : '',
        editorState : '',
        checkboxState : []
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.Checklist !== ''){
            this.setState({
                checkListsID : this.props.Checklist.checklistID,
                Title : this.props.Checklist.type,
                // Time : this.props.Checklist.Detail.Time,
                editorState : this.props.editorState,
                checkboxState : this.props.checkboxState
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = () => {
        // this.props.postNewApp(this.props.addApp)
        var newNoteContent = []
        if(this.state.editorState !== ''){
            for(var i=0;i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newNoteContent.push({
                    // checklistID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                    title : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                    isChecked : this.state.checkboxState[i].checkboxBoolean,
                    contents : 'null'
                })
            }
        }
        //Creating a new event
        if(this.state.checkListsID === '' && this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const key = genKey()
                    apps[i].checklists.push(  
                        {
                            checklistsID: key,
                            submission : false, 
                            type : this.state.Title,
                            files: newNoteContent
                        }
                    )
                }
            }
            this.props.setApps(apps)
        }
        //editing an existing event, app
        else if(this.state.checkListsID !== '' && this.state.type ==='application'){
            this.props.handleCheckbox(this.state.checkboxState)
            var apps = this.props.apps 
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    for(var j=0; j<this.props.apps[i].checklists.length;j++){
                        if(this.props.apps[i].checklists[j].checklistID === this.state.checkListsID){
                            apps[i].checklists[j] = {
                                checklistsID: this.state.checkListsID,
                                submission : false,
                                type : this.state.Title,
                                files: newNoteContent
                            }                
                        }
                    }
                }
            }
            this.props.setApps(apps)
            this.props._handleChange(this.state.editorState)
            this.props.onSaveChecklist()
        }
        //company detail fixing part, when it doesnt exist 
        else if(this.state.checkListsID === '' && this.state.type ==='company'){
            var companies = this.props.companies
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    const key = genKey()
                    companies[i].Checklists.push(  
                        {
                            checklistID: key,
                            Detail: {
                                checkListsID: key,
                                Time: new Date(),
                                Title: this.state.Title
                            },
                            Contents: newNoteContent
                        }
                    )
                }
            }
            this.props.setCompany(companies)
        }
        else if(this.state.checkListsID !== '' && this.state.type ==='company'){
            this.props.handleCheckbox(this.state.checkboxState)
            var companies = this.props.companies 
            for(var i=0;i<this.props.companies.length;i++){
                console.log("this one is triggeredd?")
                if(this.props.companies[i].companyID === this.props.companyID){
                    for(var j=0; j<this.props.companies[i].Checklists.length;j++){
                        if(this.props.companies[i].Checklists[j].checklistID === this.state.checkListsID){
                            companies[i].Checklists[j] = {
                                checklistID: this.state.checkListsID,
                                Detail: {
                                    checkListsID: this.state.checkListsID,
                                    Time: new Date(),
                                    Title: this.state.Title
                                },
                                Contents: newNoteContent
                            }
                        }
                    }
                }
            }
            this.props.setCompany(companies)
            this.props._handleChange(this.state.editorState)
            this.props.onSaveChecklist()
        }
        this.props.handleClose()
    }

    onChangeTitle = (e) =>{
        this.setState({
            Title : e.currentTarget.value
        })
    }

    handleEditorState = (editorState) =>{
        this.setState({
            editorState: editorState
        })
    }
    currentBlockKey = () => this.state.editorState.getSelection().getStartKey()
      
    currentBlockIndex = () => this.state.editorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())
      
    _handleChange = (editorState) => {      
            this.setState({editorState});
            if(this.state.editorState!==''){
            if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length > this.state.checkboxState.length){
                var tempCheckbox = 
                [
                    ...this.state.checkboxState.slice(0, this.currentBlockIndex()),
                    {
                        checklistID: this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][0],
                        checkboxBoolean: false
                    },
                    ...this.state.checkboxState.slice(this.currentBlockIndex())
                ]
               this.setState({
                checkboxState : tempCheckbox
               })
               console.log(this.state.checkboxState)
            }
            else if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length < this.state.checkboxState.length){
                var tempCheckbox = []
                for(var i = 0; i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                    for(var j=0;j< this.state.checkboxState.length;j++){
                        if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0]===this.state.checkboxState[j].checklistID){
                            tempCheckbox.push(this.state.checkboxState[j])
                        }
                    }
                }
               this.setState({
                checkboxState : tempCheckbox
               })
            }
        }
            this.setState({})
        }

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

    
    render(){
       return (
        <div>
            <div className = "sypp-create-edit-detail-container">
            <input
                className = "sypp-event-name"
                placeholder="Checklist Name"
                onChange={e => this.onChangeTitle(e)}
                value={this.state.Title}
                />
             <div className ="sypp-event-seperateLine"></div>
            <div className = "sypp-ApplicationDetailChecklists-container" style={{overflowY: 'scroll', height: '340px'}}>
            <div className = "sypp-CheckList-Container">
            {
                this.state.checkboxState.length === 0 ? 
                <div className = "sypp-emptybody-checkbox-container">
                    <FormControlLabel 
                    className = "sypp-FormRoot"
                    control = {
                    <Checkbox 
                    icon=  {<FontAwesomeIcon className = "sypp-CheckBox-icon" icon={faSquare}/> }
                    checkedIcon= {<FontAwesomeIcon className = " sypp-checked sypp-emptybody-checkbox" icon={faCheckSquare}/> }
                    className = "sypp-Checkbox-padding sypp-Checkbox-padding2"
                    checked = {true} 
                    />}
                    />
                </div>
                :this.state.checkboxState.map((checkbox) => (
                    // <FormGroup row>
                    <div className = "sypp-checkbox-container">
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
                    </div>
                ))
            }
            </div>
            <div className = "sypp-Editor-Container">
                <Editor 
                toolbarHidden
                editorClassName="sypp-editor-class sypp-checkbox-editorState"
                placeholder = "Checklist Items"
                editorState={this.state.editorState}
                onEditorStateChange={this._handleChange}
                //   keyBindingFn={this.myKeyBindingFn}
                />
            </div>
            </div>
            </div>
            <div className = "sypp-event-bottom-options-container">
                <button className = "sypp-event-bottom-option sypp-option1 sypp-option1-page1">Delete</button>
                <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page1" onClick = {this.onSaveButton}>Save</button>
                <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page1" onClick = {this.props.handleClose}>Close</button>
            </div>
        </div>
       );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditChecklist)