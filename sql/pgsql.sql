
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE inventorylist (
id SERIAL NOT NULL PRIMARY KEY,
sku VARCHAR(36) NOT NULL UNIQUE,
productName VARCHAR(45) NOT NULL UNIQUE,
itemcount NUMERIC NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
                                      

CREATE TRIGGER set_timestamp        
BEFORE UPDATE ON inventorylist
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();