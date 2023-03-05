import React from 'react'

import styles from './Product.module.css';


export default function ProductCard(props) {


    let product = props?.product;
    
    let imgSrc = '';
    if(product?.property[0] === 'S') imgSrc = 'https://cdn.shopify.com/s/files/1/1890/2231/products/Spider-Man2BL_b38bf8b8-ea13-4e71-bcfb-7237470d42fe.jpg?v=1629219801';
    else if(product?.property[0] === 'W') imgSrc = 'https://www.bookgeeks.in/wp-content/uploads/2020/06/Best-Indian-Books-by-Indian-Authors-1-1024x768.jpg';
    else  imgSrc = 'https://cdn.shopify.com/s/files/1/0514/6794/4099/products/introspectroyalbluevelvetmodernsofa32_4.jpg?v=1673213369&width=1445';



  return (
  <div className={styles.polaroid}>
    <img src={imgSrc} alt="5 Terre" style={{width:'100%'}} />
    <div className={styles.container}>
        <h1 style = {{fontSize:'1.8rem', fontWeight:'500'}}>{product?.sku}</h1>
        <h2 style={{fontSize:'1.6rem', fontWeight:'400'}}>{product?.name}</h2>
        <h3 style={{fontSize:'1.5rem', fontWeight:'500'}}>{product?.price}$</h3>
        <h3 style={{fontSize:'1.6rem', fontWeight:'500'}}>{product?.property}</h3>
        <input type="checkbox" className = 'delete-checkbox' onClick={()=> props.handleClick(product?.sku)}/>
    </div>
  </div>
  )
}
