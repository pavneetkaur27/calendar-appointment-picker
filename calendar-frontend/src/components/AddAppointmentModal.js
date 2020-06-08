import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import Close from '@material-ui/icons/Close';
import {fetchAppointements, addUserAppointmennt} from '../actions/calendarAction';


const USER_DETAIL_VALUE ={
    USER_NAME   : 1,
    USER_EMAIL  : 2,
}

class AddAppointment extends Component {

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

    validateAddUserButton = () =>{
        return !(this.state.name != '' && this.state.email != '' )
    }


    handleEventChange(state_value,e){
        var value =  e.target.value;

        switch (state_value) {
            case 1:
                this.setState({
                    name : value
                })
                break;
            
            case 2:
                this.setState({
                    email : value
                })
                break;
           

            default:
                break;
        }   
    }

    addUserAppointmennt = () =>{
        var allmonths = moment.months();
        var meridian  = ["AM", "PM"];
        var data = {
            name     : this.state.name,
            email    : this.state.email,
            date     : this.props.appointmentdate &&  this.props.appointmentdate.date ? this.props.appointmentdate.date.day : null,
            month    : this.props.appointmentdate &&  this.props.appointmentdate.date ? allmonths.indexOf(this.props.appointmentdate.date.month)+1  : null,
            time     : this.props.appointmentdate &&  this.props.appointmentdate.timeslot ? this.props.appointmentdate.timeslot.time : null,
            time_meridian     : this.props.appointmentdate &&  this.props.appointmentdate.timeslot ? meridian.indexOf(this.props.appointmentdate.timeslot.meridian) +1 : null,
        } 
       
        this.props.addUserAppointmennt(data)
            .then(res =>{   
                if(res && res.data && res.data.success){
                    this.props.handleModalToggle(false);
                    this.props.fetchAppointements();
                }
            });
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
                    <DialogTitle className="modal-add-user-title" >
                        <span className="modal-add-user-txt">Add Appointment</span>
                        <Close className="modal-close-icon" onClick={this.closeModal} />
                    </DialogTitle>
                    <DialogContent  className="modal-dialog-content">
                        <div >
                            <input type="text" className="modal-input-field"  placeholder="Name" value={this.state.name} onChange={(e) => this.handleEventChange(USER_DETAIL_VALUE.USER_NAME,e)}  />
                            <input type="text" className="modal-input-field"  placeholder="Email" value={this.state.email} onChange={(e) => this.handleEventChange(USER_DETAIL_VALUE.USER_EMAIL,e)}  />
                        </div>
                       <button className="btn modal-add-user-btn"  style={{marginTop:35}}  disabled={this.validateAddUserButton()} onClick={this.addUserAppointmennt}>Add Appointment</button>
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
  
const mapDispatchToProps = {fetchAppointements, addUserAppointmennt};
  

export default connect(mapStateToProps,mapDispatchToProps)(AddAppointment)