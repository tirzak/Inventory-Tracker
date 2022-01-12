import { db } from '../database';
import { v4 as uuidv4 } from 'uuid';

/**
 * 
 * @returns {Array<Object>}
 */
export const getItem = async () => {

    const results = await db.query(`
        SELECT sku, productname as "productName", itemcount as "itemCount", description, created_at as "createdAt", 
        updated_at as "updatedAt"  FROM inventorylist ORDER BY updated_at DESC;
        
      
   `);

    return results.rows



}
/**
 * 
 * @param {String} sku 
 * @returns {{sku: String, productName: String, itemCount: Number, createdAt: String, updatedAt: String}}
 */
export const getSingleItem = async (sku) => {


    const results = await db.query(`
    SELECT sku, productname as "productName", itemcount as "itemCount", description, created_at as "createdAt", 
    updated_at as "updatedAt"  FROM inventorylist WHERE sku=$1;
    
    
    `, [sku]);

       if (results.rows)
        return results.rows[0]
    else {
        return {}
    }



}

/**
 * 
 * @param {String} productName 
 * @param {Number} itemCount 
 * @param {String} description 
 * @returns {{sku: String, productName: String, itemCount: Number, createdAt: String, updatedAt: String}}
 */

export const postItem = async (productName, itemCount, description) => {

    const uuid = uuidv4()
    const results = await db.query(`
    INSERT INTO inventorylist (sku, productname, itemcount, description) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [uuid, productName, itemCount, description]);

    const returnedRow = results.rows[0]
    let resp = {
        sku: uuid,
        productName: returnedRow.productname,
        itemCount: returnedRow.itemcount,
        description: returnedRow.description,
        createdAt: returnedRow.created_at,
        updatedAt: returnedRow.updated_at


    }

    return resp



}
/**
 * 
 * @param {String} productName 
 * @param {Number} itemCount 
 * @param {String} description 
 * @param {String} sku 
 * @returns {{sku: String, productName: String, itemCount: Number, createdAt: String, updatedAt: String}}
 */
export const updateItem = async (productName, itemCount, description, sku) => {
    const results = await db.query(`
          UPDATE inventorylist
          SET productname=$1, itemcount=$2, description=$3 WHERE sku=$4 RETURNING *;

        `, [productName, itemCount, description, sku]);

    const returnedRow = results.rows[0]
    let resp = {
        sku: sku,
        productName: returnedRow.productname,
        itemCount: returnedRow.itemcount,
        description: returnedRow.description,
        createdAt: returnedRow.created_at,
        updatedAt: returnedRow.updated_at



    }
    return resp
}
/**
 * 
 * @param {String} sku 
 * @returns {{sku: String}}
 */
export const deleteItem = async (sku) => {
    await db.query(`
        DELETE FROM inventorylist WHERE sku=$1;
    
        `, [sku]);


    let resp = {
        sku: sku,
    }
    return resp
}
