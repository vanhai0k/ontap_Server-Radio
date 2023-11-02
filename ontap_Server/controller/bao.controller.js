const myModel = require('../model/bao.model');

// danh sach
exports.list = async (req,res,next)=>{

    // tim kiem
    let du_lieu=null;
    if(typeof(req.query.tieude)!= 'undefined'){
        du_lieu = {tieude:req.query.tieude};
    }

    let list = await myModel.baoModel.find(du_lieu);

    res.render('bao/list',{list:list});
}

// add
exports.addBao = async (req,res,next)=>{

    if(req.method =="POST"){

        let objB = new myModel.baoModel();
        objB.tieude = req.body.tieude;
        objB.noidung = req.body.noidung;
        objB.image = req.file.filename;
        objB.status = req.body.status;

        try{

            let new_bao = await objB.save();
            console.log(new_bao);
            msg = "Them thanh cong";
        }catch(err){
            console.log(err);
        }
    }

    res.render('bao/addB');
}

// update
exports.editBao = async (req,res,next)=>{

    let msg='';
    let objB = await myModel.baoModel.findById(req.params.idb);
    console.log(objB);

    if(req.method == 'POST'){
        let objB = new myModel.baoModel();
        objB.tieude = req.body.tieude;
        objB.noidung = req.body.noidung;
        objB.image = req.file.filename;
        objB._id = req.params.idb;
        objB.status = req.body.status;

        try{

            await myModel.baoModel.findOneAndUpdate( {_id: req.params.idb},objB)
            console.log(new_bao);
            msg = "Update thanh cong";
        }catch(err){
            console.log(err);
            msg = 'Lỗi ' + err.message;
        }
    }


    res.render('bao/editB',{msg:msg, objB:objB});
}

// delete
exports.deleteSP = async (req,res,next)=>{

    let msg = '';
    try{
        let id = req.params.id;
        var bao_delete = await myModel.baoModel.findByIdAndDelete(id);
        if(!bao_delete){
            msg='Xoa that bai';
            console.log(msg);
        }else{
            msg='da xoa';
            res.redirect('/sp/list');
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
// chitiet
exports.chitietBao = async (req,res,next)=>{
    let id = req.params.id;
    let objB = await myModel.baoModel.findById(id);

    if(req.method == "POST"){
        objB.status = req.status;

        try {
            let up= await objB.save();
            if (up){
                console.log("update thành công");
                res.redirect('/sp/list');
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    // let msg='';
    // let objB = await myModel.baoModel.findById(req.params.id);
    // console.log(objB);

    // if(req.method == 'POST'){
    //     let objB = new myModel.baoModel();
    //     objB.tieude = req.body.tieude;
    //     objB.noidung = req.body.noidung;
    //     objB.image = req.file.filename;
    //     objB._id = req.params.id;
    //     objB.status = req.body.status;

    //     try{

    //         await myModel.baoModel.findOneAndUpdate( {_id: req.params.id},objB)
    //         console.log(new_bao);
    //         msg = "Update thanh cong";
    //     }catch(err){
    //         console.log(err);
    //         msg = 'Lỗi ' + err.message;
    //     }
    // }
    res.render('bao/chitietB',{ objB:objB});
}