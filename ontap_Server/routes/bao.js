var express = require('express');
var router = express.Router();
var baoController = require('../controller/bao.controller');

var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function name(req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
    }
});
const upload = multer({
    storage: storage,
}).single('image');

// dnah sach
router.get('/list',baoController.list);
// add
router.get('/addB',baoController.addBao);
router.post('/addB',upload,baoController.addBao);

// update
router.get('/editB/:idb',baoController.editBao);
router.post('/editB/:idb',upload,baoController.editBao);


// delete
router.get('/delete/:id', baoController.deleteSP );

// chitiet
router.get('/chitietB/:id',baoController.chitietBao);
router.post('/chitietB/:id',baoController.chitietBao);


module.exports = router;