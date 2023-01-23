const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    port: "3307"
}) 

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connected!');
})

app.get('/fiscalyear', (req, res) => {
    db.query("SELECT * FROM tbl_fiscalyear", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/project', (req, res) => {
    db.query("SELECT * FROM tbl_project", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/fiscalyearproject/:fiscalyear_id', (req, res) => {
    const fiscalyear_id = req.params.fiscalyear_id;
    db.query("SELECT * FROM tbl_fiscalyear WHERE fiscalyear_id = ?",
    [fiscalyear_id],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/userproject', (req, res) => {
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_user_project ON tbl_project.project_id = tbl_user_project.project_id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/objectiveproject', (req, res) => {
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_objective ON tbl_project.project_id = tbl_objective.project_id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/indicproject', (req, res) => {
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/stepproject', (req, res) => {
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_step ON tbl_project.project_id = tbl_step.project_id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/chargesproject', (req, res) => {
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_charges ON tbl_project.project_id = tbl_charges.project_id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.get('/benefitproject', (req, res) => {
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_benefit ON tbl_project.project_id = tbl_benefit.project_id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.put('/confirmleader/:id', (req, res) => {
  console.log(req)
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
      "UPDATE tbl_project SET status = ? WHERE project_id = ?",
      [status,ID], 
      (err, result) => {
        if (err) {
          console.log('11',err)
        } else {
          res.send(result)
        }
      }
    )
    console.log('status',ID)
    console.log('newstatus',status)
})

app.put('/noconfirmleader/:id', (req, res) => {
    console.log(req)
      const ID = req.params.id;
      const status = req.body.status;
      db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
        [status,ID], 
        (err, result) => {
          if (err) {
            console.log('12',err)
          } else {
            res.send(result)
          }
        }
      )
      console.log('status',ID)
      console.log('newstatus',status)
  })

app.get('/getcomment', (req, res) => {
    db.query("SELECT * FROM tbl_comment", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        } 
  });
});

app.post('/comment', (req,res) => {
    const project = req.body.project_id
    const user = req.body.user_id
    const comment = req.body.comment;
    const comment_level = req.body.comment_level
    const time_comment = req.body.time_comment
    const date_comment = req.body.date_comment
    const comment_type = req.body.comment_type
    console.log('comment',req.body)
  db.query("INSERT INTO tbl_comment (project_id, user_id, comment, comment_level, time_comment, date_comment, comment_type) VALUES (?, ?, ?, ?, ?, ?, ?)", 
    [project, user, comment, comment_level, time_comment, date_comment, comment_type],
    (err, result) => {
        if (err) {
           console.log('13',err)
       } else {
            res.send("Values Inserted")
         }
     })
})

app.listen('3001', () => {
    console.log("Server is running on port 3001");
})