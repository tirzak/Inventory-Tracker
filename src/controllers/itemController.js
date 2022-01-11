

import * as Item from "../models/item";
export const getItemsController = async (req,res) =>{
    try{ 
        const results = await Item.getItem()
        
        res.status(200).json(results)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }
}

export const getSingleItemController = async (req,res) =>{
    const {sku} = req.params
    try{ 
       
        const resp = await Item.getSingleItem(sku)
        res.status(200).json(resp)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }
}



export const postItemsController = async (req,res) =>{
   
    // const a = validationResult(req).array()
    // console.log(a)
   
    try{ 
        const {productName,itemCount,description} = req.body

        const resp = await Item.postItem(productName,itemCount,description)
      
      res.status(200).json(resp)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }
}

export const updateItemController = async (req,res) =>{
   

   
    const {sku} = req.params
    

   
    try{ 
      const {productName,itemCount,description} = req.body
      const resp = await Item.updateItem(productName,itemCount,description,sku)
      
      res.status(200).json(resp)
    }
    catch (error){
     
      res.status(500).json({error: `${error}`})

    }
}


export const deleteItemController = async (req,res) =>{
   

   
    const {sku} = req.params
    
    
    try{ 
      const resp = await Item.deleteItem(sku)

      res.status(200).json(resp)
    }
    catch (error){
      res.status(500).json({error: `${error}`})

    }

}


