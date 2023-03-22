import React from 'react';

import { useState } from 'react';

import axios from 'axios';

import styles from './ProductAdd.module.css';

import {NavLink, useNavigate} from 'react-router-dom';

export default function ProductAdd() {

    

    const [type, setType] = useState();

    const navigate = useNavigate();

    const [error, setError] = useState('none');

    function typeChange() {
        var selectBox = document.getElementById("productType");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        setType(selectedValue);
    }



    async function handleSubmit(event)
    {
        event.preventDefault();

        var selectBox = document.getElementById("productType");
        let payload =
        {
            'sku' : document.getElementById("sku").value,
            'name' : document.getElementById("name").value,
            'price' : document.getElementById("price").value,
            'size' : document.getElementById("size").value,
            'length' : document.getElementById("length").value,
            'width' : document.getElementById("width").value,
            'height' : document.getElementById("height").value,
            'weight' : document.getElementById("weight").value,
            'type' : document.getElementById("productType").options[selectBox.selectedIndex].value
        };

        //console.log(payload);

        let data = await axios.post('http://localhost:80/tuts/addProduct.php', payload);

        if(data?.status === 201)
        {
            setError('block');
        }
        else{
            navigate("/");
        }

    }


    const saveButtonStyle = {
        width:'10rem',
        height: '4rem',
        borderRadius: '0px',
        border: '0.1px #1c1d1f solid',
        backgroundColor: 'transparent',
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-.02rem',
        fontSize: '1.5rem'
    }

    const cancelButtonStyle = 
    {
        width:'10rem',
        height: '4rem',
        borderRadius: '0px',
        border: '0.1px #1c1d1f solid',
        backgroundColor: '#1c1d1f',
        color:'white',
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-.02rem',
        fontSize: '1.5rem',
        cursor:'pointer'
    }

  return (

    <>
    <div style={{display:'flex', justifyContent:'space-between', width:'70%', marginLeft:'15%', marginTop:'3rem', alignItems:'center'}}>
        <h1 style={{fontSize:'2.7rem', fontWeight:'500'}}>
            Product Add
        </h1>
    </div>
    <hr style={{width:'80%', margin : 'auto', marginBottom:'3rem'}}/>
    <form id="product_form" style = {{paddingLeft:'15%'}} onSubmit= {handleSubmit} >
        <div className = 'form-group'>
            <label style={{fontSize:'1.8rem'}} htmlFor="sku">SKU</label>
            <input id="sku" className='form-control' style={{width:'30rem'}} required/>
        </div>

        <div className = {styles.group}>
            <label style = {{fontSize:'1.8rem'}} htmlFor="name">Name</label>
            <input id="name" className='form-control' style={{width:'30rem'}} required />
        </div>

        <div className = {styles.group}>
            <label htmlFor="price" style={{fontSize:'1.8rem'}}>Price($)</label>
            <input id="price" className='form-control' type="number" min={0} style={{width:'30rem'}} required/>
        </div>

        <div style={{display:'flex', alignItems:'center', gap:'2.5rem', marginBottom:'3rem'}}>
            <label style={{fontSize:'1.8rem'}} htmlFor="productType">
                Type Switcher
            </label>
            <div className={styles.selectdiv}>
                <select id="productType" onChange={typeChange} required>
                    <option value = ''>Select Type</option>
                    <option value = 'DVD'>DVD</option>
                    <option value = 'Furniture'>Furniture</option>
                    <option value = 'Book'>Book</option>
                </select> 
            </div>
        </div>

        <div className={styles.group} style = {{display: (type !== 'DVD')? 'none':'flex'}}>
            <label style={{fontSize:'1.8rem'}} htmlFor="size">
                Size (MB)
            </label>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input id="size" className = "form-control" style={{width:'20rem'}} type="number" required = {type === 'DVD'} />
                <small className="form-text text-muted" style={{marginTop:'1.5rem'}}>Enter the Size in MB</small>
            </div>
        </div>

        <div className={styles.group} style = {{display: (type !== 'Book')? 'none':'flex'}}>
            <label style={{fontSize:'1.8rem'}} htmlFor="weight">
                Weight (KG)
            </label>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input id="weight" className = "form-control" style={{width:'20rem'}} type="number" required = {type === 'Book'} />
                <small className="form-text text-muted" style={{marginTop:'1.5rem'}}>Enter the Weight in KG</small>
            </div>
        </div>

        <div style = {{display: (type !== 'Furniture')? 'none':'block'}}>
        <div className={styles.group}>
            <label style={{fontSize:'1.8rem'}} htmlFor="length">
                Length (CM)
            </label>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input  id="length" className = "form-control" style={{width:'20rem'}} type="number" required = {type === 'Furniture'?true:false} />
                <small className="form-text text-muted" style={{marginTop:'1.5rem'}}>Enter the Length in CM</small>
            </div>
        </div>
        <div className={styles.group}>
            <label style={{fontSize:'1.8rem'}} htmlFor="width">
                Width (CM)
            </label>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input  id="width" className = "form-control" style={{width:'20rem'}} type="number" required = {type === 'Furniture'?true:false} />
                <small className="form-text text-muted" style={{marginTop:'1.5rem'}}>Enter the Width in CM</small>
            </div>
        </div>
        <div className={styles.group} >
            <label style={{fontSize:'1.8rem'}} htmlFor="height">
                Height (CM)
            </label>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input  id="height" className = "form-control" type="number" style={{width:'20rem'}} required = {type === 'Furniture'? true:false} />
                <small className="form-text text-muted" style={{marginTop:'1.5rem'}}>Enter the Height in CM</small>
            </div>
        </div>

        </div>

        <div style={{display: error, color:'red', fontSize:'1.5rem', marginBottom:'1.3rem'}}>
            *SKU value is already there, It can't be Duplicated.

        </div>

        <div style= {{display:'flex', justifyContent:'space-around', width:'20%'}}>
            <button style= {saveButtonStyle}  type='submit' >
                Save
            </button>
            <NavLink to="/">
            <button style={cancelButtonStyle} type='button' >
                Cancel
            </button>
            </NavLink>
        </div>


    </form>
    </>
  )
}
