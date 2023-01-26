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
                // res.send(result);
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    //console.log('test',row)
                    res.send(row)
                })
            }
        });
});

app.get('/sectionproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_section WHERE section_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
})

// app.get('/userproject/:id', (req, res) => {
//     // db.query("SELECT * FROM tbl_project LEFT JOIN tbl_user_project ON tbl_project.project_id = tbl_user_project.project_id", (err, result) => {
//     //     if (err) {
//     //         console.log(err);
//     //     } else {
//     //         res.send(result);
//     //     }                   
//     console.log(req.params);
//     const id = req.params.id;
//     db.query("SELECT * FROM tbl_user_project WHERE project_id = ?",
//         [id],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {                              
//                 // res.send(result);
//                 Object.keys(result).forEach(function (key) {
//                     console.log('kkkk',key);
//                     var row = result[key]
//                     //res.send(row)
//                     //console.log('test', row.user_id)
//                     db.query("SELECT * FROM tbl_user WHERE user_id = ?", [row.user_id], (err, result) => {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             Object.keys(result).forEach(function (key) {
//                                 var data = result[key]
//                                 //console.log('user',data);
//                                 res.send(data)
//                             })
//                         }
//                     })
//                 })

//             }
//         });
// });

app.get('/strategicproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_strategic WHERE strategic_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
});

app.get('/goalproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_goal WHERE goal_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
});

app.get('/tacticproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_tactic WHERE tactic_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
});

app.get('/integrationproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_integration WHERE integration_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
});

app.get('/objectiveproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_project.project_id, tbl_objective.objective_id, tbl_objective.objective_name FROM tbl_objective LEFT JOIN tbl_project ON tbl_project.project_id = tbl_objective.project_id WHERE tbl_objective.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
});

app.get('/indicproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_indic_project.indic_project_id, tbl_indic_project.indic_project, tbl_indic_project.unit, tbl_indic_project.cost, tbl_project.project_id FROM tbl_indic_project LEFT JOIN tbl_project ON tbl_project.project_id = tbl_indic_project.project_id WHERE tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    }
    )
});

app.get('/stepproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_step.step_id, tbl_step.step_name, tbl_step.start, tbl_step.stop, tbl_project.project_id FROM tbl_step LEFT JOIN tbl_project ON tbl_step.project_id = tbl_project.project_id WHERE tbl_step.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
});

app.get('/workplanproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_workplan WHERE workplan_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log('11', err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
});

app.get('/chargesproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_charges.charges_id, tbl_charges.charges_name_head, tbl_charges.quarter_one, tbl_charges.quarter_two, tbl_charges.quarter_three, tbl_charges.quarter_four, tbl_project.project_id FROM tbl_charges LEFT JOIN tbl_project ON tbl_charges.project_id = tbl_project.project_id WHERE tbl_charges.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
});

app.get('/benefitproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_benefit.benefit_id, tbl_benefit.benefit_name, tbl_project.project_id FROM tbl_benefit LEFT JOIN tbl_project ON tbl_benefit.project_id = tbl_project.project_id WHERE tbl_benefit.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
});

app.put('/confirmleader/:id', (req, res) => {
    console.log(req)
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('11', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('status', ID)
    console.log('newstatus', status)
})

app.put('/noconfirmleader/:id', (req, res) => {
    console.log(req)
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('status', ID)
    console.log('newstatus', status)
})

app.get('/showcomment', (req, res) => {
    db.query("SELECT * FROM tbl_comment", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/comment', (req, res) => {
    const project = req.body.project_id
    const user = req.body.user_id
    const comment = req.body.comment;
    const comment_level = req.body.comment_level
    const time_comment = req.body.time_comment
    const date_comment = req.body.date_comment
    const comment_type = req.body.comment_type
    console.log('comment', req.body)
    db.query("INSERT INTO tbl_comment (project_id, user_id, comment, comment_level, time_comment, date_comment, comment_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [project, user, comment, comment_level, time_comment, date_comment, comment_type],
        (err, result) => {
            if (err) {
                console.log('13', err)
            } else {
                res.send("Values Inserted")
            }
        })
})

app.get('/commentproject/:id', (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_comment.comment_id, tbl_comment.comment, tbl_comment.time_comment, tbl_comment.date_comment, tbl_project.project_id, tbl_user.user_id, tbl_user.fname, tbl_user.lname, tbl_user.director, tbl_user.manager, tbl_user.supervisor, tbl_user.supplies, tbl_user.responsible, tbl_user.admin FROM tbl_comment LEFT JOIN tbl_project ON tbl_comment.project_id = tbl_project.project_id LEFT JOIN tbl_user ON tbl_comment.user_id = tbl_user.user_id WHERE tbl_comment.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
});

app.listen('3001', () => {
    console.log("Server is running on port 3001");
})