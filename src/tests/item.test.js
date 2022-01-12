import request from 'supertest'
import {app} from '../app'
import * as Item from '../models/item'




describe("Test the paths for inventory Routes", () => {

  let itemCount = 2 , productName = 'iphone15', description = '120TB'
  let uuid, uuid2
  beforeAll(async ()=>{
     uuid = await Item.postItem(productName,itemCount,description)
     uuid=uuid.sku
    })

  test("It should get an array of objects with first row being the recently entered data", async () => {
    
    const response = await request(app).get('/api/v1/inventory');
    expect(response.statusCode).toBe(200);
    expect(response.body[0].productName).toBe(productName)
  });


  test("It should create an item object", async () => {
    
    const response = await request(app).post('/api/v1/inventory')
    .send({
      productName: productName,
      itemCount: itemCount,
      description: description
    })
    expect(response.statusCode).toBe(201);
    expect(response.body.productName).toBe(productName)
    expect(parseInt(response.body.itemCount)).toBe(itemCount)
    expect(response.body.description).toBe(description)

    uuid2=response.body.sku
  });

  test("It should update the name of an item object", async () => {
    let newProductName = 'iphone16',newItemCount=15,newDescription='2TB'
    const response = await request(app).post(`/api/v1/inventory/${uuid2}`)
    .send({
      productName: newProductName,
      itemCount: newItemCount,
      description: newDescription
    })
    expect(response.statusCode).toBe(200);
    expect(response.body.productName).toBe(newProductName)
    expect(parseInt(response.body.itemCount)).toBe(parseInt(newItemCount))
    expect(response.body.description).toBe(newDescription)
    
  });
  test("It should get status 200 after deleting an item", async () => {
    
    const response = await request(app).delete(`/api/v1/inventory/${uuid2}`)
    expect(response.statusCode).toBe(200);

    
  });

  afterAll(async ()=>{
    await Item.deleteItem(uuid)
   

  })



});



