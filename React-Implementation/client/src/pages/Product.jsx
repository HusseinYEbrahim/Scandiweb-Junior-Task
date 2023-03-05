import React from 'react'

import axios from 'axios';

import Card from '../components/ProductCard';

import {useState, useEffect} from 'react';

import styles from './products.module.css';

import { NavLink } from "react-router-dom";



export default function Product() {



    const [data, setData] = useState();

    const [deleteSet] = useState(new Set());

    const [refresh, setRefresh] = useState(0);

    function handleClick(sku)
    {
        if(deleteSet.has(sku)) deleteSet.delete(sku);
        else deleteSet.add(sku);
    }

    async function fetchData()
    {

        return await axios.get('./getProducts.php');
    
        //let x =  await fetch('http://localhost:80/tuts/getProducts.php', {method : "GET"});
        //console.log(x);
        //return x;
       /*fetch('http://localhost:80/tuts/getProducts.php')
        .then(response => {
            if(response.ok)
            {
                console.log('SUCCESS')
            }
            else console.log("NOT SUCCESS");
            console.log("Cookies are ", document.cookie);
          return response.json();
        })
        .then(data => setData(data));*/



        /*fetch('getProducts.php')
        .then(response => {
            if(response.ok)
            {
                console.log('SUCCESS')
            }
            else console.log("NOT SUCCESS");
          return response.json();
        })
        .then(data => setData(data));*/

    
        //last deployment trial
        //return await axios.get('getProducts.php');
    }

    useEffect(() => {

        fetchData().then((res) => {
            setData(res?.data);
        })

        //fetchData();


      }, [refresh]);
    
      if(data === undefined)
      {
        return <div>Loading</div>
      }

    const toShowList = data?.map((product) => 
    {
        //Put it in the Product Card
        return <Card key = {product?.sku} product = {product} handleClick = {handleClick} />
    });

    async function handleMassDelete()
    {
        //await axios.delete('http://localhost:80/tuts/deleteProducts.php', {data: [...deleteSet]}).then((response)=>console.log("Cookies are ", document.cookie));


        //deployment trials
        await axios.post('deleteProducts.php',  [...deleteSet]);
        setRefresh(refresh+1);
        //await fetch('deleteProducts.php', { method: 'DELETE', data: [...deleteSet] });
    }

    const addButtonStyle = {
        width:'7rem',
        height: '3.5rem',
        borderRadius: '0px',
        border: '0.1px #1c1d1f solid',
        backgroundColor: 'transparent',
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-.02rem',
        fontSize: '1.2rem'
    }

    const deleteButtonStyle = 
    {
        width:'10rem',
        height: '3.5rem',
        borderRadius: '0px',
        border: '0.1px #1c1d1f solid',
        backgroundColor: '#1c1d1f',
        color:'white',
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-.02rem',
        fontSize: '1.2rem',
        cursor:'pointer'
    }

  return (
    <>
    <div style={{display:'flex', justifyContent:'space-between', width:'70%', marginLeft:'15%', marginTop:'3rem', alignItems:'center'}}>
        <h1 style={{fontSize:'2.6rem', fontWeight:'500'}}>
            Products List
        </h1>
        <div style= {{display:'flex', justifyContent:'space-around', width:'20%'}}>
            <NavLink to ="/product/add">
            <button style={ addButtonStyle}>
                ADD
            </button>
            </NavLink>
            <button id = 'delete-product-btn' style={deleteButtonStyle} onClick = {() => handleMassDelete()}>
                MASS DELETE
            </button>
        </div>
    </div>
    <hr style={{width:'80%', margin : 'auto'}}/>

    <div className = {styles.container}>
        {toShowList}
    </div>
    </>
  )
}
