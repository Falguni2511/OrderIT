import React, { useEffect } from 'react'
import CounterRestaurant from './CounterRestaurant'
import Restaurant from './Restaurant'
import { useDispatch, useSelector } from 'react-redux';
import {getRestaurants, sortByReviews, sortByRatings,toggleVegOnly} from '../../actions/restaurantAction';
import Loader from './Loader';
import Message from './Message';
export default function Home() {
  const dispatch=useDispatch();
  const{loading:restaurantsLoading,
    error:restaurantsError,
    restaurants,showVegOnly,pureVegRestaurantsCount} = useSelector((state)=>state.restaurants);
  useEffect(()=>{
    dispatch(getRestaurants())
  },[dispatch])  

  const handlereviews=()=>{
    dispatch(sortByReviews());
  };

  const handleratings=()=>{
    dispatch(sortByRatings());
  };
  const handleToggle=()=>{
    dispatch(toggleVegOnly());
  };
  return (
    <>
      <CounterRestaurant/>
      {restaurantsLoading ? <Loader/>:restaurantsError?(<Message variant="danger">{restaurantsError}</Message>):(<>
        <section>
        <div className='sort'>
            <button className="sort_veg p-3" onClick={handleToggle}>{showVegOnly?"Show All":"Pure Veg"}</button>
            <button className="sort_rev p-3" onClick={handlereviews}>Sort By Reviews</button>
            <button className="sort_rate p-3"onClick={handleratings}>Sort By Ratings</button>
        </div>
      
     <div className="row mt-4">
     {restaurants?restaurants.map((restaurant) => !showVegOnly||(showVegOnly && restaurant.isVeg)?(<Restaurant key={restaurant._id} restaurant={restaurant}/>):null):(<Message variant="info">No Restaurants Found</Message>)};
     </div>
     </section>
      </>)};
  
    </>
  )
}

