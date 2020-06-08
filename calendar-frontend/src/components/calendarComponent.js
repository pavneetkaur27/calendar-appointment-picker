import React, { Component } from 'react'
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddAppointment from './AddAppointmentModal';
import BookedAppointment from './BookedAppointmentModal';
import { fetchAppointements } from '../actions/calendarAction';
import Loader from './shared/Loader';


class CalendarComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            weekdays : moment.weekdays(), //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
            months : moment.months(),
            timeslots : [ {time : 12, meridian : "AM"},{time : 1, meridian : "AM"},{time : 2, meridian : "AM"},{time : 3, meridian : "AM"},{time : 4, meridian : "AM"},{time : 5, meridian : "AM"},{time : 6, meridian : "AM"},{time :7, meridian : "AM"},{time : 8, meridian : "AM"},{time : 9, meridian : "AM"},{time : 10, meridian : "AM"},{time : 11, meridian : "AM"},{time : 12, meridian : "PM"},{time : 1, meridian : "PM"},{time : 2, meridian : "PM"},{time : 3, meridian : "PM"},{time : 4, meridian : "PM"},{time : 5, meridian : "PM"},{time : 6, meridian : "PM"},{time : 7, meridian : "PM"},{time : 8, meridian : "PM"},{time : 9, meridian : "PM"},{time : 10, meridian : "PM"},{time : 11, meridian : "PM"}],
            addappointmentmodal : false,
            bookedappointmentmodal : false
        }
    }


    componentDidMount(){
        this.props.fetchAppointements();
    }

    handleModalToggle = (val) => {
        return this.setState({ 
          addappointmentmodal : val ,
          bookedappointmentmodal : val
        }); 
    }

    addAppointment(date , timeslot){
        var obj = {
            timeslot : timeslot ,
            date     : date
        }        
        this.setState({
            addappointmentmodal : true,
            appointed_date : obj
        })
    }

    openBookedAppointment(date,timeslot,uname){
        console.log(uname);
        var obj = {
            timeslot : timeslot ,
            date     : date,
            uname    : uname
        }        
        this.setState({
            bookedappointmentmodal : true,
            appointed_date : obj
        })
    }
  
    render() {
        console.log(this.props);

        let daysToBeAppointed = [];
        var dateObj = new Date();
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var monthIndex = dateObj.getUTCMonth();
        var names = this.state.weekdays;
        var date = new Date(year, monthIndex, day);

        while (date.getMonth() == monthIndex) {              // current month dates
            daysToBeAppointed.push({ 
                weekday : names[date.getDay()],
                day     : date.getDate(),
                month  : this.state.months[monthIndex]
            });
            date.setDate(date.getDate() + 1);
        }
        var nextmonthdate = new Date(year, monthIndex + 1, 1);
        while (nextmonthdate.getMonth() == (monthIndex+1) ) {            // next month dates
            daysToBeAppointed.push({ 
                weekday : names[nextmonthdate.getDay()],
                day     : nextmonthdate.getDate(),
                month  : this.state.months[monthIndex +1]
            })
            nextmonthdate.setDate(nextmonthdate.getDate() + 1);
        }
       
        if(this.props.calPanel.appointments){  
            return (
                <div  className="calendar-main-section">
                    {this.state.addappointmentmodal ? <AddAppointment open={this.state.addappointmentmodal} handleModalToggle={this.handleModalToggle} appointmentdate={this.state.appointed_date} /> : null }
                    {this.state.bookedappointmentmodal ? <BookedAppointment open={this.state.bookedappointmentmodal} handleModalToggle={this.handleModalToggle} appointmentdate={this.state.appointed_date} /> : null }
                    <div className="calendar-card-container">
                        <Paper className="paper">
                            <Table className="table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="table-cell-heading" align="center" style={{width: 40}} ></TableCell>
                                        {daysToBeAppointed.length > 0 ?  daysToBeAppointed.map((date) => 
                                            <TableCell key={date.weekday + date.day + date.month } className="table-cell-heading" align="center">
                                                {date.weekday} <br/> <div style={{fontSize: 22,margin: '0px 0px 12px 0px'}}>{date.day} {date.month}</div>
                                            </TableCell>
                                        )
                                            : null
                                        }
                                    </TableRow>
                                </TableHead>                         
                                <TableBody >
                                    {this.state.timeslots.map((timeslot) => 
                                        <TableRow key={timeslot.time +timeslot.meridian}>
                                            <TableCell  className="table-cell-heading" style={{minWidth:120,padding: '30px 16px 30px 60px' }} align="center">
                                                {timeslot.time + " " +timeslot.meridian }
                                            </TableCell>
                                            {daysToBeAppointed.length > 0 ? 
                                                daysToBeAppointed.map((date) => 
                                                    <TableCell key={date.weekday + date.day + date.month }   className="table-cell" align="left">
                                                        {!this.props.calPanel.appointments[date.day +"-"+ date.month +"-"+timeslot.time+"-"+timeslot.meridian] ?
                                                                <div className="slot-section appointement-disabled-section">
                                                                    <div style={{fontSize: 10,fontWeight:600}}>{timeslot.time + " " +timeslot.meridian }</div>
                                                                    Blocked
                                                                </div>
                                                            : (this.props.calPanel.appointments[date.day +"-"+ date.month +"-"+timeslot.time+"-"+timeslot.meridian].status == 1  ?
                                                                    <div className="slot-section appointement-open-section" onClick={() => this.addAppointment(date, timeslot)}>
                                                                        <div style={{fontSize: 10,fontWeight:600}}>{timeslot.time + " " +timeslot.meridian }</div>
                                                                        Open
                                                                    </div>
                                                                :
                                                                (this.props.calPanel.appointments[date.day +"-"+ date.month +"-"+timeslot.time+"-"+timeslot.meridian].status == 2  ?
                                                                    <div className="slot-section appointement-booked-section" onClick={() => this.openBookedAppointment(date, timeslot, this.props.calPanel.appointments[date.day +"-"+ date.month +"-"+timeslot.time+"-"+timeslot.meridian].user_name)}>
                                                                        <div style={{fontSize: 10,fontWeight:600}}>{timeslot.time + " " +timeslot.meridian }</div>
                                                                            {this.props.calPanel.appointments[date.day +"-"+ date.month +"-"+timeslot.time+"-"+timeslot.meridian].user_name}
                                                                    </div>
                                                                :
                                                                    <div className="slot-section appointement-disabled-section">
                                                                        <div style={{fontSize: 10,fontWeight:600}}>{timeslot.time + " " +timeslot.meridian }</div>
                                                                        Blocked
                                                                    </div>
                                                                )
                                                            )
                                                        }
                                                    </TableCell>
                                                    
                                                )
                                                : null
                                            }
                                        </TableRow>
                                    )}
                                </TableBody>
                                
                            </Table>
                        </Paper>
                    </div>
                </div>  
            );
        }else{
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
  return {
    calPanel: state.calendarReducer
  }
}


const mapDispatchToProps = {fetchAppointements};

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(CalendarComponent));