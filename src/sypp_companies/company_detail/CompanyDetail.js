import React, {Component} from 'react'
import { connect } from "react-redux";
const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
  }

class CompanyDetail extends Component{
    render(){
        return(
            <div>
                
            </div>
        );
    }
}
export default connect(mapStatetoProps,null)(CompanyDetail)