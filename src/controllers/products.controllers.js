import * as ProductServices from "../services/products.services.js"
import {STATUS} from "../constants/constants.js"

export async function getProducts(req, res){
    const {limit,page} = req.query
    
    
    let limitQuery = parseInt(limit)
    let pageQuery = parseInt(page)

    
    if(!limit){limitQuery=10}
    if(!page){pageQuery=1}
    
    let options = {
        page: pageQuery,
        limit: limitQuery,
        lean: true
    }
    
    try {
        console.log(options.page, options.limit)
        const response = await ProductServices.getProducts(options)
       
        res.json({
            products: response,
            status: STATUS.SUCCES
        });
        

    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL
        })
    }
}

export async function getProductById(req, res){
    try {
        const {idProduct} = req.params
        const response = await ProductServices.getProductById(idProduct)
        res.json({
            product: response,
            status: STATUS.SUCCES
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL
        })
    }
}

export async function addProduct(req, res){
    try {
        const {body} = req
        const response = await ProductServices.addProduct(body)
        res.status(201).json({
            products: response,
            status: STATUS.SUCCES
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL
        })
    }
}

export async function updateProduct(req, res){
    try {
        const {idProduct} = req.params
        const {body} = req
        const response = await ProductServices.updateProduct(idProduct, body)
        res.status(201).json({
            product: response,
            status: STATUS.SUCCES
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL
        })
    }
}

export async function deleteProduct(req, res){
    try {
        const {idProduct} = req.params
        await ProductServices.deleteProduct(idProduct)
        res.status(201).json({
            message: "Producto borrado",
            status: STATUS.SUCCES
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAIL
        })
    }
}