
//Controller for item routes
import * as Item from "../models/item";
//Get all items
export const getItemsController = async (req, res) => {

    try {
        const results = await Item.getItem()

        res.status(200).json(results)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}
//Get a single item
export const getSingleItemController = async (req, res) => {
    const { sku } = req.params
    try {

        const resp = await Item.getSingleItem(sku)
        res.status(200).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}


//Create an item
export const postItemsController = async (req, res) => {


    try {

        const { productName, itemCount, description } = req.body

        const resp = await Item.postItem(productName, itemCount, description)

        res.status(201).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }
}
//Update an item
export const updateItemController = async (req, res) => {



    const { sku } = req.params



    try {
        const { productName, itemCount, description } = req.body
        const resp = await Item.updateItem(productName, itemCount, description, sku)

        res.status(200).json(resp)
    }
    catch (error) {

        res.status(500).json({ error: `${error}` })

    }
}

//Delete an item
export const deleteItemController = async (req, res) => {



    const { sku } = req.params



    try {
        const resp = await Item.deleteItem(sku)
        res.status(200).json(resp)
    }
    catch (error) {
        res.status(500).json({ error: `${error}` })

    }

}


