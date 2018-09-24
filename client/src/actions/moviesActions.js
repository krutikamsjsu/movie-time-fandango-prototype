import axios from "axios/index";


/*export const getMovies = () => async dispatch => {
    const res = await axios.get('/api/movies');

   // dispatch({ type: FETCH_MOVIES, payload: res.data });
};*/

export function getMovies(){
    var movieList = [];
    return dispatch => {
        return axios.get('/movies/getMovies').then((response)=>{
            dispatch(moviesList(response.data));
        });
    }
}

export function getHalls(){
    return dispatch => {
        return axios.get('/movies/getHalls').then((response)=>{
            dispatch(hallsList(response.data));
        });
    }
}

export function getGenreList(){
    return dispatch => {
        return axios.get('/movies/getGenreList').then((response)=>{
            dispatch(genreList(response.data));
        });
    }
}

export function getMoviesRevenue(hall_id){
    return dispatch => {
        return axios.get('/movies/getMoviesRevenue',{
            params: {hall_id: hall_id}
        }).then((response)=>{
            dispatch(revenueList(response.data));
        });
    }
}

export function getMovieDetails(movie_id){
    return dispatch => {
        return axios.get('/movies/getMovieDetails',{
            params: {movie_id: movie_id}
        }).then((response)=>{
            dispatch(movieInfo(response.data));
        });
    }
}

export function getBookedMovieUserList(booking_details){
    return dispatch => {
        return axios.get('/booking/getBookedMovieUserList',{
            params: {booking_details: booking_details}
        }).then((response)=>{
            dispatch(userList(response.data));
        });
    }
}

export function addMovie(movieDetails){
    return dispatch => {
        return axios.post('/movies/addMovie',movieDetails).then((response)=>{
            //dispatch();
        });
    }
}

export function rateNow(ratingDetails){
    return dispatch => {
        return axios.post('/movies/rateNow',ratingDetails).then((response)=>{
            //console.log(response);
            //dispatch();
        });
    }
}

export function addMovieToHall(details){
    return dispatch => {
        return axios.post('/movies/addMovieToHall',details).then((response)=>{
            //console.log(response);
            //dispatch();
        });
    }
}

export function cancelBooking(id){
    return dispatch => {
        return axios.get('/booking/cancelBooking',{
            params: {billing_id: id}
        })
    }
}


export function moviesList(values){
    return{
        type:"MOVIES_LIST",
        payload:values
    }
}

export function userList(values){
    return{
        type:"USER_LIST",
        payload:values
    }
}

export function movieInfo(values){
    return{
        type:"MOVIE_INFO",
        payload:values
    }
}
export function hallsList(values){
    return{
        type:"HALLS_LIST",
        payload:values
    }
}
export function genreList(values){
    return{
        type:"GENRE_LIST",
        payload:values
    }
}
export function revenueList(values){
    return{
        type:"REVENUE_LIST",
        payload:values
    }
}
