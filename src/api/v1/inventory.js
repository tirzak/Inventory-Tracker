import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router()


export const Inventory =  () =>{

  router.get('/', async (req,res)=>{
  
    try{ 
        const {results}=await db.query(`
        SELECT sku, productname as "productName", itemcount as "itemCount", description, created_at as "createdAt", 
        updated_at as "updatedAt"  FROM inventorylist;
        
      
   `);
        res.status(200).json(results.rows)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });

  router.get('/:sku', async (req,res)=>{
    const {sku} = req.params
    try{ 
        const {results}=await db.query(`
        SELECT sku, productname as "productName", itemcount as "itemCount", description, created_at as "createdAt", 
        updated_at as "updatedAt"  FROM inventorylist WHERE sku=$1;
        
      
   `,[sku]);

        res.status(200).json(results.rows[0])
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });

  router.post('/', async (req,res)=>{
    const {productName,itemCount,description} = req.body
    const uuid = uuidv4()
    try{ 
        const {results}=await db.query(`
        INSERT INTO inventorylist (sku, productname, itemcount, description) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,[uuid,productName,itemCount,description]);

      const returnedRow = results.rows[0]
      let resp = {
        sku: uuid,
        productName: returnedRow.productname,
        itemCount: returnedRow.itemcount,
        createdAt: returnedRow.created_at,
        updatedAt: returnedRow.updated_at



      }
      res.status(200).json(resp)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });
  
  router.post('/:sku', async (req,res)=>{
    const {sku} = req.params
    const {productname,itemcount,description} = req.body

    
    try{ 
      const {results}=await db.query(`
          UPDATE inventorylist
          SET productname=$1, itemcount=$2, description=$3 WHERE sku=$4 RETURNING *;

        `,[productname,itemcount,description,sku]);

      const returnedRow = results.rows[0]
      let resp = {
        sku: sku,
        productName: returnedRow.productname,
        itemCount: returnedRow.itemcount,
        description: returnedRow.description,
        createdAt: returnedRow.created_at,
        updatedAt: returnedRow.updated_at



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
          DELETE FROM inventorylist WHERE sku=$1;

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