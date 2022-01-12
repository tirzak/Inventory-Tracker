import request from 'supertest'
import {app} from '../app'
import * as Group from '../models/group'

describe("Test the paths for group Routes", () => {

    let groupName = 'humans'
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
  
    test("It should update the name of an group object", async () => {
      let newGroupName = 'robots'
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
  