import React, { Component } from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
import ToggleAM from './ToggleAM';

class AddEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog,
            inputText: '',
            dayOfWeek: 'Sunday',
            newHour: 0,
            isZero: true,
            isAM: false,
            useMilitary: false
        }
    }

    addToList() {
        let newEvent = {
            title: this.state.inputText,
            day: this.state.dayOfWeek,
            hour: this.state.newHour,
            min: (this.state.isZero ? 0 : 30)
        };
        this.props.eventAdd(newEvent);
        let newState = {
            ...this.state,
            inputText: ''
        }
        this.setState(newState)
    }

    updateText = (event) => {
        let newState = {
            ...this.state,
            inputText: event.target.value
        }
        this.setState(newState);
    };

    changeDay = (day) => {
        let newState = {
            ...this.state,
            dayOfWeek: day
        }
        this.setState(newState);

    }

    changeHour = (hour) => {
        let newState = {
            ...this.state,
            newHour: hour,
            isAM: hour > 11
        }
        this.setState(newState);
    }

    changeMin = () => {
        let newState = {
            ...this.state,
            isZero: !this.state.isZero
        }
        this.setState(newState);
    }

    changeAM = () => {
        let newState = {
            ...this.state,
            isAM: !this.state.isAM
        }
        this.setState(newState);
        console.log("CHANGEAM" + this.state.isAM);
    }

    render() {
        return (
            <>
                {this.props.showDialog &&
                    <div className='addevents overlay rounded'>
                        <button
                            onClick={this.props.closeModal}
                            className='close-button'>
                            &#10005;
                        </button>
                        <div className='text-container'>
                            <p> Name of Event: </p>
                            <input
                                onChange={this.updateText}
                                value={this.state.inputText}>
                            </input>
                        </div>
                        <div className='row-items'>
                            <DayDropdown
                                changeDay={this.changeDay}
                                dayOfWeek={this.state.dayOfWeek}>
                            </DayDropdown>
                            <div style={{ width: '12px' }}></div>
                            <HourDropdown
                                changeHour={this.changeHour}
                                newHour={this.state.newHour}
                                useMilitary={this.state.useMilitary}>
                            </HourDropdown>
                            <MinDropdown
                                isZero={this.state.isZero}
                                changeMin={this.changeMin}>
                            </MinDropdown>
                            <ToggleAM
                                changeAM={this.changeAM}
                                isAM={this.state.isAM}
                                useMilitary={this.state.useMilitary}>
                            </ToggleAM>
                        </div>
                        <button
                            className='contrast add-button'
                            onClick={this.addToList.bind(this)}>
                            Add Event
                        </button>
                    </div>
                }
            </>
        )
    }

}

export default AddEventDialog;