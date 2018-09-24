import { FETCH_MOVIES } from '../actions/types';
import {combineReducers} from 'redux'

//
// export default function(state = {}, action) {
//   switch (action.type) {
//     case FETCH_MOVIES:
//       return action.payload || false;
//
//     default:
//       return state;
//   }
// }


export const data = (state =  {
    moviesList:[],
    hallsList:[],
    genreList:[],
    revenueList:[],
    userList:[],
    movieInfo:{}
}, action) =>{

    switch (action.type) {
        case "MOVIES_LIST":

            //console.log(JSON.stringify(action.payload));
            state= {
                ...state,
                moviesList:action.payload
            };
            break;
        case "HALLS_LIST":
            state= {
                ...state,
                hallsList:action.payload
            };
            break;
        case "GENRE_LIST":
            state= {
                ...state,
                genreList:action.payload
            };
            break;
        case "REVENUE_LIST":
            console.log("in revenue list"+JSON.stringify(action.payload));
            state= {
                ...state,
                revenueList:action.payload
            };
            break;

        case "MOVIE_INFO":
            console.log("in movie info"+JSON.stringify(action.payload));
            state= {
                ...state,
                movieInfo:action.payload
            };
            break;
        case "USER_LIST":
            console.log("in user list"+JSON.stringify(action.payload));
            state= {
                ...state,
                userList:action.payload
            };
            break;

        default:
            return state;
    }
    return state;
}
export default combineReducers({
    data
});