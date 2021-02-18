import React, {Component} from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


import {setApps} from './../../redux/application-reducer/applicationAction'
import {connect} from 'react-redux'
import ApplicationDetailComponents from './application_detail_components/ApplicationDetailComponents'
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

class ApplicationDetail extends Component {
    constructor(){
        super();
        
        this.state = {
            radioValue: '0',
            targetName: '',
            application : ''
        }
    }

    onClickRadio = (e) =>{
        this.setState({
            radioValue : e.currentTarget.value
        })
    }
    setRadioValue = (value) =>{
        this.setState({
            radioValue : value
        })
    }

    render(){
        var app = ''
        for(var i = 0; i<this.props.apps.length;i++){
            if(this.props.apps[i].applicationID === this.props.applicationID){
                app = this.props.apps[i]
            }
        }

        const radioValue =    
        [ 
        { name: 'All', value: '0' },
        { name: 'Events', value: '1' },
        { name: 'Notes', value: '2' },
        { name: 'Contacts', value: '3' },
        { name: 'Conversational Histories', value: '4' },
        { name: 'Checklists', value: '5' },
        ]
        
        return(
            <div>
            <ButtonGroup toggle className = "sypp-applicationList-radio-container">
                {radioValue.map((radio, idx) => (
                    <ToggleButton
                    className={"sypp-colorChange2 sypp-activeChange sypp-hoverChange sypp-text2 sypp-applicationList-margin"}
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={this.state.radioValue === radio.value}
                    onChange={(e) => this.onClickRadio(e, this.state.radioValue)}
                    >
                    <div className = "sypp-applicationList-radio-padding" name = {radio.name} value = {radio.value}>
                        {radio.name}
                    </div>
                    </ToggleButton>
                ))}
            </ButtonGroup>
            {
                !this.props.extended?
                <div > 
                    <ApplicationDetailComponents setRadioValue = {this.setRadioValue} applicationID = {this.props.applicationID} radioValue = {this.state.radioValue} applicationDetail = {app} extended = {this.props.extended}/>
                </div>:
                <div >
                    <ApplicationDetailComponents setRadioValue = {this.setRadioValue} applicationID = {this.props.applicationID} radioValue = {this.state.radioValue} applicationDetail = {app} extended = {this.props.extended}/>
                </div>
            }
            
        </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationDetail)