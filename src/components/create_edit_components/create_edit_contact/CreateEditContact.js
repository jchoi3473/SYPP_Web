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

const mapStatetoProps = state => {
    return{
        apps: state.application.applications,
        
    }
  }
  
  const mapDispatchToProps= dispatch =>{
    return {
        setApps : (applications) => dispatch(setApps(applications)),
        // setCompany : (companies) => dispatch(setCompany(companies)),
    }
  }


export class CreateEditContact extends Component {
    state = {
        type: '',
        contactID : '',
        Firstname : '',
        Title : '',
        Email : '',
        emailID : '',
        PhoneNumber : '',
        phoneID: '',
        editorState : '',
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.Contact !== ''){
            const contentBlocksArray = []
            for (var i=0;i<this.props.Contact.convo.length;i++){
            if(this.props.Contact.convo.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.Contact.convo[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: 0,
                        text: this.props.Contact.convo[i].header
                      })
                )
                for(var j=0;j<this.props.Contact.convo[i].contents_Text.length;j++){
                    contentBlocksArray.push(
                        new ContentBlock({
                            key: genKey(),
                            type: 'unordered-list-item',
                            depth: 1,
                            text: this.props.Contact.convo[i].contents_Text[j]
                          })
                    )
                }
            }
        }
            this.setState({
                contactID : this.props.Contact.contactID,
                Firstname : this.props.Contact.personalDetail.firstname,
                Title : this.props.Contact.personalDetail.title,
                Email : this.props.Contact.email.email,
                emailID : this.props.Contact.email.emailID,
                PhoneNumber : this.props.Contact.phone.phoneNumber,
                phoneID: this.props.Contact.phone.phoneID,
                editorState : EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray))
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)


    onSaveButton = () => {
        // this.props.postNewApp(this.props.addApp)
        console.log(this.state.editorState)
        var newNoteContent = []
        if(this.state.editorState !== ''){
        newNoteContent = [{
        noteContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][0],
        header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][1].text,
        contents_Text : []
      }];
      var tracker = 0;
        for(var i=1;i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
          if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth === 0){
            tracker++;
            newNoteContent.push({
              noteContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
              header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
              contents_Text : []
            })
          }
          else{
            newNoteContent[tracker].contents_Text.push(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text)
          }
        }
        }

        //Creating a new event
        if(this.state.contactID === '' && this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const key = genKey()
                    console.log("this one is triggeredd...")
                    apps[i].contacts.push(  
                        {
                            contactID: key,
                            personalDetail: {
                                contactID: key,
                                title: this.state.Title,
                                firstname : this.state.Firstname,
                            },
                            email: {
                                email: this.state.Email,
                                emailID : genKey()
                            },
                            phone: {
                                phoneNumber : this.state.PhoneNumber,
                                phoneID : genKey()
                            },
                            convo: newNoteContent
                        }
                    )
                }
            }
            this.props.setApps(apps)
        }
        //editing an existing event, app
        else if(this.state.contactID !== '' && this.state.type ==='application'){
            var apps = this.props.apps 
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    for(var j=0; j<this.props.apps[i].contacts.length;j++){
                        if(this.props.apps[i].contacts[j].contactID === this.state.contactID){
                            apps[i].contacts[j] = {
                                contactID: this.state.contactID,
                                personalDetail: {
                                    contactID: this.state.contactID,
                                    title: this.state.Title,
                                    firstname : this.state.Firstname,
                                },
                                email: {
                                    email: this.state.Email,
                                    emailID : this.state.emailID
                                },
                                phone: {
                                    phoneNumber : this.state.PhoneNumber,
                                    phoneID : this.state.phoneID
                                },
                                convo: newNoteContent
                            }
                        }
                    }
                }
            }
            this.props.setApps(apps)
            this.props.onSaveContactNote()
        }
        this.props.handleClose()
    }

    onChangeName = (e) =>{
        this.setState({
            Firstname : e.currentTarget.value
        })
    }
    onChangePosition = (e) =>{
        this.setState({
            Title : e.currentTarget.value
        })
    }
    onChangeEmail = (e) =>{
        this.setState({
            Email : e.currentTarget.value
        })
    }
    onChangePhoneNumber = (e) =>{
        this.setState({
            PhoneNumber : e.currentTarget.value
        })
    }
    currentBlockKey = () => this.state.editorState.getSelection().getStartKey()
      
    currentBlockIndex = () => this.state.editorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())
      
    myKeyBindingFn = (e) => {
        switch (e.keyCode) {
          case 9: // TAB
            if(this.currentBlockIndex() == 0){
              return undefined
            }
            else {
            const newEditorState = RichUtils.onTab(
              e,
              this.state.editorState,
              1 /* maxDepth */,
            );
            if (newEditorState !== this.state.editorState) {
              this.setState({
                editorState: newEditorState
              })
              return null;
            }
          }
          default: 
            return getDefaultKeyBinding(e);      
      }
    }
        //       console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].depth)
    _handleChange = (editorState) => {
      console.log(this.state.editorState)
      if(RichUtils.getCurrentBlockType(editorState) !== 'unordered-list-item'){
        const newEditorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
        this.setState({editorState: newEditorState})
      }
      else{
        this.setState({editorState});
      }
    }

    
    render(){
       return (
        <div>
            <div className = "sypp-create-edit-detail-container">
            <input
                className = "sypp-event-name"
                placeholder="Contact Name Here"
                onChange={e => this.onChangeName(e)}
                value={this.state.Firstname}
                />
                <input
                className = "sypp-contact-name-subTitle"
                placeholder="Contact Name Here"
                onChange={e => this.onChangePosition(e)}
                value={this.state.Title}
                />
             <div className ="sypp-event-seperateLine"></div>
            <div className = "sypp-event-title">Email</div>
            <input
                className = "sypp-contact-name-body"
                placeholder="Contact Name Here"
                onChange={e => this.onChangeEmail(e)}
                value={this.state.Email}
            />
            <div className = "sypp-event-title">PhoneNumber</div>
            <input
                className = "sypp-contact-name-body"
                placeholder="Contact Name Here"
                onChange={e => this.onChangePhoneNumber(e)}
                value={this.state.PhoneNumber}
            />
            <div className = "sypp-event-title">Notes</div>

            <div style={{overflowY: 'scroll', height: '170px'}}>
                <Editor 
                    placeholder = "      Text Here"
                    toolbarHidden
                    editorClassName="sypp-editor-class"
                    editorState={this.state.editorState}
                    onEditorStateChange={this._handleChange}
                    keyBindingFn={this.myKeyBindingFn}
                />
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

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditContact)