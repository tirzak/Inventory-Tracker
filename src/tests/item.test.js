import request from 'supertest'
import {app} from '../app'
import * as Item from '../models/item'
import { v4 as uuidv4 } from 'uuid';
import {db} from '../database'




describe("Test the paths for inventory Routes", () => {

  let itemCount = 2 , productName = 'testiphone15', description = '120TB'
  let uuid, uuid2
  beforeAll(async ()=>{
     uuid = await Item.postItem(productName,itemCount,description)
     uuid=uuid.sku
    })

  test("It should get an array of objects with first row being the recently entered data", async () => {
    
    const response = await request(app).get('/api/v1/inventory');
    expect(response.statusCode).toBe(200);
    
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

  test("It should get an single item", async () => {
    
    const response = await request(app).get(`/api/v1/inventory/${uuid2}`);
    expect(response.statusCode).toBe(200)
    expect(response.body.sku).toBe(uuid2)
    expect(response.body.productName).toBe(productName)
    expect(parseInt(response.body.itemCount)).toBe(itemCount)
    expect(response.body.description).toBe(description)
  });

  test("It should update the name of an item object", async () => {
    let newProductName = 'testiphone16',newItemCount=15,newDescription='2TB'
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
    await db.end()

  })



});


describe("Test the paths with incorrect or empty values for group Routes", () => {

    
  test("It should fail to create an item object (illegal characters)", async () => {
    let illegalProductName = '_AS;*', illegalDescription='A'
    const response = await request(app).post('/api/v1/inventory')
    .send({
      productName: illegalProductName,
      itemCount: 1000111,
      description: illegalDescription
    })
    expect(response.statusCode).toBe(422)
    expect(response.body.errors.length).toBe(3) 
    
  });
  
  test("It should fail to create an item object (empty)", async () => {
      let illegalProductName = '', illegalDescription=''
      const response = await request(app).post('/api/v1/inventory')
      .send({
        productName: illegalProductName,
        itemCount: -1,
        description: illegalDescription
      })
      expect(response.statusCode).toBe(422)
      expect(response.body.errors.length).toBe(5) //5 violations 

    });

    test("It should fail to create an item object (too long)", async () => {
      let illegalProductName = 'sdlakjlasdkjdlajdsljsdlkjaldsaldjaslkfjqpediedjwricnrcjknecj',//48 char
      illegalDescription='sdlakjlasdkjdlajdsljsdlkjaldsaldjaslkfjqpediedjwricnrcjknecj'//60 char
      const response = await request(app).post('/api/v1/inventory')
      .send({
        productName: illegalProductName,
        itemCount: 1,
        description: illegalDescription
      })
      expect(response.statusCode).toBe(422)
      expect(response.body.errors.length).toBe(2) //2 violations 

    });


  test("It should fail to find an item", async () => {
    let nonExistingUUID = uuidv4()
    
    const response = await request(app).get(`/api/v1/inventory/${nonExistingUUID}`)
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("");
    
  });



});





