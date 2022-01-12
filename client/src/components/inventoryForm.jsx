import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchParams , useNavigate} from 'react-router-dom';
const InventoryForm = (props)=>{
    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [btnSelector,setBtnSelector]=useState(1)
  
  let nav = useNavigate();
  let id = searchParams.get("uuid")
  
  useEffect(() => {
    fetch(`api/v1/inventory/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
    
        (error) => {
            
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  let handleChange=(e)=>{
   e.preventDefault()
    let am = JSON.stringify(items)
  
    if(btnSelector==1){
      fetch(`api/v1/inventory/${items.sku}`,{
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
        alert(error)
      });
      
    }
    else if(btnSelector==2){
      fetch(`api/v1/inventory/${items.sku}`,{
        method: 'delete',
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
          <form  onSubmit={(e)=>handleChange(e)}>
            <div>
            <p>SKU {items.sku}</p>
            <label>
              Product Name: 
            </label>
            <input name="prodName" id="prodName" type="text" maxLength="45"  value={items.productName || ''} onChange={handleInputChange}  required/>
            <br/>
            <br/>
            <label>
              Description: 
            </label>
            <input name="desc" id="desc" type="text" maxLength="56"  value={items.description || ''} onChange={handleInputChange} required/>
            <br/>
            <br/>
            <label>
              Item Count: 
            </label>
            <input name="count" id="count" type="number" min="1" max="10000"  value={items.itemCount || ''} onChange={handleInputChange} required/>
            </div>
            <div>
              <button name="update" type="submit" onClick={e => setBtnSelector(1)}>Update</button>

              <button name="delete" type="submit" onClick={e => setBtnSelector(2)}>Delete</button>
              </div>
          </form>
  
        
        </>
    )


}

export default InventoryForm;