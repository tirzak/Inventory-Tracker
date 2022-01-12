
import React, { useState,useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CreateGroup from './createGroup';
const ViewCollection = ()=>{
    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupName,setGrpName]=useState('')


let nav = useNavigate()
let uuid = searchParams.get("uuid")
 
    useEffect(() => {
        fetch(`api/v1/collections/${uuid}`)
          .then(res => res.json())
          .then(
            (result) => {

              if(result.length > 0 ){
                if(!result[0].message){
                let grp = result[0].groupName
                setGrpName(grp)
                setItems(result);
                setIsLoaded(true);
              }

              
              else{
                  setGrpName(result[0].groupName)
                  
                  setEmpty(true)
                  setIsLoaded(true);
              }
            }
      
            },
        
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
      const handleDelete=(e)=>{
        e.preventDefault()
        fetch(`api/v1/group/${uuid}`,{
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
          
    
          }).then((result)=>{
            if(result.ok){
            
                nav('/')
            }
            else{
              result.json().then(
                (errorObj)=>{
                  console.log(errorObj)
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
   
    const handleClick=(e,params)=>{
      e.preventDefault()
    
    let am = JSON.stringify({
        uuid: uuid,
        sku: params
    })
    
    
      fetch(`api/v1/collections/`,{
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: am

      }).then((result)=>{
        if(result.ok){
        
            let it = [...items]
            let ms = it.filter((elem)=> elem.sku!==params)

            
            setItems(ms)
            if(ms.length==0)
                setEmpty(true)
        }
        else{
          alert("Something Went Wrong")
          
        }

      },
      (error) =>{
        alert(error)
      });
      
    }
    if(isLoaded && !isEmpty){
        return (
            <>
            
                <h3>Collection Name: {groupName}</h3>
                <p>You can Edit the name below</p>

                
                <CreateGroup buttonName="Update Name" uuid={uuid} groupName={groupName}></CreateGroup>
                <br></br>
                <button onClick={(event)=>handleDelete(event)}>Delete Collection</button>
                <ul id ="collection">
                    {items.map((e,index) =>{
                        return(
                        
                        <li key = {e.sku}>
                        <b>Product {index+1}</b>
                        <p>SKU: {e.sku} </p>
                        
                        <p>Product Name: {e.productName}, Item Count: {e.itemCount}</p>
                        <button onClick={(event)=>handleClick(event,e.sku)}>Remove</button>
                          <br></br>
                          <br></br>
                        
                        </li>
                         
                        )
                         
                    })}
    
    </ul>
            
            </>
        )
    }
    else if(!isLoaded){
        return(<div>loading</div>)
        
    }
    else{
        return(<div>

                <h3>Collection Name: {groupName}</h3>
                <p>You can Edit the name below</p>

                
                <CreateGroup buttonName="Update Name" uuid={uuid} groupName={groupName}></CreateGroup>
                <br></br>
                <button onClick={(event)=>handleDelete(event)}>Delete Collection</button>
                
                <div>
                    Empty Collection
                </div>


        </div>)
    }
    


}

export default ViewCollection;