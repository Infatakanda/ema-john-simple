import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Card from '../Card/Card';
import happyImage from '../../images/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const handlePlaceOrder = () => {
            setCart([]);
            setOrderPlace(true);
            processOrder();
    }


    const removeProduct = (productKey) => {
        console.log('remove items', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const counts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(counts);
    }, [])

    let thankyou;
    if(orderPlace){
        thankyou = <img src={happyImage} alt=""/>

    } 

    return (
        <div className="twin-container">
            
        <div className="product-container">
        {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem>)
            }
            {
                thankyou
            }
        </div>
        <div className="cart-container">
                <Card card={cart}>
                    <button 
                    onClick={handlePlaceOrder}
                    className="add-cart-button">Place Order</button>
                </Card>
        </div>
        </div>
    );
};

export default Review;