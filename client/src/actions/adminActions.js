import axios from "axios/index";
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
} from './adminTypes';

export function addMovieHall(hallData){
    return dispatch => {
console.log("inside add movie Hall data",hallData);
        return axios.post('/admin/addMovieHall',hallData).then((response)=>{
			console.log("inside add movie Hall",response.data);
            dispatch(addMvHall(response.data));
        });
    }
}

export function searchMovieHall(searchData){
    return dispatch => {
        console.log("inside search movie Hall data",searchData);
        return axios.post('/admin/searchMovieHall',{searchStr : searchData}).then((response)=>{
            dispatch(searchMvHall(response.data));
    });
    }
}

export function updateMovieHall(hallData){
    return dispatch => {
        return axios.post('admin/updateMovieHall',hallData).then((response)=>{
            dispatch(updateMvHall(response.data));
    });
    }
}

export function deleteMovieHall(hallData){
    return dispatch => {
        return axios.post('admin/deleteMovieHall',hallData).then((response)=>{
            dispatch(deleteMvHall(response.data));
        });
    }
}

export function addMvHall(values){
    return{
        type:"ADD_HALL",
        payload:values
    }
}
export function searchMvHall(values){
    return{
        type:"SEARCH_HALL",
        payload:values
    }
}
export function updateMvHall(values){
    return{
        type:"UPDATE_HALL",
        payload:values
    }
}
export function deleteMvHall(values){
    return{
        type:"DELETE_HALL",
        payload:values
    }
}
/*bills start*/
export const latest10Bills = (userId) => async dispatch => {
    console.log("krutika");
    const res = await axios.get('/adminSqlRoutes/latest10Bills',
        { params: {userId: userId}});
    console.log("response data: " + JSON.stringify(res));
    dispatch({ type: BILLS, payload: res.data.result });
};

export const searchByDate = (date, userId) => async dispatch => {
    console.log("query data for date: " + date);
    const res = await axios.get('/adminSqlRoutes/billSearch',
        { params:
                {
                    date: date,
                    userId: userId
                }
        });
    dispatch({ type: BILLS, payload: res.data.result });
};

export const searchByMonth = (month, userId) => async dispatch => {
    console.log("query data for month: " + month);
    const res = await axios.get('/adminSqlRoutes/billSearch',
        { params:
                {
                    month: month,
                    userId: userId
                }
        }
    );
    dispatch({ type: BILLS, payload: res.data.result });
};

export const getBill = (billingId) => async dispatch => {
    const res = await axios.get('/adminSqlRoutes/getBill',
        { params: { billingId: billingId }});

    dispatch({ type: BILL_DETAILS, payload: res.data.result });
};

export const getRevenueByMovie = (movieId) => async dispatch => {
    const res = await axios.get('/adminSqlRoutes/getRevenueByMovie',
        { params: { movieId: movieId }});
    dispatch({ type: REVENUE, payload: res.data.result });
};

export const getRevenueByHall = (hallId) => async dispatch => {
    const res = await axios.get('/adminSqlRoutes/getRevenueByHall',
        { params: { hallId: hallId }});
    dispatch({ type: REVENUE, payload: res.data.result });
};

/*bills end*/
/*
* graph actions start*/
export const updatePageClick = (pageName) => async dispatch => {
    const res = await axios.post('/graphs/updatePageClick', {'page': pageName});
};

export const getPageClicks = () => async dispatch => {
    const res = await axios.get('/graphs/getPageClicks');
    dispatch({ type: PAGE_CLICKS, payload: res.data.result });
};

export const updateMovieClick = (movieObject) => async dispatch => {
    const res = await axios.post('/graphs/updateMovieClick', movieObject);
};

export const getMovieClicks = () => async dispatch => {
    const res = await axios.get('/graphs/getMovieClicks');
    dispatch({ type: MOVIE_CLICKS, payload: res.data.result });
};

export const getTop10HallsWithMaxRevenue = () => async dispatch => {
    const res = await axios.get('/adminSqlRoutes/top10HallsWithMaxRevenue');
    dispatch({ type: TOP10_HALLS_WITH_MAX_REVENUE, payload: res.data.result });
};

export const getTop10MovieRevenues = () => async dispatch => {
    const res = await axios.get('/adminSqlRoutes/top10MovieRevenues');
    dispatch({ type: TOP10_MOVIE_REVENUES, payload: res.data.result });
    console.log("top 10 movies with its revenue",res.data.result);
};

export const getCityWiseRevenuePerYearForMovie = (movieId) => async dispatch => {
    const res = await axios.get('/adminSqlRoutes/cityWiseRevenuePerYearForMovie',
        {params:
                {
                    movieId: movieId
                }
        });
    dispatch({ type: CITYWISE_REVENUE_PERYEAR_FOR_MOVIE, payload: res.data.result });
    console.log("citiwise----------------",res.data.result)
};
export const getReviewsOnMovies = () => async dispatch => {
    const res = await axios.get('/adminSqlRoutes/reviewsOnMovies');
    dispatch({ type: REVIEWS_ON_MOVIES, payload: res.data.result });
};
/*
* graph actions end*/