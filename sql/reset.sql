DROP FUNCTION shopifyinventorydatabase.trigger_set_timestamp;
DROP DATABASE shopifyinventorydatabase;
DROP USER shopifyinventoryuser;


INSERT INTO collections (group_id, item_id) SELECT *  FROM
          (SELECT * FROM UNNEST (ARRAY[2]::int[])) as gr, 
          (SELECT item_id FROM inventorylist WHERE sku = (SELECT * FROM UNNEST(ARRAY['246414af-db79-4414-a582-10ffdc021e8d']::varchar[]))) AS k;


          INSERT INTO collections (group_id, item_id) SELECT * FROM
          (SELECT * FROM UNNEST (ARRAY[2]::int[])) AS gr, 
          (SELECT item_id FROM inventorylist WHERE sku = (SELECT * FROM UNNEST(ARRAY['246414af-db79-4414-a582-10ffdc021e8d']::varchar[]))) AS item;



SELECT
    i.sku ,
    i.description 
    , i.productname as "productName"
    
FROM collections c
INNER JOIN grouplist g
    ON g.group_id = c.group_id
INNER JOIN inventorylist i
    ON i.item_id = c.item_id
WHERE g.uuid='3453628e-ff22-43f6-83bd-3a9d121f5ecb';