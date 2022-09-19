import sql from './db.js'

// constructor
const Person = function (person) {
  this.avatar = person.avatar,
  this.name = person.name,
  this.birthday = person.birthday,
  this.phone = person.phone,
  this.email = person.email,
  this.address = person.address
}

Person.create = (newPerson, result) => {
  console.log("newPerson:::", newPerson)
  sql.query("INSERT INTO hospital SET ?", newPerson, (err, res) => {
    if(err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    // console.log("create person:", { id: res.insertId, ...newPerson });
    result(null, { id: res.insertId, ...newPerson });
  });
};

Person.getAll = (type, result) => {
 

  sql.query("SELECT * FROM hospital", (err, res) => {
    if(err){
      console.log("error:::", err);
      result(null, err);
      return;
    }


    result(null, res);
  })
}

Person.remove = (id, result) => {
  console.log("backendID::",id)
  sql.query("DELETE FROM hospital WHERE id = ?", id, (err, res) => {
    if(err) {
      console.log("error:::", err);
      result(null, err);
      return;
    }

    if(res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("delete hospital with id:::", id);
    result(null, res);
  })
}

Person.sort = (type, result) => {
  console.log("dfdfdfdfdfdfd", type);
  sql.query(`SELECT * FROM hospital ORDER BY ${type}`,  (err, res) => {
    if(err) {
      console.log("error:::", err);
      result(null, err);
    }
    
    console.log("ORDER BY Success!", type);
    console.log("ojfidjfdjfjdfjdifjidfdfd", res)
    result(null, res);
  })
}

export default Person;
