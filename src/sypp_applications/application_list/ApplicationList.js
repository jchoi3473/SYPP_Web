import React, {Component} from 'react';

import {setApps} from './../../redux/application-reducer/applicationAction'
import {connect} from 'react-redux'
import ApplicationListComponents from './ApplicationListComponents'
import ApplicationListProgress from './ApplicationListProgress'
import ModalBox from './../application_add_application/ModalBox'
import './../application_add_application/Modalbox.css'


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

class ApplicationList extends Component {

    constructor() {
        super();
        this.state = {
            applicationID : ''
        }
    }

    onChange = (value) => {
        console.log(value)
        var boolean = true;
        if (value == 1) {
            boolean = true;
        }
        else{
            boolean = false;
        }   
    }
    //yields the info about application detail to application detail section

    render(){
        const radioValue =    
        [ 
        { name: 'All', value: '0' },
        { name: 'Starred', value: '1' },
        ]
        const categoryDivided = () =>{
            var temp = []
            for(var i=0; i<this.props.apps.length; i++){
                for(var j=0; j<this.props.apps[i].detail.categories.length;j++){
                    if(!temp.includes(this.props.apps[i].detail.categories[j].type) && this.props.apps[i].detail.categories[j].suggestionsOrSeleceted.length>0){
                            temp = temp.concat(this.props.apps[i].detail.categories[j].type)}
                    }
            }
            for(var i=0;i<temp.length;i++){
                radioValue.push({
                    name : temp[i],
                    value: i+2+""
                })
            }
        }

        return(
            <div style = {{height : '100%'}}>
                {categoryDivided()}
                
                {/* <ApplicationListComponents options = {radioValue} onChange = {this.onChange}/> */}
                {console.log(radioValue)}
                <ApplicationListProgress options = {radioValue} onClickProgressAll = {this.props.onClickProgressAll} extended = {this.props.extended}/>
                <div className = 'sypp-modalButton'>
                    <ModalBox/>
                </div>
            </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationList)