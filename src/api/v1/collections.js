import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router()


export const Collections =  () =>{

  router.get('/', async (req,res)=>{
  
    try{ 
        const {results}=await db.query(`
        SELECT
        i.sku ,
        i.description 
        ,i.productname as "productName",
        g.groupname as "groupName"
        FROM collections c
        INNER JOIN grouplist g
            ON g.group_id = c.group_id
        INNER JOIN inventorylist i
            ON i.item_id = c.item_id;
      
   `);
        res.status(200).json(results.rows)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });
  router.get('/:uuid', async (req,res)=>{

    const {uuid}=req.params
   
    
    try{ 
        let groupDetails = await db.query(`SELECT productcount as "productCount",
        groupname as "groupName"
        FROM grouplist WHERE uuid=$1`,[uuid])
        groupDetails=groupDetails.results.rows[0]
     
        
        if(groupDetails.productCount>0){
          
          const {results}=await db.query(`
          SELECT
          i.sku ,
          i.description 
          ,i.productname as "productName",
          i.itemCount as "itemCount",
          g.groupname as "groupName",
          g.uuid
          FROM collections c
          INNER JOIN grouplist g
              ON g.group_id = c.group_id
          INNER JOIN inventorylist i
              ON i.item_id = c.item_id
          WHERE g.uuid=$1;
      
          `,[uuid]);
          res.status(200).json(results.rows)
        }

       
        else {
       
          res.status(200).json([{groupName: `${groupDetails.groupName}`,message : "Empty"}])

        }
      
          
    }
    catch (error){
     

       res.status(500).json({error: `${error}`})

    } 

  });

  router.post('/', async (req,res)=>{
   
    try{ 
      const {uuid} = req.body
      const {inventoryItems} = req.body
      const productCount = inventoryItems.length
      if(productCount==0){
        res.status(400).json({error: "Empty product body"})
      }

        const selectGroupId = await db.query('SELECT group_id as "groupId" FROM grouplist WHERE uuid=$1',[uuid])
        let {groupId} = selectGroupId.results.rows[0]
      
        
        const {results}=await db.query(`
        INSERT INTO collections (group_id, item_id) SELECT $1, item_id
          FROM inventorylist WHERE sku IN (SELECT * FROM UNNEST($2::varchar[])) ;`,
        
        [groupId, inventoryItems,
        ]);
         db.query(`
         UPDATE grouplist SET productCount = productCount +1 WHERE group_id = $1;
         `,[groupId])
        

      
    
      res.status(200).json(req.body)
    }
    catch (error){
      console.log(error)
       res.status(500).json({error: `${error}`})

    }

  });
  



  router.delete('/', async (req,res)=>{
    
    
    
    try{ 
      const {uuid,sku} = req.body
       db.query(`
          DELETE FROM collections WHERE group_id=(SELECT group_id from grouplist WHERE uuid=$1) AND 
          item_id=(SELECT item_id FROM inventorylist WHERE sku=$2)
          ;

        `,[uuid,sku]);
        db.query(`
          UPDATE grouplist SET productCount = productCount-1 WHERE uuid=$1;
        `,[uuid])
       
      
      let resp = {
        uuid,
        sku,
      }

      res.status(200).json(resp)
    }
    catch (error){
      res.status(500).json({error: `${error}`})

    }

  });


  return router;

};