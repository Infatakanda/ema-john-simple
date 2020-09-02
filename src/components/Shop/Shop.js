import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Card from '../Card/Card';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    
    const first10 = fakeData.slice(0, 10);
    const [products, seeProducts] = useState(first10);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKyes = Object.keys(savedCart);
        const previousCart = products.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey );
            products.quantity = savedCart[existingKey];
            return product;

        })
        
    }, [])


    const handleAddProduct = (product) =>{
       // console.log('Product added', product);
       const toBeAddedKey = product.key;
        
        
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }

        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }

        
        
        setCart(newCart);
        addToDatabaseCart (product.key, count);
        
    }

    
    return (
        <div className="twin-container">
           <div className="product-container">
           
              {

              products.map(product => <Product
              key={product.key}
              showAddToCart={true}
                handleAddProduct = {handleAddProduct} 
               product={product} ></Product>)
               }
            
           </div>
            
            <div className="cart-container">
                <Card card={cart}>
                    <Link to="/review">
                        <button className="add-cart-button">Review My Order</button>
                    </Link>
                </Card>
                
            </div>
           
        </div>
    );
};

export default Shop;