

import * as Group from "../models/group";
export const getGroupsController = async (req,res) =>{
    try{ 
        const results = await Group.getGroup()
        
        res.status(200).json(results)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }
}

export const getSingleGroupController = async (req,res) =>{
    const {uuid}=req.params
    try{ 
       
        const resp = await Group.getSingleGroup(uuid)
        res.status(200).json(resp)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }
}



export const postGroupsController = async (req,res) =>{

    const {groupName} = req.body
    try{ 


        const resp = await Group.postGroup(groupName)
      
      res.status(201).json(resp)
    }
    catch (error){
       res.status(500).json({error: `${error}`})

    }
}

export const updateGroupController = async (req,res) =>{

    try{ 
        const {uuid} = req.params
        const {groupName} = req.body
      const resp = await Group.updateGroup(groupName,uuid)
     
      res.status(200).json(resp)
    }
    catch (error){
     
      res.status(500).json({error: `${error}`})

    }
}


export const deleteGroupController = async (req,res) =>{
   

   
    const {uuid} = req.params
    
    
    try{ 
      const resp = await Group.deleteGroup(uuid)

      res.status(200).json(resp)
    }
    catch (error){
      res.status(500).json({error: `${error}`})

    }

}


