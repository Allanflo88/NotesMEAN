//imports
var ObjectID = require("mongodb").ObjectID;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Modelcreation
var NoteSchema = new Schema({
    title: String,
    text: String,
    date: {type: Date, default: Date.now}
});

//Instantiating Model
var Note = mongoose.model("Note", NoteSchema);

module.exports = function (app){
    app.post("/notes", (req, res) =>{
        var note = new Note(req.body);
        note.save((err, result) =>{
            if(err)
                res.send(err);
            else
                res.send(result);
        })
    });
    
    app.get("/notes/:id", (req, res) => {
        const id = req.params.id;
        //Creating de ObjectID
        const details = {"_id": new ObjectID(id)};
        Note.findOne(details, (err, item) => {
            if(err)
                res.send({"error": "An error has ocurred"});
            else
                res.send(item);
        })
    });

    app.delete("/notes/:id", (req,res) =>{
        const id = req.params.id;
        const details = {"_id": new ObjectID(id)};
        Note.remove(details, (err, item) =>{
            if(err)
                res.send({"error": "An error has ocurred"});
            else
                res.send("Note " + id + " deleted");
        })
    })

    app.put("/notes/:id", (req, res) =>{
        const id = req.params.id;
        const details = {"_id": new ObjectID(id)};

        Note.update(details, req.body, (err, result) =>{
            if(err)
                res.send({"error": "An error has ocurred"});
            else
                res.send(req.body);
        })
    });

    app.get("/notes", (req, res) =>{
       Note.find({}, function (err, item){
            if(err)
                res.send({"error": "An error has ocurred"});
            else
                res.send(item);
       });
    });

}