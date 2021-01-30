import React from 'react';
import ReactDOM from 'react-dom';
import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import './ApplicationDetailNotes.scss'
import './../ApplicationDetail.scss'

import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import {setApps} from './../../../redux/application-reducer/applicationAction'
import {connect} from 'react-redux'
// import { setCompany } from '../redux/company-reducer/companyAction';
import Modal from 'react-bootstrap/Modal';
// import CreateEditNote from './../create_edit_applications_components/create_edit_note/CreateEditNote'
import CreateEditNote from './../../../components/create_edit_components/create_edit_note/CreateEditNote'

const {hasCommandModifier} = KeyBindingUtil;
const mapStatetoProps = state => {
  return{
      apps: state.application.applications,
  }
}

const mapDispatchToProps= dispatch =>{
  return {
      setApps: (applications) => dispatch(setApps(applications)),
      // setCompany : (companies) => dispatch(setCompany(companies))
  }
}


class ApplicationDetailNotes extends React.Component {
    constructor(props) {
        super(props);
        const contentBlocksArray = []
        for (var i=0;i<this.props.Note.contents.length;i++){
            if(this.props.Note.contents.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.Note.contents[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: 0,
                        text: this.props.Note.contents[i].header
                      })
                )
                for(var j=0;j<this.props.Note.contents[i].contents_Text.length;j++){
                    contentBlocksArray.push(
                        new ContentBlock({
                            key: genKey(),
                            type: 'unordered-list-item',
                            depth: 1,
                            text: this.props.Note.contents[i].contents_Text[j]
                          })
                    )
                }
            }
        }
          this.state = {
          editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray)),
          show : false

        };
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
      if(RichUtils.getCurrentBlockType(editorState) !== 'unordered-list-item'){
        const newEditorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
        this.setState({editorState: newEditorState})
      }
      else{
        this.setState({ editorState});
      }
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
     
    
      render() {
        return (
          <div className= "sypp-ApplicationDetailNote-container">
            <div className="sypp-ApplicationDetailNote-title-container" onClick = {this.handleOpen}>
            <div className = "sypp-ApplicationDetailNote-title">
            <div className = "sypp-applicationDetailTextTitle">{this.props.Note.detail.title}</div>
            </div>
            <div>
            {
              this.props.Note.contents.map((data) => (
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
            {/* <Editor 
              toolbarHidden
              editorClassName="sypp-editor-class"
              editorState={this.state.editorState}
              onEditorStateChange={this._handleChange}
              keyBindingFn={this.myKeyBindingFn}
            /> */}
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
                    <CreateEditNote  _handleChange = {this._handleChange} onSaveNote = {this.props.onSaveNote} Note = {this.props.Note} handleClose = {this.handleClose} editorState = {this.state.editorState} applicationID = {this.props.applicationID} type ={this.props.type} companyID = {this.props.companyID}/>
                </div>
            </Modal>
          </div>
        );
      }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationDetailNotes)