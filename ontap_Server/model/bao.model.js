var db = require('./db');
const baoSchema = new db.mongoose.Schema(
    {
        tieude: {type: String, required:true},
        noidung: {type: String, required:true},
        image: {type: String, required:false},
        status: {type:String,required:true},
    },
    {
        collection: 'quanly'
    }
);

let baoModel = db.mongoose.model('baoModel',baoSchema);

module.exports = {baoModel}