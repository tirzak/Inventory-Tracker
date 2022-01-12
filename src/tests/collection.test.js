import request from 'supertest'
import {app} from '../app'
import * as Item from '../models/item'
import * as Group from '../models/group'

describe("Test the paths for collection Routes", () => {

    let groupName = 'testgrouprobocop'
    let itemCount = 2 , productName = 'testmacm1', description = '120TB'
    let uuid, sku
    beforeAll(async ()=>{
       uuid = await Group.postGroup(groupName)
       uuid=uuid.uuid
       sku=await Item.postItem(productName,itemCount,description)
       sku=sku.sku
      })

    test("It should create group and item relation", async () => {
      
      const response = await request(app).post('/api/v1/collections')
      .send({
        uuid: uuid ,
        inventoryItems: [
            sku
        ]
      })
      expect(response.statusCode).toBe(201)
      expect(response.body.uuid).toBe(uuid)
      
      
  
    });

    test("It get items for a group", async () => {
      
        const response = await request(app).get(`/api/v1/collections/${uuid}`)
        expect(response.statusCode).toBe(200)
        expect(response.body[0].uuid).toBe(uuid)
        expect(response.body[0].sku).toBe(sku)
        expect(response.body[0].productName).toBe(productName)
        expect(response.body[0].groupName).toBe(groupName)

      });

    test("It should get an array of item and group relations(collections)", async () => {
      
        const response = await request(app).get('/api/v1/collections');
        expect(response.statusCode).toBe(200);
        expect(response.body[0].groupName).toBe(groupName)
        expect(response.body[0].productName).toBe(productName)

      });
  
    test("It should get status 200 after deleting a group and item relation(collection)", async () => {
      
      const response = await request(app).delete(`/api/v1/collections`)
      .send({
        uuid: uuid ,
        sku: sku
      })
      expect(response.statusCode).toBe(200);
      expect(response.body.uuid).toBe(uuid)
      expect(response.body.sku).toBe(sku)

  
      
    });
  
    afterAll(async ()=>{
      await Group.deleteGroup(uuid)
     await Item.deleteItem(sku)
  
    })
  
  
  
  });
  