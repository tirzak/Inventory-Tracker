
CREATE DATABASE shopifyinventorydatabase;
CREATE USER shopifyinventoryuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE shopifyinventorydatabase TO shopifyinventoryuser;

\c shopifyinventorydatabase;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE inventorylist (
item_id INT GENERATED ALWAYS AS IDENTITY,
sku VARCHAR(36) NOT NULL UNIQUE,
productname VARCHAR(45) NOT NULL,
itemcount NUMERIC NOT NULL,
description VARCHAR(56) NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(item_id)
);
                                      

CREATE TRIGGER set_inventorytimestamp        
BEFORE UPDATE ON inventorylist
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


CREATE TABLE grouplist (
group_id INT GENERATED ALWAYS AS IDENTITY,
uuid VARCHAR(36) NOT NULL UNIQUE,
groupname VARCHAR(45) NOT NULL,
productcount INT NOT NULL DEFAULT 0,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(group_id)
);

CREATE TRIGGER set_inventorytimestamp         
BEFORE UPDATE ON grouplist
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


CREATE TABLE collections (
collection_id INT GENERATED ALWAYS AS IDENTITY,
group_id INT,
item_id INT,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 PRIMARY KEY(collection_id),
 CONSTRAINT fk_group
      FOREIGN KEY(group_id) 
	    REFERENCES grouplist(group_id)
      ON DELETE CASCADE,
   CONSTRAINT fk_inventory
      FOREIGN KEY(item_id) 
	    REFERENCES inventorylist(item_id)
      ON DELETE CASCADE
);


CREATE TRIGGER set_collectionstimestamp        
BEFORE UPDATE ON collections
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO shopifyinventoryuser;