import React, {Component} from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


import {setCompany} from './../../redux/company-reducer/companyAction'
import {connect} from 'react-redux'
import CompanyDetailComponents from './CompanyDetailComponents'
const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        setCompany: () => dispatch(setCompany()),
    }
}

class CompanyDetail extends Component {
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
        console.log(this.props.companyID)

        var company = ''
        for(var i = 0; i<this.props.companies.length;i++){
            if(this.props.companies[i].companyID === this.props.companyID){
                company = this.props.companies[i]
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
                <div> 
                    <CompanyDetailComponents setRadioValue = {this.setRadioValue} companyID = {this.props.companyID} radioValue = {this.state.radioValue} companyDetail = {company} extended = {this.props.extended}/>
                </div>:
                <div>
                    <CompanyDetailComponents setRadioValue = {this.setRadioValue} companyID = {this.props.companyID} radioValue = {this.state.radioValue} companyDetail = {company} extended = {this.props.extended}/>
                </div>
            }
            
        </div>
        );
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyDetail)