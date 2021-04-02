import React, { Component } from 'react';
import ProgressBar from './progress/ProgressBar'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './progress/Progress.css'
import './progress/ProgressBar.scss'

import './ApplicationList.scss'
// import Rating from "@material-ui/lab/Rating";
 import Rating from 'react-rating';
import {setApps} from './../../redux/application-reducer/applicationAction'
import {connect} from 'react-redux'
import 'font-awesome/css/font-awesome.min.css';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



const mapStatetoProps = state => {
    return{
        apps: state.application.applications,
        filteredProgress: state.filteredProgress.applications,
        selectedTitle: state.filteredProgress.selectedTitle
    }
}
const mapDispatchToProps= dispatch =>{
    return {
        setApps: (applications) => dispatch(setApps(applications)),
    }
}


export class Progress extends Component{
    constructor(){
        super();
        this.handleMouseHover = this.handleMouseHover.bind(this);

        this.state =  {
            searchField:'',
            isHovering : false,
        }
    }
    handleMouseHover(){
        this.setState(this.toggleHoverState);
    }
    toggleHoverState(state) {
        return{
            isHovering: !state.isHovering,
        };
    }
    //UID, APP ID, TASK use post call
    //return task with id
    onClickIsFavorite = (applicationID) =>{
        var apps = this.props.apps

        for(var i=0; i<apps.length;i++){
            if(apps[i].applicationID+"" === applicationID+""){
                apps[i].detail.isFavorite = !apps[i].detail.isFavorite
                break;
            }
        }
        this.props.setApps(apps)
        this.setState({})
    }
    //mid task add, need to make fetch call
    onClickAdd = (applicationID, title, date, isVisible) => {
        const apps = this.props.apps
        apps.map((data) => {
            if(data.applicationID === applicationID){
                data.tasks = data.tasks.concat({
                    time: date,
                    title: title,
                    isVisible : isVisible,
                    status: false
                })
            }
        })
        this.props.setApps(apps)
        this.setState({})
    }

    onSearchChange = (e) =>{
        this.setState({
            searchField: e.target.value
        })
        console.log(this.state.searchField)
    }
    onClickDelete = () =>{
        console.log("trigger Trash Can")
    }

    render(){
        const searchFilteredProgress = this.props.filteredProgress.filter(application => {
            return (application.detail.companyName.toLowerCase().includes(this.state.searchField.toLowerCase())||application.detail.positionName.toLowerCase().includes(this.state.searchField.toLowerCase()) )
        })

        return(
            <div  style = {{height : '100%'}}>
            <div className ="sypp-searchBox-container">
            <input 
            className ="sypp-applicationlist-searchBox"
            type='search' 
            placeholder = '  Search application'
            onChange = {e => this.onSearchChange(e)}
            value = {this.state.searchField}
            />
            </div>
            {this.props.selectedTitle !== ""? <div className ="sypp-selectedTitle">{this.props.selectedTitle}</div>:undefined}
            <div className = "sypp-task-sortby">Testing</div>
            <div className = "sypp-taskTitles">
                <div className="sypp-taskEntity">Apply</div>
                <div className="sypp-taskEntity">Task</div>
                <div className="sypp-taskEntity">Result</div>
            </div>
                <div className = "sypp-applicationList-container" style={this.props.extended?{overflowY: 'scroll', height: '80%'}:{overflowY: 'scroll', height: '75%'}}>
                {
                (searchFilteredProgress.length > 0)?
                searchFilteredProgress.map((data) => (
                        <div className = "sypp-progress-all sypp-trashIcon-Hover">
                            <div className = "sypp-starContainer">
                            <Rating className ="sypp-starIcon" applicationName = {data.applicationID} stop={1} initialRating = {data.detail.isFavorite?1:0} onClick = {() => this.onClickIsFavorite(data.applicationID)}
                            emptySymbol="fa fa-star-o starSize starIcon"
                            fullSymbol = "fa fa-star starSize starIcon"
                                />
                            </div>
                                <div className = "sypp-application-name" onClick = {() => this.props.onClickProgressAll(data.applicationID)}>
                                <div className = "sypp-appilication-name-container" >
                                    <div className = "sypp-progress-company"  >{data.detail.companyName}</div>
                                    <FontAwesomeIcon className = "sypp-trashIcon sypp-trashIcon-Hover" icon={faTrashAlt} onClick = {this.onClickDelete}/>
                                </div>
                                <div className = "sypp-progress-position" >{data.detail.positionName}</div>
                                </div>
                            <ProgressBar applicationID = {data.applicationID} applied = {data.applied} dates = {data.tasks} details = {data.detail.status[0]} onClickAdd = {this.onClickAdd}/>
                        </div>
                        )):undefined
                }
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Progress);