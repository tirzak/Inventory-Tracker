INSERT INTO grouplist (groupname, uuid, productcount)
VALUES ('your_new_collection','cc8c456c-c5de-473a-9df7-a9ed5c614d66',2);

INSERT INTO inventorylist (productname, itemcount, sku, description)
VALUES ('Your New Phone',3,'469a72e4-db8a-4aa6-b47f-df8d4929cb4e', '128 GB');

INSERT INTO inventorylist (productname, itemcount,sku,description)
VALUES ('Your New Laptop',2,'426cd8e5-4bc2-456f-90fa-da60994e6190', '512 GB');


INSERT INTO collections (group_id, item_id)
  SELECT
    (SELECT group_id FROM grouplist WHERE uuid='cc8c456c-c5de-473a-9df7-a9ed5c614d66'),
    (SELECT item_id FROM inventorylist WHERE sku='426cd8e5-4bc2-456f-90fa-da60994e6190');


INSERT INTO collections (group_id, item_id)
  SELECT
    (SELECT group_id FROM grouplist WHERE uuid='cc8c456c-c5de-473a-9df7-a9ed5c614d66'),
    (SELECT item_id FROM inventorylist WHERE sku='469a72e4-db8a-4aa6-b47f-df8d4929cb4e');