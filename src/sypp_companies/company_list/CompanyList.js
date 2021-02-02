import React, { Component } from 'react';
import Rating from 'react-rating';

import './../../sypp_applications/application_add_application/Modalbox.css'
import './CompanyList.scss'
import {setCompany} from './../../redux/company-reducer/companyAction'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';




const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
}
const mapDispatchToProps= dispatch =>{
  return {
      setCompany: (companies) => dispatch(setCompany(companies))
  }
}


export class CompanyList extends Component{
    constructor(){
        super();
        this.state =  {
            searchField:'',
            show: false,
            companyName : ''
        }
      }
      onChangeCompanyName = (e) =>{
        this.setState({
          companyName : e.target.value
        })
      }
      onSearchChange = (e) =>{
        this.setState({
            searchField: e.target.value
        })
        console.log(this.state.searchField)
      }

      onClickIsFavorite = (companyID) =>{
        var companies = this.props.companies

        for(var i=0; i<companies.length;i++){
            if(companies[i].companyID+"" === companyID+""){
              companies[i].detail.isFavorite = !companies[i].detail.isFavorite
                break;
            }
        }
        this.props.setCompany(companies)
        this.setState({})
    }
    handleClose = () =>{
      this.setState({
        show: false
      })
    }
    handleShow = () =>{
      this.setState({
        show:true
      })
    }
  
   

    render(){
        const searchFilteredProgress = this.props.companies.filter(company => {
            return (company.detail.companyName.toLowerCase().includes(this.state.searchField.toLowerCase()))
          })
        return(
            <div className ="sypp-CompanyList-All-Container">
            <div className ="sypp-searchBox-container">
            <input 
            className ="sypp-company-searchBox"
            type='search' 
            placeholder = '  Search company'
            onChange = {e => this.onSearchChange(e)}
            value = {this.state.searchField}
            />
            </div>
            <div className = "sypp-company-sortby">
              Testing
            </div>
            <div className = "sypp-CompanyList-container" style={this.props.extended?{overflowY: 'scroll', height: '650px'}:{overflowY: 'scroll', height: '470px'}}>
            {
              (searchFilteredProgress.length > 0)?
              searchFilteredProgress.map((data) => (
                <div className = "sypp-Company-container"  >
                  <Rating className ="sypp-starIcon" companyName = {data.companyID} stop={1} initialRating = {data.detail.isFavorite?1:0} onClick = {() => this.onClickIsFavorite(data.companyID)}
                  emptySymbol="fa fa-star-o starSize starIcon"
                  fullSymbol = "fa fa-star starSize starIcon"
                  />
                <div className = "sypp-CompanyList" onClick = {() => this.props.onClickCompany(data.companyID)}>{data.detail.companyName}</div>
                </div>
              )):undefined
            }
            </div>
            <div onClick = {this.handleShow} className = {"sypp-newcompany-button"}>
                <div className = "sypp-newapp-button-plus">+</div>
                <div className = "sypp-newapp-button-body">New Company</div>
            </div>
            <Modal
            show = {this.state.show}
            onHide={this.handleClose} 
            centered
            dialogClassName = "sypp-ModalMain"
            >
              <div className = "sypp-Modal-container">
              <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
              <div className = "sypp-addcompany-container">
                <div className = "sypp-addcompany-title">Which company would you like to add?</div>
                <input
                        className ="sypp-modal-input"
                        placeholder="Company Name"
                        onChange={e => this.onChangeCompanyName(e)}
                        value={this.state.companyName}
                />
                </div>
                  <button className ="sypp-company-button-next">
                         Save
                  </button>
              </div>
            </Modal>
          </div>
        )
    }

}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyList)