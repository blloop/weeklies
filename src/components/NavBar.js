import React, { Component } from 'react';
import AddEventDialog from './AddEventDialog';
import SettingsDialog from './SettingsDialog';
import Modal from './Modal';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: null
        }
    }

    openAddEvent() {
        // Check if any other dialog is open
        if (this.state.openDialog) {
            return;
        }
        let newState = {
            openDialog: 'events'
        }
        this.setState(newState);
    }

    openSettings() {
        // Check if any other dialog is open
        if (this.state.openDialog) {
            return;
        }
        let newState = {
            openDialog: 'settings'
        }
        this.setState(newState);
    }

    closeModal() {
        let newState = {
            openDialog: null
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className='navbar' >
                <button
                    onClick={this.openAddEvent.bind(this)}>
                    Add Event
                </button>
                <button
                    onClick={this.openSettings.bind(this)}>
                    Settings
                </button>

                <Modal
                    closeModal={this.closeModal.bind(this)}
                    openModal={this.state.openDialog !== null}>
                </Modal>
                <AddEventDialog
                    eventAdd={this.props.eventAdd}
                    showDialog={this.state.openDialog === 'events'}>
                </AddEventDialog>
                <SettingsDialog
                    eventClear={this.props.eventClear}
                    showDialog={this.state.openDialog === 'settings'}>
                </SettingsDialog>
            </div >
        )
    }

}

export default NavBar;