import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router()


export const Inventory =  () =>{

  router.get('/', async (req,res)=>{
  
    try{ 
        const {results}=await db.query(`
        SELECT * FROM grouplist;
        
      
   `);
        res.status(200).json(results.rows)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });

  router.post('/', async (req,res)=>{
    const {productname,itemcount} = req.body
    const uuid = uuidv4()
    try{ 
        const {results}=await db.query(`
        INSERT INTO grouplist (uuid, productname, productcount) 
        VALUES ($1, $2, $3)

        `,[uuid,productname,0]);

      const returnedRow = results.rows[0]
      let resp = {
        sku: uuid,
        productName: productname,
        itemcount: returnedRow.itemcount,
        created_at: returnedRow.created_at,
        updated_at: returnedRow.updated_at



      }
      res.status(200).json(resp)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });
  
  router.post('/:sku', async (req,res)=>{
    const {sku} = req.params
    const {productname,itemcount} = req.body

    
    try{ 
      const {results}=await db.query(`
          UPDATE inventorylist
          SET productname=$1, itemcount=$2 WHERE sku=$3 RETURNING *;

        `,[productname,itemcount,sku]);

      const returnedRow = results.rows[0]
      let resp = {
        sku: sku,
        productName: returnedRow.productname,
        itemcount: returnedRow.itemcount,
        created_at: returnedRow.created_at,
        updated_at: returnedRow.updated_at



      }
      res.status(200).json(resp)
    }
    catch (error){
      res.status(500).json({error: `${error}`})

    }

  });



  router.delete('/:sku', async (req,res)=>{
    const {sku} = req.params
    
    
    try{ 
      const {results}=await db.query(`
          DELETE FROM groups WHERE sku=$1;

        `,[sku]);

      const returnedRow = results.rows[0]
      let resp = {
        sku: sku,
      }

      res.status(200).json(resp)
    }
    catch (error){
      res.status(500).json({error: `${error}`})

    }

  });


  return router;

};