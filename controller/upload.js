const Model = require('../models/upload')


module.exports = {
    insert: (req, res) => {
        // console.log(req.body)
        Model.create({
            urlImage : req.body.urlImage,
            quote: req.body.quote
        })
        .then((result) => {
            console.log(result)
            res.status(201).json(
                result
            )
        })
        .catch(err => {
            res.status(500).json(
                err
            )
        })
    },
    allData :(req,res)=>{
        Model.find({})
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    },
    view :(req,res)=>{
        let id = req.body._id
       // console.log(req.body._id)
        console.log(req.body, '<===================')
        Model.findOneAndUpdate({_id : id},  { 
            urlImage : req.body.urlImage,
            urlAudio : req.body.urlAudio,
            quote : req.body.quote,
            creator : req.body.creator,
            view: req.body.view 
        })
        .then((data)=>{
            console.log('masuk')
            console.log(data)
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    },
    mostViewed :(req,res)=>{
        console.log('cokkkk')
        Model.find({})
        .then((data)=>{
            function compare(a,b) {
                if (a.view > b.view)
                  return -1;
                if (a.view < b.view)
                  return 1;
                return 0;
              }
              data.sort(compare)       
              let mostViewedData = []
              for(let i=0 ; i < 5 ; i++){
                  mostViewedData.push(data[i])
              }
            
              res.status(200).json(mostViewedData)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }
}