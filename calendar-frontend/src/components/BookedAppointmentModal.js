import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import Close from '@material-ui/icons/Close';
import {} from '../actions/calendarAction';


const USER_DETAIL_VALUE ={
    USER_NAME   : 1,
    USER_EMAIL  : 2,
}

class BookedAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name    : '',
            email   : ''
        }
    }

    closeModal = () => {
        this.props.handleModalToggle(false);
    }



    Reschedule = () =>{
        alert("Reschedule button");
    }

    cancelAppointment = () => {
        alert("Cancel button");
    }

    render() {                                                                                  
        console.log(this.props);
        return (
            <div className="modal-container">
                <Dialog
                  maxWidth={'sm'}     
                    fullScreen = {false}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    open={this.props.open}
                    onClose={this.closeModal}    
                    
                >
                    <DialogTitle style={{minWidth: 310}} className="modal-add-user-title" >
                        <span className="modal-add-user-txt">Booked Appointment</span>
                        <Close className="modal-close-icon" onClick={this.closeModal} />
                    </DialogTitle>
                    <DialogContent  className="modal-dialog-content">
                        <div >
                            <div className="modal-user-name">{this.props.appointmentdate.uname}</div>
                                <div style={{fontWeight: 600}}> {this.props.appointmentdate.date.weekday}, {this.props.appointmentdate.date.month} {this.props.appointmentdate.date.day} at {this.props.appointmentdate.timeslot.time} {this.props.appointmentdate.timeslot.meridian} </div>
                            <div style={{display: 'inline-flex'}}>
                                <button className="btn modal-add-user-btn"  style={{marginTop:35}}  onClick={this.Reschedule}>Reschedule</button>
                                <button className="btn modal-cancel-appointment-btn"  style={{marginTop:35}}  onClick={this.cancelAppointment}>Cancel</button>
                            </div>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
        )
   
    }
}


const mapStateToProps = state => {
    return {
        calPanel: state.calendarReducer
    }
}
  
const mapDispatchToProps = {};
  

export default connect(mapStateToProps,mapDispatchToProps)(BookedAppointment)