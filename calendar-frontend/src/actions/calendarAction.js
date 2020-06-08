import axios from "axios";
import {API_ENDPOINT} from '../constants';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const startLoader = (dispatch,a)=>{
    return dispatch({ type: "START_LOADER" });
}
  
const stopLoader = (dispatch)=>{
    return dispatch({ type: "STOP_LOADER" });
}


export const hideAlert =() => dispatch =>{
  dispatch({
    type: "HIDE_NOTIFY", payload: {}
  });
}

const handleResponseErrorCase1 = (data)=>{
  console.log(data);
  if(data && data.code){
    if(data.code == 401 || data.code == 498){
      cookies.remove("ou_at",{path : "/"});
      return window.location.replace('/');
    }else if(data.code == 404 && data.err ==  "Organisation not found"){
      return window.location.replace('/cmpprofile');
    }
  }
}

export const fetchAppointements = () => dispatch => {
  
  var requestObj = {
    method: 'POST',
    url: API_ENDPOINT + '/appointment/gt_apt',
  };
  startLoader(dispatch,1);
  
  axios(requestObj).then((response) => {
    stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      dispatch({
        type: "FETCHED_APPOINTEMENTS", 
        payload: {
          appointments : response.data.data.appointments
        }
      })
    } else {
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
    }
  })
  .catch((err) => {
    var err_msg = "Something went wrong";
    if (err.response && err.response.statusText) {
      err_msg = err.response.statusText;
    }
    if(err.response && err.response.data && err.response.data.err){
      err_msg = err.response.data.err;
    }
    if(err && err.response && err.response.data){
      handleResponseErrorCase1(err.response.data || {})
    }
    stopLoader(dispatch);
    return dispatch({
      type: "SHOW_NOTIFY", payload: {
        type: 'error',
        message: err_msg,
        dispatch: dispatch
      }
    });
  })
}


export const addUserAppointmennt = (data) => dispatch => {
  
  var requestObj = {
    method: 'POST',
    data: {
      name     : data.name,
      email    : data.email,
      date     : data.date,
      month    : data.month,
      time     : data.time,
      time_meridian   : data.time_meridian
    },
    url: API_ENDPOINT + '/appointment/ad_user_apt',
   
  };
  startLoader(dispatch,1);
  
  return axios(requestObj).then((response) => {
    stopLoader(dispatch);
    if (response && response.data.success && response.data) {
      dispatch({
        type: "FETCHED_APPOINTEMENTS", 
        payload: {
          appointments : response.data.data.appointments
        }
      })
      return response;
    } else {
      return dispatch({
        type: "SHOW_NOTIFY", payload: {
          type: 'error',
          message: "Something went wrong",
          dispatch: dispatch
        }
      });
    }
  })
  .catch((err) => {
    var err_msg = "Something went wrong";
    if (err.response && err.response.statusText) {
      err_msg = err.response.statusText;
    }
    if(err.response && err.response.data && err.response.data.err){
      err_msg = err.response.data.err;
    }
    if(err && err.response && err.response.data){
      handleResponseErrorCase1(err.response.data || {})
    }
    stopLoader(dispatch);
    return dispatch({
      type: "SHOW_NOTIFY", payload: {
        type: 'error',
        message: err_msg,
        dispatch: dispatch
      }
    });
  })
}
