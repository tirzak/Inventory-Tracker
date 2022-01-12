

import * as Collection from "../models/collection";
export const getCollectionsController = async (req, res) => {
    try {
        const results = await Collection.getCollection()

        res.status(200).json(results)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}

export const getSingleCollectionController = async (req, res) => {
    const { uuid } = req.params
    try {

        const resp = await Collection.getSingleCollection(uuid)
        res.status(200).json(resp)
    }
    catch (error) {

        res.status(500).json({ error: `${error}` })

    }
}



export const postCollectionsController = async (req, res) => {



    try {

        const { uuid } = req.body
        const { inventoryItems } = req.body
        const resp = await Collection.postCollection(uuid, inventoryItems)

        res.status(201).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}

export const deleteCollectionController = async (req, res) => {

    try {
        const { uuid, sku } = req.body
        const resp = await Collection.deleteCollection(uuid, sku)
        res.status(200).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }

}


