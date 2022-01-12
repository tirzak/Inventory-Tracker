import request from 'supertest'
import {app} from '../app'
import * as Group from '../models/group'
import { v4 as uuidv4 } from 'uuid';

describe("Test the paths with correct values for group Routes", () => {

    let groupName = 'testgrouphumans'
    let uuid, uuid2
    beforeAll(async ()=>{
       uuid = await Group.postGroup(groupName)
       uuid=uuid.uuid
      })
  
    test("It should get an array of objects with first row being the recently entered data", async () => {
      
      const response = await request(app).get('/api/v1/group');
      expect(response.statusCode).toBe(200);
      expect(response.body[0].groupName).toBe(groupName)
    });
  
  
    test("It should create an group object", async () => {
      
      const response = await request(app).post('/api/v1/group')
      .send({
        groupName: groupName
      })
      expect(response.statusCode).toBe(201)
      expect(response.body.groupName).toBe(groupName)
      
      
  
      uuid2=response.body.uuid
    });

    test("It should get a group object", async () => {
      
        const response = await request(app).get(`/api/v1/group/${uuid2}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.groupName).toBe(groupName)
        expect(response.body.uuid).toBe(uuid2)
        expect(response.body.productCount).toBe(0)


      });
    
  
    test("It should update the name of an group object", async () => {
      let newGroupName = 'testrobots'
      const response = await request(app).post(`/api/v1/group/${uuid2}`)
      .send({
        groupName: newGroupName,
      })
      expect(response.statusCode).toBe(200);
      expect(response.body.groupName).toBe(newGroupName);
      
    });
    test("It should get status 200 after deleting a group", async () => {
      
      const response = await request(app).delete(`/api/v1/group/${uuid2}`)
      expect(response.statusCode).toBe(200);
  
      
    });
  
    afterAll(async ()=>{
      await Group.deleteGroup(uuid)
     
  
    })
  
  
  
  });



describe("Test the paths with incorrect or empty values for group Routes", () => {

    
    test("It should fail to create a group object (illegal characters)", async () => {
      let illegalGroupName = '_ASd*'
      const response = await request(app).post('/api/v1/group')
      .send({
        groupName: illegalGroupName
      })
      expect(response.statusCode).toBe(422)
    });
    test("It should fail to create a group object (empty)", async () => {
        let illegalGroupName = ''
        const response = await request(app).post('/api/v1/group')
        .send({
          groupName: illegalGroupName
        })
        expect(response.statusCode).toBe(422)
      });
  
    test("It should fail to find a group", async () => {
      let nonExistingUUID = uuidv4()
      
      const response = await request(app).get(`/api/v1/group/${nonExistingUUID}`)
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("");
      
    });
  
  
  
  });
  
  