import {combineReducers} from 'redux'
import {
    BILLS,
    BILL_DETAILS,
    REVENUE,
    PAGE_CLICKS,
    MOVIE_CLICKS,
    TOP10_HALLS_WITH_MAX_REVENUE,
    TOP10_MOVIE_REVENUES,
    CITYWISE_REVENUE_PERYEAR_FOR_MOVIE,
    REVIEWS_ON_MOVIES
} from '../actions/adminTypes';

const initialState = {
    bills: [],
    billDetails: {},
    revenue: {},
    pageClicks: {},
    movieClicks: [],
    top10_halls_with_max_revenue: [],
    top10_movie_revenues: [],
    citywise_revenue_peryear_for_movie: [],
    reviewsOnMovies: [],
    hallData: {},
    message : ""
}

export const data = (state = initialState, action) =>{

    switch (action.type) {
        case "ADD_HALL":
            console.log("In reducer add hall",action.payload);
            state= {
                ...state,
                message:action.payload
            };
            break;
            console.log("inside ADD_HALL after setting",state);

        case "SEARCH_HALL":
            console.log("inside search hall reducer",action.payload);
            state= {
                ...state,
                hallData:action.payload,
                message : "searched"
            };
            console.log("Hall Data",state.hallData);
            break;
        case "UPDATE_HALL":
            console.log("inside update hall reducer",action.payload);
            state= {
                ...state,
                hallData : action.payload.hallData,
                message:action.payload.message
            };
            break;
        case "DELETE_HALL":
            console.log("inside delete hall reducer",action.payload);
            state= {
                ...state,
                hallData : action.payload.hallData,
                message:action.payload.message
            };
            break;
        case BILLS:
            state={
                ...state,
                bills: action.payload
            };
            break;

        case BILL_DETAILS:
            state={
                ...state,
                billDetails: action.payload
            };
            break;

        case REVENUE:
            state={
                ...state,
                revenue: action.payload
            };
            break;
        case PAGE_CLICKS:
            state={
                ...state,
                pageClicks: action.payload
            };
            break;

        case MOVIE_CLICKS:
            state={
                ...state,
                movieClicks: action.payload
            };
            break;

        case TOP10_HALLS_WITH_MAX_REVENUE:
            state={
                ...state,
                top10_halls_with_max_revenue: action.payload
            };
            break;

        case TOP10_MOVIE_REVENUES:
            state={
                ...state,
                top10_movie_revenues: action.payload
            };
            break;

        case CITYWISE_REVENUE_PERYEAR_FOR_MOVIE:
            state={
                ...state,
                citywise_revenue_peryear_for_movie: action.payload
            };
            break;

        case REVIEWS_ON_MOVIES:
            state={
                ...state,
                reviewsOnMovies: action.payload
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