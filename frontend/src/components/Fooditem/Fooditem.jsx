import React, { useContext } from 'react';
import "./Fooditem.css";
import { assets } from '../../assets/assets';
import { storecontext } from '../../conetext/Storecontex';

const Fooditem = ({ id, name, price, description, image }) => {
  const backendurl = "https://food-web-train-main-backend.onrender.com";

  const { cartitems, addtocart, removefromcart } = useContext(storecontext);

  // Log the image prop to check if it has the correct value
  console.log("Image Prop: ", image);

  // Construct the image URL
  const imageUrl = `${backendurl}/images/${image}`;

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            {/* Display the image, using a fallback if the image URL is incorrect */}
            <img 
              src={imageUrl} 
              className='food-item-image' 
              alt={name || "Food item"} 
              onError={(e) => e.target.src = "https://via.placeholder.com/150"}  // Fallback image on error
            />
            {
              !cartitems[id] ? 
              <img className='add' onClick={() => addtocart(id)} src={assets.add_icon_white} alt='' /> :
              <div className='food-item-counter'>
                 <img onClick={() => removefromcart(id)} src={assets.remove_icon_red} alt='' />
                 <p>{cartitems[id]}</p>
                 <img onClick={() => addtocart(id)} src={assets.add_icon_green} alt='' />
              </div>
            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="Rating Stars" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>
    </div>
  );
};

export default Fooditem;
