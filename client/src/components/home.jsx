
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useFetch1 =() => {
  const [items, setData] = useState([]);
  const [loading1, setLoading] = useState([]);

  useEffect( () => {
    const func = async ()=>{
      const response = await fetch("api/v1/inventory");
      const data2 = await response.json();
      setData(data2);
      setLoading(false);
    }
  
    func()
    
   
  }, []);

  return { items, loading1 };
};

const useFetch2 = () => {
  const [items, setData] = useState([]);
  const [loading1, setLoading] = useState([]);

  useEffect( () => {
    const func = async ()=>{
      const response = await fetch("api/v1/group/");
      const data2 = await response.json();
      setData(data2);
      setLoading(false);
    }
  
    func()
    
   
  }, []);

  return { items, loading1 };
};
const Home = ()=>{
  
  
  const {items, loading1}= useFetch1();
  const collitemsD = useFetch2();
  const collitems = collitemsD.items
  const loading2 = collitemsD.loading1
  const [itemSelector,setItemSelector]=useState(0)
  const [groupSelector,setGroupSelector]=useState(0)

      let nav = useNavigate();

    const handleSelectChange=(e,params)=>{
      
      if(params==1){
        setGroupSelector(e.target.value)
      }
      else{
     
        setItemSelector(e.target.value)
      }
    }
    const handleAssign=(e,params)=>{
      e.preventDefault()
      
      let obj = JSON.stringify({
        uuid: collitems[groupSelector].uuid,
        inventoryItems: [items[itemSelector].sku]
      })
      fetch(`api/v1/collections`,{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: obj

      }).then((result)=>{
        if(result.ok){
          alert(`${items[itemSelector].productName} has been added to ${collitems[groupSelector].groupName}
          To remove it, go to the Collection's View
          `)

        }
        else{
          alert("A collection cannot contain duplicate items")
          
        }

      },
      (error) =>{
        alert(error)
      });
    }
    
    const handleClick=(e, params,path)=>{
      e.preventDefault()
      nav({
      pathname: path,
      search: `?uuid=${params}`,
     })
    }
    return (
        <>
          <div>
            <h3> Collections </h3>
            <ul>
              {loading2 ? <div>...loading</div> :
                collitems.map((e,index)=>{
                    return (
                      
                      <li key ={e.uuid}>
                        
                        
                        {e.groupName} (Item Count: {e.productCount} )
                        <button onClick={(event)=>handleClick(event,e.uuid,"/singlegroup")}>View/Modify</button>

                       
                        <br></br>
                        <br></br>
                        </li>
                        
                    )
                })

              }

              
</ul>
            <div>
            <p><b>Add item to a collection</b></p>
            <label>
              Item:
            </label>
            <select id="item-selector" onChange={(e)=>handleSelectChange(e,2)}>
                  {loading2 ? <option> ...loading </option> : items.map((x,y)=>{
                   
                    return(
                    <option key={y} value={y}>{x.productName}</option>
                    )
                  })}
               </select>
               &nbsp;&nbsp;
               <label>
              Collection:
            </label>
            <select id="group-selector" onChange={(e)=>handleSelectChange(e,1)} value={groupSelector}>
             
                { loading2 ? <option> ...loading </option> : collitems.map((x,y)=>{
                  return(
                    <option key={y} value={y}>{x.groupName}</option>
                  )
                  })}
               </select>
               &nbsp;&nbsp;
              <button onClick={(e)=>handleAssign(e,1)}> Assign </button>
               
            </div>
          </div>
          <div>

            <h3>Items</h3>
         
            <ul key ="products">
                { loading1 ? <div> ...loading </div> : items.map((e,index) =>{
                    return(
                    
                    <li key = {e.sku}>
                    <p id={index+"index"}><b>Product {index+1}</b></p>
                    <p id={index+"sku"}>SKU: {e.sku} </p>
                    
                    <p id={index+"prodName"}> Product Name: {e.productName}, Item Count: {e.itemCount}</p>
                    <p id={index+"desc"}>Description: {e.description}</p>
                    <p id={index+"created"}>Created: {e.createdAt}, Last Updated: {e.updatedAt}</p>
                    <button id={index+"editbtn"} onClick={(event)=>handleClick(event,e.sku,"/inventory")}>Edit</button>
                    
                      <br></br>
                      
                      <br></br>
                    
                    </li>
                     
                    )
                     
                })}

</ul>
</div>
        
        </>
    )


}

export default Home