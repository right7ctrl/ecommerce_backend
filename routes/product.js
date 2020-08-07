const router = require('express').Router();
const pool = require('../database/pool');
const [category, product, single, related] = require('../schema/product');


router.post('/list', async (req, res) => {
    const { error, value } = product.validate(req.body);
    console.log(error);
    console.log(value);
    if (error === undefined) {
        try {
            pool.query("SELECT COUNT(*) as count FROM product WHERE isActive = 1", (cerr, cres, cfields) => {
                pool.releaseConnection;

                if (!cerr) {
                    pool.query("SELECT id, title, price, description, thumbnail, stock, brand_id,getBrandTitleByID(product.brand_id) as brand, store_id,getStoreTitleByID(product.store_id) as store, category_id, created_at, updated_at FROM product WHERE isActive = 1 ORDER BY title ASC LIMIT ? OFFSET ?", [req.body.limit, req.body.page], (err, result, fields) => {
                        if (!error) {
                            res.status(200).json({
                                response: 1,
                                total_items:
                                    result.length,
                                total_pages: Math.ceil(cres[0].count / req.body.limit),
                                items: [...result],
                            });
                        } else {
                            res.sendStatus(500).json({
                                response: 2,
                                error: err,
                            });
                        }
                    });
                } else {
                    res.sendStatus(500).json({
                        response: 2,
                        error: err,
                    });
                }


            });
        } catch (e) {
            res.status(500).json({
                response: 2,
                error: "Bad Request",
            });
        }

    } else {
        res.status(200).json({
            response: 2,
            error: product.validate(req.body).error.details
        });
    }



});

router.post('/list/category', async (req, res) => {
    const { error, value } = category.validate(req.body);
    console.log(error);
    console.log(value);
    if (error === undefined) {
        try {
            pool.query("SELECT COUNT(*) as count FROM product WHERE isActive = 1 AND category_id = ?",[req.body.category_id], (cerr, cres, cfields) => {
                pool.releaseConnection;

                if (!cerr) {
                    pool.query("SELECT id, title, price, description, thumbnail, stock, brand_id,getBrandTitleByID(product.brand_id) as brand, store_id,getStoreTitleByID(product.store_id) as store, category_id, getCategoryNameByID(product.category_id) as category, created_at, updated_at FROM product WHERE isActive = 1 AND category_id = ? ORDER BY title ASC LIMIT ? OFFSET ?", [req.body.category_id, req.body.limit, req.body.page], (err, result, fields) => {
                        if (!error) {
                            res.status(200).json({
                                response: 1,
                                total_items:result != undefined ? result.length : 0,
                                meta: {
                                    category_name: result != undefined && result.length != 0 ? result[0].category : "default",
                                    path: "category"
                                },
                                total_pages: Math.ceil(cres != undefined && cres != 0 ? cres[0].count : 1 / req.body.limit),
                                items: [...result],
                            });
                        } else {
                            res.sendStatus(500).json({
                                response: 2,
                                error: err,
                            });
                        }
                    });
                } else {
                    res.sendStatus(500).json({
                        response: 2,
                        error: err,
                    });
                }


            });
        } catch (e) {
            res.status(500).json({
                response: 2,
                error: "Bad Request",
            });
        }

    } else {
        res.status(200).json({
            response: 2,
            error: category.validate(req.body).error
        });
    }



});


router.post('/list/related', async (req, res) => {
    const { error, value } = related.validate(req.body);
    console.log(error);
    console.log(value);
    if (error === undefined) {
        try {
            pool.query("SELECT COUNT(*) as count FROM product WHERE isActive = 1 AND category_id = ?",[req.body.category_id], (cerr, cres, cfields) => {
                pool.releaseConnection;

                if (!cerr) {
                    pool.query("SELECT id, title, price, description, thumbnail, stock, brand_id,getBrandTitleByID(product.brand_id) as brand, store_id,getStoreTitleByID(product.store_id) as store, category_id, getCategoryNameByID(product.category_id) as category, created_at, updated_at FROM product WHERE isActive = 1 AND category_id = ? ORDER BY RAND() LIMIT 12", [req.body.category_id], (err, result, fields) => {
                        if (!error) {
                            res.status(200).json({
                                response: 1,
                                total_items:result != undefined ? result.length : 0,
                                meta: {
                                    category_name: result != undefined && result.length != 0 ? result[0].category : "default",
                                    store_name: result != undefined && result.length != 0 ? result[0].store : "default",
                                    path: "related"
                                },
                                total_pages: Math.ceil(cres != undefined && cres != 0 ? cres[0].count : 1 / req.body.limit),
                                items: [...result],
                            });
                        } else {
                            res.sendStatus(500).json({
                                response: 2,
                                error: err,
                            });
                        }
                    });
                } else {
                    res.sendStatus(500).json({
                        response: 2,
                        error: err,
                    });
                }


            });
        } catch (e) {
            res.status(500).json({
                response: 2,
                error: "Bad Request",
            });
        }

    } else {
        res.status(200).json({
            response: 2,
            error: related.validate(req.body).error
        });
    }



});


router.post('/single', async (req, res) => {
    const { error, value } = single.validate(req.body);
    console.log(error);
    console.log(value);
    if (error === undefined) {
        try {
            pool.query("SELECT id, title, price, description, thumbnail, stock, brand_id,getBrandTitleByID(product.brand_id) as brand, store_id,getStoreTitleByID(product.store_id) as store, category_id, getCategoryNameByID(product.category_id) as category, created_at, updated_at FROM product WHERE isActive = 1 AND id = ? LIMIT 1", [req.body.product_id], (err, result, fields) => {
                if (!error) {
                    res.status(200).json({
                        response: 1,
                        total_items:result != undefined ? result.length : 0,
                        meta: {
                            category_name: result != undefined && result.length != 0 ? result[0].category : "default",
                            store_name: result != undefined && result.length != 0 ? result[0].store : "default"
                        },
                        items: [...result],
                    });
                } else {
                    res.sendStatus(500).json({
                        response: 2,
                        error: err,
                    });
                }
            });
        } catch (e) {
            res.status(500).json({
                response: 2,
                error: "Bad Request",
            });
        }

    } else {
        res.status(200).json({
            response: 2,
            error: single.validate(req.body).error
        });
    }
});


module.exports = router;
