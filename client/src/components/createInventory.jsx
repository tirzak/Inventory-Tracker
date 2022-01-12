import React, { useState,useEffect } from 'react';
import { useSearchParams , useNavigate} from 'react-router-dom';
const CreateInventory = (props)=>{

  const [items, setItems] = useState({
    productName: '',
    description: '',
    itemCount: 1

  });



  
  let nav = useNavigate();
  
  
  let handleChange=(e)=>{
   e.preventDefault()
    let am = JSON.stringify(items)
    
    
      fetch(`api/v1/inventory/`,{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: am

      }).then((result)=>{
        if(result.ok){
          nav("/")

        }
        else{
          result.json().then(
            (errorObj)=>{
              
                let alertObj=errorObj.errors.map(elem=>{
                   return elem.msg
                })

                alert(alertObj)
            }
        )


          
        }

      },
      (error) =>{
        alert("Something Went Wrong")
      });
      
    
  
  }
  
  let handleInputChange=(e)=> {
    e.preventDefault()
    const target = e.target
    if(e.target.name=="prodName"){
      let productName=e.target.value
      let itemsC = {...items}
      itemsC.productName=productName
      setItems(itemsC);
    }
    else if(e.target.name=="count"){
      let itemCount=e.target.value
      let itemsC = {...items}
      if(itemCount>1000)
        itemCount=1000
      itemsC.itemCount=itemCount
      setItems(itemsC);
    }
    else if(e.target.name=="desc"){
      let description=e.target.value
      let itemsC = {...items}
      itemsC.description=description
      setItems(itemsC);
    }
   

  }

    return (
        <>
        <div>
         <ol>
         <li>Only English alphabets and  - _ allowed in the Description and Product Name field. <br></br>Must be at least 2 characters and end with an alphanumeric characters</li>
           <li>Only numbers allowed in the Item Count field (1-10000)</li>
          
         </ol>
        </div>
          <form onSubmit={e => handleChange(e)}>
            
            <div>
            <label>
              Product Name: 
            </label>
            <input name="prodName" id="prodName" type="text" maxLength="45" value={items.productName || ''} onChange={handleInputChange}  required/>
            <br/>
            <br/>
            <label>
              Description: 
            </label>
            <input name="desc" id="desc" type="text" maxLength="56" value={items.description || ''} onChange={handleInputChange} required/>
            <br/>
            <br/>
            <label>
              Item Count: 
            </label>
            <input name="count" id="count" type="number" min="1" max="10000"  value={items.itemCount || ''} onChange={handleInputChange} required/>
            </div>
            <div>
              <button name="submit" type="submit">Add</button>

             
              </div>
          </form>
  
        
        </>
    )


}

export default CreateInventory;