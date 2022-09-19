import Person from '../models/person.model.js';
import upload from '../middlewares/upload.js';

export const create = (req, res) => {
  console.log("creatRequest:::", req.body);
  console.log("uploadFile:::", req.files);
  if(!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  const person = new Person({
    avatar: `uploads/${req.files.avatar.name}`,
    name: req.body.name,
    birthday: req.body.birthday,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address
  })

  console.log("person:::", person);
  Person.create(person, (err, data) => {
    if(err)
     res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Person."
     });
     else { upload(req, res);}
  });
};

export const findAll = (req, res) => {
  const title = req.query.type;
  if(title === undefined){
    return res.status(400).send("TYPE VALUE NOT FOUND")
  }
  console.log("title:::", title);
  Person.getAll(title, (err, data) => {
    if(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hospital."
      })
    else res.send(data)
  })
}

export const deleteRow = (req, res) => {
 
  Person.remove(req.query.id, (err, data) => {
    if(err) {
      if(err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.query.id}.`
        })
      }else {
        res.status(500).send({
          message: "Could not delete Person with id" + req.params.id
        })
      }
    }
    else res.send({message: 'Person was delted successfully!'});
  })
}

export const sortBy = (req, res) => {
  console.log("sortBy:::", req.query.type)
  Person.sort(req.query.type, (err, data) => {
    if(err) {
      res.status(500).send({
        message: `Not sort person about type ${req.query.type}.`
      })
    }
    else{
      res.send({message: 'Person was Sorted successfully!', data});
    }
  })
}

export default {
  create,
  findAll,
  deleteRow,
  sortBy
}