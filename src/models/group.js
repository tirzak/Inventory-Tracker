



import { db } from '../database';
import { v4 as uuidv4 } from 'uuid';
export const getGroup= async()=>{

    const {results}=await db.query(`
    SELECT uuid, groupname as "groupName", productcount as "productCount", created_at as "createdAt", 
    updated_at as "updatedAt"  FROM grouplist ORDER BY updated_at DESC;
    
    `);
        return results.rows
    
  
    
}

export const getSingleGroup= async(uuid)=>{

    
    const {results}=await db.query(`
        SELECT uuid, groupname as "groupName", productcount as "productCount", created_at as "createdAt", 
        updated_at as "updatedAt"  FROM grouplist WHERE uuid=$1  ;
      
   `,[uuid]);
    return results.rows



}



export const postGroup= async(groupName)=>{

    const uuid = uuidv4()
    const {results}=await db.query(`
        INSERT INTO grouplist (uuid, groupname) 
        VALUES ($1, $2)
        RETURNING *;
        `,[uuid,groupName]);

      const returnedRow = results.rows[0]
      let resp = {
        uuid: uuid,
        groupName: returnedRow.groupname,
        productCount: returnedRow.productCount,
        created_at: returnedRow.created_at,
        updated_at: returnedRow.updated_at



      }
    
  

    return resp



}

export const updateGroup = async (groupName, uuid)=>{
    const {results}=await db.query(`
    UPDATE grouplist
    SET groupname=$1 WHERE uuid=$2 RETURNING *;

  `,[groupName,uuid]);

const returnedRow = results.rows[0]
let resp = {
  uuid: uuid,
  groupName: returnedRow.productname,
  productCount: returnedRow.itemcount,
  createdAt: returnedRow.created_at,
  updatedAt: returnedRow.updated_at



}
      return resp
}

export const updateProductCount= async (uuid,count)=>{

 await db.query(`
    UPDATE grouplist SET productCount = productCount+ CAST($1 AS INTEGER) WHERE uuid=$2;
  `,[count,uuid])

  return uuid
}

export const deleteGroup = async (uuid)=>{
    db.query(`
          DELETE FROM grouplist WHERE uuid=$1;

        `,[uuid]);

      
      let resp = {
        uuid,
      }

     
      return resp
}


