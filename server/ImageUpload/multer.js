const multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
    
    
  
  
    const fileFilter=(req,file,cb)=>{
      if(file.mimetype==='image/jpeg' || file.mimetype==='image/png')
      {
          cb(null,true)
      }
      else
      {
          cb({message:"Unsuported File Format"},false)
      }
    }
  
    const upload = multer({ storage: storage});

    module.exports=upload