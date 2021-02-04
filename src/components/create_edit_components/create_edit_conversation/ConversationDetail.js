import React, {Component} from 'react';
import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Moment from 'moment';


class ConversationDetail extends Component {
    constructor(props) {
        super(props);
          this.state = {
          editorState: ''
        };
    }
    componentDidMount(){
        if(this.props.FollowUp !== ''){
          const contentBlocksArray = []
            for (var i=0;i<this.props.FollowUp.description.length;i++){
                if(this.props.FollowUp.description.length !== 0){
                    contentBlocksArray.push(
                        new ContentBlock({
                            key: this.props.FollowUp.description[i].noteContentsID,
                            type: 'unordered-list-item',
                            depth: 0,
                            text: this.props.FollowUp.description[i].header
                        })
                    )
                    for(var j=0;j<this.props.FollowUp.description[i].contents_Text.length;j++){
                        contentBlocksArray.push(
                            new ContentBlock({
                                key: genKey(),
                                type: 'unordered-list-item',
                                depth: 1,
                                text: this.props.FollowUp.description[i].contents_Text[j]
                            })
                        )
                    }
                }
            }

            this.setState({
                editorState : EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray))
            })
        }
    }

    onSave = () =>{
      this.props.onSaveButton(this.state.editorState);
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
      this.props.handleEditorState(this.state.editorState);
    }

    render(){
        return(
            <div >
                <div className = "sypp-event-detail-container">
                <input
                className = "sypp-event-name"
                placeholder="Contact Name Here"
                onChange={e => this.props.onChangeName(e)}
                value={this.props.name}
                />
                <input
                className = "sypp-contact-name-subTitle"
                placeholder="Contact Position Here"
                onChange={e => this.props.onChangePosition(e)}
                value={this.props.position}
                />
                <div className ="sypp-event-seperateLine"></div>
                <div className = "sypp-event-title">Conversation Date</div>
                {this.props.time === ''?                 
                <button className = "sypp-event-datePick-button" onClick = {this.props.nextStep}>
                    Select Date
                </button>:
                <div className = "sypp-event-datepick-resultDate-container">
                <div className = "sypp-event-datepick-resultDate">{Moment(this.props.time).format('MMM DD, YYYY • h:mma')}</div>
                <button className = "sypp-event-datePick-button" onClick = {this.props.nextStep}>
                Edit Date
                </button>
                </div>
                }
                <div className ="sypp-event-seperateLine"></div>

                <div className = "sypp-event-title">Note</div>  
                <div style={{overflowY: 'scroll', height: '200px'}}>
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
                    <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page1" onClick = {this.onSave}>Save</button>
                    <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page1" onClick = {this.props.handleClose}>Close</button>
                </div>
            </div>
        );
    }
}
export default ConversationDetail