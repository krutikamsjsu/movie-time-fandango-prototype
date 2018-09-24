import axios from 'axios';
import { FETCH_LOGIN } from './types';
import {BILLS} from "./adminTypes";

 // export function verifyLogin(userdata){
 //     return dispatch => {
 //         console.log(userdata.email);
 //         return axios.post('/userRoutes/verifyLogin',
 //             {
 //               email: userdata.email,
 //               password: userdata.password
 //             }
 //         )
         // .then((response)=>{
         //     dispatch(userInfo(response.data));
         // });
//     }
// }
//
 export const verifyLogin= (userdata) => async dispatch => {
         console.log(userdata.email);
         const res = axios.get('/userRoutes/verifyLogin',{
             params:{
                 email: userdata.email,
                 password: userdata.password
             }
         })
         // .then((response)=>{
         //     dispatch(userInfo(response.data));
         // });
     };



export function userInfo(values){
    return{
        type:"USER_INFO",
        payload:values
    }
}
