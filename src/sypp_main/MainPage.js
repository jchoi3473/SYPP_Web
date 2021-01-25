import React, { Component, useState } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ApplicationsMain from './../sypp_applications/ApplicationsMain'
import './radio/RadioButtons.scss';
import CalendarMain from './../sypp_calendar/CalendarMain'
import './MainPage.scss'

function MainPage() {
    const [radioValue, setRadioValue] = useState('0');
    const radios =     
    [ 
        { name: 'Calendar', value: '0' },
        { name: 'Applications', value: '1' },
        { name: 'Companies', value: '2' },
        { name: 'Templates', value: '3' },
    ];

    const radioChange = (e) => {
      setRadioValue(e.currentTarget.value)
    }

    const display = () =>{
      if(radioValue === '0'){
          return (
              <div className = "sypp-calendar-mainPage">
                <CalendarMain/>
              </div>
          )
      }else if(radioValue === '1'){
        return(
            <div>
              <ApplicationsMain />
            </div>
        )
      }     
      else if(radioValue === '2'){
        return(
            <div>

            </div>
        )
      }  else if(radioValue === '3'){
        return(
            <div>
            </div>
        )
      }     
  }


    return (
      <div className = "sypp-mainPage-radio-container">
        <ButtonGroup toggle className ="sypp-mainRadio-container">
          {radios.map((radio, idx) => (
              <div>
                <ToggleButton
                className={"sypp-colorChange sypp-activeChange sypp-hoverChange sypp-text1 sypp-twoButtons"}
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                >
                {radio.name}
                </ToggleButton>
            </div>
          ))}
        </ButtonGroup>
        {display()}
      </div>
    );
  }
  export default MainPage;

