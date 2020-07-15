const router = require('express').Router();
const pool = require('../database/pool');
const store = require('../schema/store');

//store products

router.post('/products', async (req, res) => {
    const { error, value } = store.validate(req.body);
    console.log(error);
    console.log(value);
    if (error === undefined) {
        try {
            pool.query("SELECT COUNT(*) count FROM product WHERE isActive = 1 AND store_id = ?",[req.body.store_id], (cerr, cres, cfields) => {
                pool.releaseConnection;

                if (!cerr) {
                    pool.query("SELECT id, title, price, description, thumbnail, stock, brand_id,getBrandTitleByID(product.brand_id) as brand, store_id,getStoreTitleByID(product.store_id) as store, category_id, created_at, updated_at FROM product WHERE isActive = 1 AND store_id = ? ORDER BY title ASC LIMIT ? OFFSET ?", [req.body.store_id, req.body.limit, req.body.page], (err, result, fields) => {
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
            error: store.validate(req.body).error.details
        });
    }



});


module.exports = router;