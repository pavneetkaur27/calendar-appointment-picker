const initialState = {
    loading     : false,
}

export default function (state = initialState, action) {
    switch (action.type) {

        case 'START_LOADER' : {
            return {...state,
                loading : true
            }
        }
        
        case 'STOP_LOADER' : {
            return {...state,
                loading : false
            }
        }

        case "SHOW_NOTIFY": {
            return {
                ...state,
                data: {
                    type: action.payload.type,
                    show: true,
                    message: action.payload.message
                }
            }
        }

        case "HIDE_NOTIFY": {
            return {
                ...state,
                data: {
                    show: false,
                }
            }
        }

        case "FETCHED_APPOINTEMENTS":
            return {
                ...state,
                appointments: action.payload.appointments,
            }

      
        
        default:
            return state;
    }
}