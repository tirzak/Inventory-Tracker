import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router()


export const Group =  () =>{

  router.get('/', async (req,res)=>{
  
    try{ 
        const {results}=await db.query(`
        SELECT uuid, groupname as "groupName", productcount as "productCount", created_at as "createdAt", 
        updated_at as "updatedAt"  FROM grouplist;
      
   `);
        res.status(200).json(results.rows)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });
  router.get('/:uuid', async (req,res)=>{

    const {uuid}=req.params
    console.log(uuid)
    try{ 
        const {results}=await db.query(`
        SELECT uuid, groupname as "groupName", productcount as "productCount", created_at as "createdAt", 
        updated_at as "updatedAt"  FROM grouplist WHERE uuid=$1  ;
      
   `,[uuid]);
        res.status(200).json(results.rows[0])
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    } 

  });

  router.post('/', async (req,res)=>{
    const {groupName} = req.body
    const uuid = uuidv4()
    try{ 
        const {results}=await db.query(`
        INSERT INTO grouplist (uuid, groupname) 
        VALUES ($1, $2)
        RETURNING *;
        `,[uuid,groupName]);

      const returnedRow = results.rows[0]
      let resp = {
        sku: uuid,
        groupName: returnedRow.groupname,
        productCount: returnedRow.productCount,
        created_at: returnedRow.created_at,
        updated_at: returnedRow.updated_at



      }
      res.status(200).json(resp)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }

  });
  
  router.post('/:uuid', async (req,res)=>{
    const {uuid} = req.params
    const {groupName} = req.body

    
    try{ 
      
      const {results}=await db.query(`
          UPDATE grouplist
          SET groupname=$1 WHERE uuid=$2 RETURNING *;

        `,[groupName,uuid]);

      const returnedRow = results.rows[0]
      let resp = {
        sku: sku,
        groupName: returnedRow.productname,
        productCount: returnedRow.itemcount,
        createdAt: returnedRow.created_at,
        updatedAt: returnedRow.updated_at



      }
      res.status(200).json(resp)
    }
    catch (error){
      res.status(500).json({error: `${error}`})

    }

  });



  router.delete('/:uuid', async (req,res)=>{
    const {uuid} = req.params
    
    
    try{ 
      const {results}=await db.query(`
          DELETE FROM grouplist WHERE uuid=$1;

        `,[uuid]);

      
      let resp = {
        uuid,
      }

      res.status(200).json(resp)
    }
    catch (error){
      res.status(500).json({error: `${error}`})

    }

  });


  return router;

};