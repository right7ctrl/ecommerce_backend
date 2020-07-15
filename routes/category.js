const router = require('express').Router();
const pool = require('../database/pool');

//get all categories
router.get('/list', (req, res) => {

    try{
        pool.query('SELECT id, title, thumbnail, parent_id FROM category WHERE isActive = 1 LIMIT 100', (err, result, fields) => {
            if(!err){
                res.status(200).json({
                    response: 1,
                    total_items: result != undefined && result.length != 0 ? result.length : 0,
                    items: result != undefined ? [...result] : [],
                });
            }else{
                res.status(500).json({
                    response: 2,
                    error: err
                });
            }
        });
    }catch(e){

    }

  

});


module.exports = router;