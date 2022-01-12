



import { db } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { updateProductCount, getSingleGroup } from './group';
export const getCollection = async () => {

    const results = await db.query(`
    SELECT
    i.sku ,
    i.description 
    ,i.productname as "productName",
    g.groupname as "groupName"
    FROM collections c
    INNER JOIN grouplist g
        ON g.group_id = c.group_id
    INNER JOIN inventorylist i
        ON i.item_id = c.item_id
    ORDER BY c.updated_at DESC;
`);
    return results.rows



}

export const getSingleCollection = async (uuid) => {

    let getGroupDetails = await getSingleGroup(uuid)
    let groupDetails = getGroupDetails[0]

    if (groupDetails.productCount > 0) {

        const results = await db.query(`
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
  
      `, [uuid]);
        return results.rows
    }
    else {
        return [{ groupName: `${groupDetails.groupName}`, message: "Empty" }]
    }



}



export const postCollection = async (uuid, inventoryItems) => {


    const selectGroupId = await db.query('SELECT group_id as "groupId" FROM grouplist WHERE uuid=$1', [uuid])
    let { groupId } = selectGroupId.rows[0]


    const results = await db.query(`
    INSERT INTO collections (group_id, item_id) SELECT $1, item_id
      FROM inventorylist WHERE sku IN (SELECT * FROM UNNEST($2::varchar[]))`,

        [groupId, inventoryItems,
        ]);
    await updateProductCount(uuid, 1)
    let resp = {
        uuid,
    }



    return resp



}


export const deleteCollection = async (uuid, sku) => {
    db.query(`
    DELETE FROM collections WHERE group_id=(SELECT group_id from grouplist WHERE uuid=$1) AND 
    item_id=(SELECT item_id FROM inventorylist WHERE sku=$2)
    ;

  `, [uuid, sku]);

    await updateProductCount(uuid, -1)

    let resp = {
        uuid,
        sku,
    }



    return resp
}


