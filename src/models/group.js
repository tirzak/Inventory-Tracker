



import { db } from '../database';
import { v4 as uuidv4 } from 'uuid';
/**
 * 
 * @returns {Array<Object>}
 */
export const getGroup = async () => {

    const results = await db.query(`
    SELECT uuid, groupname as "groupName", productcount as "productCount", created_at as "createdAt", 
    updated_at as "updatedAt"  FROM grouplist ORDER BY updated_at DESC;
    
    `);
    
    if(results)
        return results.rows
    else{
        return []
    }



}
/**
 * 
 * @param {String} uuid 
 * @returns {{uuid: String, groupName: String, productCount: Number, createdAt: String, updatedAt: String  }}
 */
export const getSingleGroup = async (uuid) => {


    const results = await db.query(`
        SELECT uuid, groupname as "groupName", productcount as "productCount", created_at as "createdAt", 
        updated_at as "updatedAt"  FROM grouplist WHERE uuid=$1  ;
      
   `, [uuid]);
    
  
    if (results.rows)
    return results.rows[0]
else {
    return {}
}

}

/**
 * 
 * @param {String} groupname 
 * @returns {{uuid: String, groupName: String, productCount: Number, createdAt: String, updatedAt: String  }}
 */

export const postGroup = async (groupName) => {

    const uuid = uuidv4()
    const results = await db.query(`
        INSERT INTO grouplist (uuid, groupname) 
        VALUES ($1, $2)
        RETURNING *;
        `, [uuid, groupName]);

    const returnedRow = results.rows[0]
    let resp = {
        uuid: uuid,
        groupName: returnedRow.groupname,
        productCount: returnedRow.productcount,
        created_at: returnedRow.created_at,
        updated_at: returnedRow.updated_at



    }



    return resp



}

/**
 * 
 * @param {String} groupName 
 * @param {String} uuid 
 * @returns {{uuid: String, groupName: String, productCount: Number, createdAt: String, updatedAt: String  }}
 */
 

export const updateGroup = async (groupName, uuid) => {
    const results = await db.query(`
    UPDATE grouplist
    SET groupname=$1 WHERE uuid=$2 RETURNING *;

  `, [groupName, uuid]);

    const returnedRow = results.rows[0]
    let resp = {
        uuid: uuid,
        groupName: returnedRow.groupname,
        productCount: returnedRow.productcount,
        createdAt: returnedRow.created_at,
        updatedAt: returnedRow.updated_at



    }
    return resp
}

/**
 * 
 * @param {String} uuid 
 * @param {Number} count 
 * @returns {String}
 */
export const updateProductCount = async (uuid, count) => {

    await db.query(`
    UPDATE grouplist SET productCount = productCount+ CAST($1 AS INTEGER) WHERE uuid=$2;
  `, [count, uuid])

    return uuid
}
/**
 * 
 * @param {String} uuid 
 * @returns {{uuid: String}}
 */


export const deleteGroup = async (uuid) => {
    await db.query(`
          DELETE FROM grouplist WHERE uuid=$1;

        `, [uuid]);


    let resp = {
        uuid,
    }


    return resp
}


