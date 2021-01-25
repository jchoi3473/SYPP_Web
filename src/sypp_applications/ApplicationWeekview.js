import React, {Component} from 'react';
import Moment from 'moment';

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

class ApplicationWeekview extends Component {
    
    dateDisplay = () => {
        var date = new Date();

        return (
            <div className = "sypp-weeklyDeadline-container">
                <div className = "sypp-weeklyDealine-individual">
                    {Moment(addDays(date,0)).format('(MMM DD)')}
                </div>
                <div className = "sypp-weeklyDealine-individual">
                    {Moment(addDays(date,1)).format('(MMM DD)')}
                </div>
                <div className = "sypp-weeklyDealine-individual">
                    {Moment(addDays(date,2)).format('(MMM DD)')}
                </div>
                <div className = "sypp-weeklyDealine-individual">
                    {Moment(addDays(date,3)).format('(MMM DD)')}
                </div>
                <div className = "sypp-weeklyDealine-individual">
                    {Moment(addDays(date,4)).format('(MMM DD)')}
                </div>
                <div className = "sypp-weeklyDealine-individual">
                    {Moment(addDays(date,5)).format('(MMM DD)')}
                </div>
                <div className = "sypp-weeklyDealine-individual">
                    {Moment(addDays(date,6)).format('(MMM DD)')}
                </div>
            </div>
        )
    }
    render(){
        return(
            <div>
                {this.dateDisplay()}
            </div>
        );
    }
}
export default ApplicationWeekview