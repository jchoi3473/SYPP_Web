import React, {Component} from 'react';
import EventDetail from './EventDetail'
import EventSelectDate from './EventSelectDate'

import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {connect} from 'react-redux'
import {setApps} from './../../../redux/application-reducer/applicationAction'
// import {setCompany} from './../../redux/company-reducer/companyAction'

const mapStatetoProps = state => {
    return{
        apps: state.application.applications,
        // companies: state.companies.companies,
    }
  }
  
  const mapDispatchToProps= dispatch =>{
    return {
        setApps : (applications) => dispatch(setApps(applications)),
        // setCompany : (companies) => dispatch(setCompany(companies)),
        // updateApplicationDetail: (applications) => dispatch(updateApplicationDetail(applications)),
    }
  }


export class CreateEditEvent extends Component {
    state = {
        type: '',
        step: 1,
        eventID : '',
        eventName : '',
        eventLocation :'',
        eventNote : '',
        eventDate : '',
        eventHour : 0,
        eventMinute : 0,
        eventTimeConvert : '',
        editorState : ''
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.Event !== ''){            
            this.setState({
                eventID: this.props.Event.eventID,
                eventName : this.props.Event.detail.title,
                eventLocation :this.props.Event.detail.location,
                eventNote : '',
                eventDate : this.props.Event.detail.time,
                eventHour : 0,
                eventMinute : 0,
                eventTimeConvert : '',
                editorState : this.props.editorState
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = (editorState) => {
        // this.props.postNewApp(this.props.addApp)
    var newNoteContent = []
    if(editorState !== ''){
        newNoteContent = [{
            noteContentsID : editorState._immutable.currentContent.blockMap._list._tail.array[0][0],
            header : editorState._immutable.currentContent.blockMap._list._tail.array[0][1].text,
            contents_Text : []
      }];
      var tracker = 0;
        for(var i=1;i<editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
          if(editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth === 0){
            tracker++;
            newNoteContent.push({
                noteContentsID : editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                header : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                contents_Text : []
            })
          }
          else{
            newNoteContent[tracker].contents_Text.push(editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text)
          }
        }
    }
        //Creating a new event
        if(this.state.eventID === '' && this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const key = genKey()
                    apps[i].events.push(  
                        {
                            eventID: key,
                            detail: {
                                eventID: key,
                                applicationID: this.props.applicationID,
                                time: this.state.eventDate,
                                location: this.state.eventLocation,
                                title: this.state.eventName
                            },
                            contents: newNoteContent
                        }
                    )
                }
            }
            this.props.setApps(apps)
        }
        //editing an existing event, app
        else if(this.state.eventID !== '' && this.state.type ==='application'){
            console.log(this.state.eventID)
            var apps = this.props.apps 
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    for(var j=0; j<this.props.apps[i].events.length;j++){
                        if(this.props.apps[i].events[j].eventID === this.state.eventID){
                            console.log("this one is triggeredd?")
                            apps[i].events[j] = {
                                eventID: this.state.eventID,
                                detail: {
                                    eventID: this.state.eventID,
                                    applicationID: this.props.applicationID,
                                    time: this.state.eventDate,
                                    location: this.state.eventLocation,
                                    title: this.state.eventName
                                },
                                contents: newNoteContent
                            }
                        }
                    }
                }
            }
            this.props.setApps(apps)
            this.props.onSaveEventNote()
            this.props._handleChange(editorState)
        }
        //Company save function

        // else if(this.state.eventID === '' && this.state.type ==='company'){
        //     var companies = this.props.companies
        //     for(var i=0;i<this.props.companies.length;i++){
        //         if(this.props.companies[i].companyID === this.props.companyID){
        //             const key = genKey()
        //             companies[i].Events.push(  
        //                 {
        //                     eventID: key,
        //                     Detail: {
        //                         eventID: key,
        //                         applicationID: this.props.companyID,
        //                         Time: this.state.eventDate,
        //                         Location: this.state.eventLocation,
        //                         Title: this.state.eventName
        //                     },
        //                     Contents: newNoteContent
        //                 }
        //             )
        //         }
        //     }
        //     this.props.onSaveEventNote()
        //     this.props.setCompany(companies)
        //     this.setState({})
        // }
        // else if(this.state.eventID !== '' && this.state.type ==='company'){
        //     console.log(this.state.eventID)
        //     var companies = this.props.companies 
        //     for(var i=0;i<this.props.companies.length;i++){
        //         if(this.props.companies[i].companyID === this.props.companyID){
        //             for(var j=0; j<this.props.companies[i].Events.length;j++){
        //                 if(this.props.companies[i].Events[j].eventID === this.state.eventID){
        //                     console.log("this one is triggeredd?")
        //                     companies[i].Events[j] = {
        //                         eventID: this.state.eventID,
        //                         Detail: {
        //                             eventID: this.state.eventID,
        //                             applicationID: this.props.companyID,
        //                             Time: this.state.eventDate,
        //                             Location: this.state.eventLocation,
        //                             Title: this.state.eventName
        //                         },
        //                         Contents: newNoteContent
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     this.props.setCompany(companies)
        //     this.props.onSaveEventNote()
        //     this.props._handleChange(editorState)
        //     this.setState({})
        // }
        this.props.handleClose()
    }

    onChangeName = (e) =>{
        this.setState({
            eventName : e.currentTarget.value
        })
        console.log(this.state.eventName)
    }
    onChangeLocation = (e) =>{
        this.setState({
            eventLocation : e.currentTarget.value
        })
    }
    onChangeDate = (date) =>{
        this.setState({
            eventDate : date
        })
        console.log(date)
    }
    onChangeHour = (hour) =>{
        this.setState({
            eventHour : hour
        })
    }
    onChangeMinute = (minute) =>{
        this.setState({
            eventMinute : minute
        })
    }
    nextStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleEditorState = (editorState) =>{
        this.setState({
            editorState: editorState
        })
    }


    
    render(){
        const{step} = this.state;
        switch(step){
            case 1:
                return(
                    <div>
                        <EventDetail 
                            nextStep = {this.nextStep}
                            eventName = {this.state.eventName}
                            onChangeName = {this.onChangeName}
                            eventLocation = {this.state.eventLocation}
                            onChangeLocation = {this.onChangeLocation}
                            handleClose = {this.props.handleClose}
                            eventDate = {this.state.eventDate}
                            editorState = {this.props.editorState}
                            handleEditorState = {this.handleEditorState}
                            onSaveButton = {this.onSaveButton}
                            Event = {this.props.Event}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <EventSelectDate
                        prevStep = {this.prevStep}
                        onChangeDate = {this.onChangeDate}
                        onChangeHour = {this.onChangeHour}
                        onChangeMinute = {this.onChangeMinute}
                        handleClose = {this.props.handleClose}
                        eventDate = {this.state.eventDate}
                        eventHour = {this.state.eventHour}
                        eventMinute = {this.state.eventMinute}
                        />
                    </div>
                )
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditEvent)