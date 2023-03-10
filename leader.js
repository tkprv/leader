import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { Tag } from 'primereact/tag';

const Leader = () => {
  const location = useLocation()
  const [confirm, setConfirm] = useState('');
  const [noconfirm, setNoconfirm] = useState('');
  const [position, setPosition] = useState('center');
  const [fiscalyear, setFiscalyear] = useState([]);
  const [sectionproject, setSectionproject] = useState([]);
  const [userproject, setUserproject] = useState([]);
  const [plannameproject, setPlannameproject] = useState([]);
  const [strategicproject, setStrategicproject] = useState([]);
  const [goalproject, setGoalproject] = useState([]);
  const [tacticproject, setTacticproject] = useState([]);
  const [integrationproject, setIntegrationproject] = useState([]);
  const [objectiveproject, setObjectiveproject] = useState([]);
  const [indicproject, setIndicproject] = useState([]);
  const [stepproject, setStepproject] = useState([]);
  const [workplanproject, setWorkplanproject] = useState([]);
  const [chargesproject, setChargesproject] = useState([]);
  const [benefitproject, setBenefitproject] = useState([]);
  const [comment, setComment] = useState('');
  const [labelcomment, setLabelcomment] = useState([]);
  const [commentproject, setCommentproject] = useState([]);
  const [id, setId] = useState("")
  const [displayBasic, setDisplayBasic] = useState(false)
  const [times1, setTimes1] = useState()
  const [dates1, setDates1] = useState()

  console.log('44', location.state)
  useEffect(() => {
    getfiscalyear()
    getsection()
    getuser()
    getplanname()
    getstrategic()
    getgoal()
    gettactic()
    getintegration()
    getobjective()
    getindic()
    getstep()
    getworkplan()
    getcharges()
    getbenefit()
    getcomment()
  }, []);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    'confirm': setConfirm,
    'noconfirm': setNoconfirm
  }

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }

  const show = (id) => {
    setDisplayBasic(true);
    setId(id)

  }
  
  const workposition = (node) => {
    if(node.director === 1) {
      return '???????????????????????????'
    } else if(node.manager === 1){
      return '??????????????????????????????????????????????????????'
    } else if(node.supervisor === 1){
      return '?????????????????????????????????'
    } else if(node.supplies === 1){
      return '????????????????????????????????????????????????'
    } else if(node.responsible === 1){
      return '?????????????????????????????????????????????????????????'
    } else if(node.admin === 1){
      return '?????????????????????????????????'
    } 
  }

  const renderFooter1 = (name) => {
    return (
      <div>
        <Button label="??????????????????" icon="pi pi-times" className="p-button-danger" onClick={() => onHide(name)} />
        <Button label="?????????????????????" icon="pi pi-check" className="p-button-success" onClick={() => confirmleader(location.state.project_id, 1)} />
      </div>
    );
  }

  const renderFooter2 = (name) => {
    return (
      <div>
        <Button label="??????????????????" icon="pi pi-times" className="p-button-danger" onClick={() => onHide(name)} />
        <Button label="?????????" icon="pi pi-check" className="p-button-success" style={{ width: '17%' }} onClick={() => noconfirmleader(location.state.project_id, 2)} />
      </div>
    );
  }

  const getfiscalyear = async () => {
    await axios
      .get(`http://localhost:3001/fiscalyearproject/${location.state.fiscalyear_id}`)
      .then((res) => {
        console.log(res.data.fiscalyear)
        setFiscalyear(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', fiscalyear?.fiscalyear)

  const getsection = async () => {
    // try{
    //   const {data} = await axios.get(`http://localhost:3001/sectionproject/${location.state.section_id}`)
    //   console.log(data)
    //   setSectionproject(data)
    // }catch(e){
    //   //handle error
    // }
    axios
      .get(`http://localhost:3001/sectionproject/${location.state.section_id}`, {})
      .then((res) => {
        console.log(res.data)
        setSectionproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('section', sectionproject?.section_name)
  
  const getuser = () => {
    axios
      .get(`http://localhost:3001/userproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setUserproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('22', userproject)

  const getplanname = async () => {
    await axios
      .get(`http://localhost:3001/fiscalyearproject/${location.state.fiscalyear_id}`)
      .then((res) => {
        console.log(res.data.data)
        setPlannameproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('33', plannameproject?.plan_name)

  const getstrategic = async () => {
    await axios
      .get(`http://localhost:3001/strategicproject/${location.state.strategic_id}`)
      .then((res) => {
        console.log(res.data.data)
        setStrategicproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('44', strategicproject?.strategic_name)

  const getgoal = async () => {
    await axios
      .get(`http://localhost:3001/goalproject/${location.state.goal_id}`)
      .then((res) => {
        console.log(res.data.data)
        setGoalproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('55', goalproject?.goal_name)

  const gettactic = async () => {
    await axios
      .get(`http://localhost:3001/tacticproject/${location.state.tactic_id}`)
      .then((res) => {
        console.log(res.data.data)
        setTacticproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('66', tacticproject?.tactic_name)

  const getintegration = async () => {
    await axios
      .get(`http://localhost:3001/integrationproject/${location.state.integration_id}`)
      .then((res) => {
        console.log(res.data.data)
        setIntegrationproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('77', integrationproject?.integration_name)

  const getobjective = async () => {
    await axios
      .get(`http://localhost:3001/objectiveproject/${location.state.project_id}`)
      .then((res) => {
        console.log(res.data.data)
        setObjectiveproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('88', objectiveproject)

 
  const getindic = () => {
    axios
    .get(`http://localhost:3001/indicproject/${location.state.project_id}`, {})
    .then((res) => {
      console.log(res.data)
      setIndicproject(res.data)
    }).catch((error) => {
      console.log(error)
    });
  }
  console.log('99', indicproject)

  const getstep = () => {
    axios
    .get(`http://localhost:3001/stepproject/${location.state.project_id}`, {})
    .then((res) => {
      console.log(res.data)
      setStepproject(res.data)
    }).catch((error) => {
      console.log(error)
    });
  }
  console.log('100', stepproject)

  const getworkplan = () => {
    axios
    .get(`http://localhost:3001/workplanproject/${location.state.workplan_id}`, {})
    .then((res) => {
      console.log(res.data)
      setWorkplanproject(res.data)
    }).catch((error) => {
      console.log(error)
    });
  }
  console.log('101', workplanproject?.workplan_name)

  const getcharges = () => {
    axios
      .get(`http://localhost:3001/chargesproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setChargesproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('102', chargesproject)

  const getbenefit = () => {
    axios
    .get(`http://localhost:3001/benefitproject/${location.state.project_id}`, {})
    .then((res) => {
      console.log(res.data)
      setBenefitproject(res.data)
    }).catch((error) => {
      console.log(error)
    });
  }
  console.log('103', benefitproject?.benefit_name)

  const confirmleader = (id, n) => {
    console.log('tt', id)
    console.log('rr', n)
    axios
      .put(`http://localhost:3001/confirmleader/${id}`, {
        status: n
      })
    alert(`????????????????????? id${id} sucessful`)
  }

  const noconfirmleader = async (id, n) => {
    console.log('tt', id)
    console.log('rr', n)
    console.log('comment', comment)
    const time1 = moment(times1).format('h:mm:ss');
    const date1 = moment(dates1).format('YYYY-MM-DD')
    axios
      .put(`http://localhost:3001/noconfirmleader/${id}`, {
        status: n
      })
    await iscomment(id, time1, date1)
    alert(`?????????????????????????????? id${id} sucessful`)
  }

  const showcomment = () => {
    axios
      .get("http://localhost:3001/showcomment", {})
      .then((res) => {
        setLabelcomment(res.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  const iscomment = async (id, time1, date1) => {
    console.log('45', id)
    axios
      .post(`http://localhost:3001/comment`, {
        project_id: id,
        user_id: 0,
        comment: comment,
        comment_level: 1,
        time_comment: time1,
        date_comment: date1,
        comment_type: 1
      })
  }

  const getcomment = async () => {
    await axios
      .get(`http://localhost:3001/commentproject/${location.state.project_id}`)
      .then((res) => {
        console.log(res.data.data)
        setCommentproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('66', commentproject)

  return (
    <div className="tabview-demo">
      <div className="field col-12 md:col-6" style={{ marginTop: '2em' }} >
        <TabView>
          <TabPanel header="???????????????????????????????????????????????????">
            <p><h5 style={{ marginTop: '1em' }}>?????????????????????????????? : {fiscalyear?.fiscalyear}</h5></p>
            <p><h5 style={{ marginTop: '1.5em' }}>????????????????????????????????? : {location.state.project_name}</h5></p>
           {sectionproject !== undefined ? <p><h5 style={{ marginTop: '1.5em' }}>????????????????????????????????????????????????????????????????????????????????? : {sectionproject?.section_name}</h5></p>: <h5>???????????????????????????????????????????????????????????????????????????</h5>}
           {userproject.map((value) => {
            return <p><h5 style={{ marginTop: '1.5em' }}>????????????????????????????????????????????????????????? : {value?.fname+' '+value?.lname}</h5></p>
           })}
            <p><h5 style={{ marginTop: '1.5em' }}>?????????????????????????????????????????????????????? : {plannameproject?.plan_name}</h5></p>
            <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>?????????????????????????????????????????????????????? : {strategicproject?.strategic_name}</h5></p>
            <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>????????????????????????????????? : {goalproject?.goal_name}</h5></p>
            <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>????????????????????? : {tacticproject?.tactic_name}</h5></p>
            <p><h5 style={{ marginTop: '1.5em' }}>???????????????????????????????????????????????? : {}</h5></p>
            <p><h5 style={{ marginTop: '1.5em' }}>??????????????????????????????????????? : {location.state.type}</h5></p>
            <p>
              <h5 style={{ marginTop: '1.5em' }}>?????????????????????????????????????????????????????? : {integrationproject?.integration_name}</h5>
              <InputTextarea value={location.state.integra_subject} style={{ marginLeft: '12.5em' }} rows={8} cols={80} />
            </p>
            <p>
              <h5 style={{ marginTop: '1.5em' }}>???????????????????????????????????????????????? : </h5>
              <InputTextarea value={location.state.rationale} style={{ marginLeft: '12.5em' }} rows={8} cols={80} />
            </p>
            {objectiveproject.map((value) => {
             return <p><h5 style={{ marginTop: '1.5em' }}>???????????????????????????????????? : {value?.objective_name}</h5></p>
            })}
            <p>
              <h5 style={{ marginTop: '1.5em' }}>?????????????????????????????????????????????????????????????????????????????????????????????</h5>
              <DataTable value={indicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                <Column field="indic_project" header="?????????????????????????????????????????????????????????" />
                <Column field="unit" header="????????????????????????" />
                <Column field="cost" header="?????????????????????????????????" />
              </DataTable>
            </p>
            <p><h5 style={{ marginTop: '1.5em' }}>??????????????????????????????????????? : {location.state.target_group}</h5></p>
            <p>
              <h5 style={{ marginTop: '1.5em' }}>?????????????????????????????????????????????????????????</h5>
              <DataTable value={stepproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                <Column field="step_name" header="?????????????????????????????????????????????????????????/???????????????????????????????????????" />
                <Column field="start" header="????????????????????????" />
                <Column field="stop" header="?????????????????????" />
              </DataTable>
            </p>
            <p><h5 style={{ marginTop: '1.5em' }}>???????????????????????????/???????????????????????????????????????????????????????????? : {location.state.source_name}</h5></p>
            <p><h5 style={{ marginTop: '1.5em' }}>????????????????????????????????????????????????????????????????????? : {location.state.butget} ?????????</h5></p>
            <p><h5 style={{ marginTop: '1.5em' }} >?????????????????? : {workplanproject?.workplan_name}</h5></p>
            <p>
              <h5 style={{ marginTop: '1.5em' }}>????????????????????????????????????????????????</h5>
              <DataTable value={chargesproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                <Column field="charges_name_head" header="????????????????????????????????????????????????" />
                <Column field="quarter_one" header="???????????????????????????????????????????????????????????? 1" />
                <Column field="quarter_two" header="???????????????????????????????????????????????????????????? 2" />
                <Column field="quarter_three" header="???????????????????????????????????????????????????????????? 3" />
                <Column field="quarter_four" header="???????????????????????????????????????????????????????????? 4" />
              </DataTable>
            </p>
            {benefitproject.map((value) => {
              return <p><h5 style={{ marginTop: '1.5em' }}>??????????????????????????????????????????????????????????????????????????? : {value?.benefit_name}</h5></p>
            })}
            <p><h5 style={{ marginTop: '1.5em' }}>?????????????????? TOR : {location.state.tor}</h5></p>
          </TabPanel>
          <TabPanel header="??????????????????????????????????????????">
            <p><h5>
              ?????????????????????????????????????????? :
              <Button label="?????????????????????" icon="pi pi-check" className="p-button-success" style={{ marginRight: '.6em', marginLeft: '.5em', width: '8%' }} onClick={() => onClick('confirm')} />
              <Dialog header="?????????????????????????????????????" visible={confirm} onHide={() => onHide('confirm')} breakpoints={{ '950x': '75vw' }} style={{ width: '40vw' }} footer={renderFooter1('confirm')}>
                <div className="field" style={{'textAlign': 'center'}}>
                  <i className="pi pi-exclamation-circle p-button-warning" style={{ 'fontSize': '8em', 'color': 'orange'}}></i>
                  <p style={{marginTop:25}}><h5>??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</h5></p>
                </div>
              </Dialog>
              <Button label="??????????????????????????????" icon="pi pi-times" className="p-button-danger" onClick={() => onClick('noconfirm')} />
              <Dialog header="???????????????????????????" visible={noconfirm} onHide={() => onHide('noconfirm')} breakpoints={{ '950x': '75vw' }} style={{ width: '40vw' }} footer={renderFooter2('noconfirm')}>
                <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={8} cols={82} />
              </Dialog>
            </h5>
            </p>
          </TabPanel>
          <TabPanel header="?????????????????????????????????">
          <DataTable value={commentproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                <Column field="comment" header="?????????????????????????????????" />
                <Column field="fname" header="????????????" />
                <Column field="lname" header="?????????????????????" />
                <Column body={workposition} header="?????????????????????" />
                <Column field="date_comment" header="???????????????????????????????????????????????????????????????" />
                <Column field="time_comment" header="??????????????????????????????????????????????????????????????????" />
              </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Leader