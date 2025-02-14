import axios from "axios";
import { ALL_RESTAURANTS_FAIL, ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant"

//To get the restaurants from database we use async with a function parameter called dispatch, await and axios instead of traditional promise handling like fetch and then
export const getRestaurants=()=>{
    return async(dispatch)=>{
       try{ dispatch({type:ALL_RESTAURANTS_REQUEST});
       const {data}= await axios(`/api/v1/eats/stores`);
       console.log('Fetched data:', data);
        // await axios.get(link);
       const{restaurants,count}=data;
       dispatch({type:ALL_RESTAURANTS_SUCCESS,
                payload:{restaurants,count},
       });}
       catch(err){
        dispatch({
            type:ALL_RESTAURANTS_FAIL,
            payload:err.response.data.message,
        })
    };
}}

export const sortByRatings =()=>{
    return {
        type:SORT_BY_RATINGS,
    }

}
export const sortByReviews =()=>{
    return {
        type:SORT_BY_REVIEWS,
    }

}
export const toggleVegOnly =()=>{
    return {
        type:TOGGLE_VEG_ONLY,
    }

}
export const clearErrors =()=>{
    return {
        type:CLEAR_ERROR,
    }

}