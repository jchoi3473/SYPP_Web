import React, {Component} from 'react';

import {setApps} from './../../redux/application-reducer/applicationAction'
import {connect} from 'react-redux'
import ApplicationListComponents from './ApplicationListComponents'
import ApplicationListProgress from './ApplicationListProgress'
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
                for(var j=0; j<this.props.apps[i].Detail.Categories.length;j++){
                    if(!temp.includes(this.props.apps[i].Detail.Categories[j].Type) && this.props.apps[i].Detail.Categories[j].SuggestionsOrSeleceted.length>0){
                            temp = temp.concat(this.props.apps[i].Detail.Categories[j].Type)}
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
            <div>
                {categoryDivided()}
                <ApplicationListComponents options = {radioValue} onChange = {this.onChange}/>
                <ApplicationListProgress onClickProgressAll = {this.props.onClickProgressAll}/>
            </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationList)