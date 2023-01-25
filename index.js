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

// app.get('/objectiveproject/:id', (req, res) => {
//     const ID = req.params.id;
//     db.query(
//         "SELECT * FROM tbl_objective WHERE project_id = ?",
//         [ID],
//         (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 Object.keys(result).forEach(function (key) {
//                     var row = result[key];
//                     res.send(row)
//                 })
//             }
//         }
//     )
//     console.log('11',ID)
// });

// app.get('/indicproject/:id', (req, res) => {
//     const ID = req.params.id;
//     db.query("SELECT * FROM tbl_indic_project WHERE project_id = ?",
//         [ID],
//         (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 Object.keys(result).forEach(function (key) {
//                     var row = result[key];
//                     res.send(row)
//                 })
//             }
//         }
//     )
// });

// app.get('/stepproject/:id', (req, res) => {
//     const ID = req.params.id;
//     db.query("SELECT * FROM tbl_step WHERE project_id = ?",
//         [ID],
//         (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 Object.keys(result).forEach(function (key) {
//                     var row = result[key];
//                     res.send(row)
//                 })
//             }
//         }
//     )
//     console.log('166',ID)
// });

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

// app.get('/chargesproject', (req, res) => {
//     const ID = req.params.id;
//     db.query("SELECT * FROM tbl_charges WHERE project_id = ?",
//         [ID],
//         (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 Object.keys(result).forEach(function (key) {
//                     var row = result[key];
//                     res.send(row)
//                 })
//             }
//         }
//     )
// });

// app.get('/benefitproject/:id', (req, res) => {
//     const ID = req.params.id;
//     db.query(
//         "SELECT * FROM tbl_benefit WHERE project_id = ?",
//         [ID],
//         (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 Object.keys(result).forEach(function (key) {
//                     var row = result[key];
//                     res.send(row)
//                 })
//             }
//         }
//     )
// });

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

app.get('/getcomment', (req, res) => {
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

app.listen('3001', () => {
    console.log("Server is running on port 3001");
})