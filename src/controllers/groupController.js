
//Controller for group routes
import * as Group from "../models/group";

//Get all groups
export const getGroupsController = async (req, res) => {
    try {
        const results = await Group.getGroup()

        res.status(200).json(results)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}
//Get a single group
export const getSingleGroupController = async (req, res) => {
    const { uuid } = req.params
    try {

        const resp = await Group.getSingleGroup(uuid)
        res.status(200).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}


//Create a group
export const postGroupsController = async (req, res) => {

    const { groupName } = req.body
    try {


        const resp = await Group.postGroup(groupName)

        res.status(201).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}
//Update a group's name
export const updateGroupController = async (req, res) => {

    try {
        const { uuid } = req.params
        const { groupName } = req.body
        const resp = await Group.updateGroup(groupName, uuid)

        res.status(200).json(resp)
    }
    catch (error) {

        res.status(500).json({ error: `${error}` })

    }
}

//Delete a group
export const deleteGroupController = async (req, res) => {



    const { uuid } = req.params


    try {
        const resp = await Group.deleteGroup(uuid)

        res.status(200).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }

}


