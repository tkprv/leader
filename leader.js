import React, { useState, useEffect} from 'react'
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

const Leader = () => {
        const location = useLocation()
        const [confirm, setConfirm] = useState('');
        const [noconfirm, setNoconfirm] = useState('');
        const [position, setPosition] = useState('center');
        const [commentlevel, setCommentlevel] = useState('');
        const [fiscalyear1, setFiscalyear1] = useState();
        const [userproject, setUserproject] = useState([]);
        const [objectiveproject, setObjectiveproject] = useState([]);
        const [indicproject, setIndicproject] = useState([]);
        const [stepproject, setStepproject] = useState([]);
        const [chargesproject, setChargesproject] = useState([]);
        const [benefitproject, setBenefitproject] = useState([]);
        const [comment, setComment] = useState('');
        const [labelcomment, setLabelcomment] = useState([]);
        const [id, setId] = useState("")
        const [displayBasic, setDisplayBasic] = useState(false)
        const [times1,setTimes1] = useState()
        const [dates1,setDates1] = useState()

        console.log('44', location.state)

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
        const renderFooter1 = (name) => {
            return (
                <div>
                    <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={() => onHide(name)}/>
                    <Button label="อนุมัติ" icon="pi pi-check" className="p-button-success" onClick={()=> confirmleader(location.state.project_id,1) }/>
                </div>
            );
        }

        const renderFooter2 = (name) => {
            return (
                <div>
                    <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={() => onHide(name)}/>
                    <Button label="ส่ง" icon="pi pi-check" className="p-button-success" style={{ width:'17%' }} onClick={() => noconfirmleader(location.state.project_id,2)}/>
                </div>
            );
          }
    
       const confirmleader = (id,n) => {
        console.log('tt',id)
        console.log('rr',n)
        axios
          .put(`http://localhost:3001/confirmleader/${id}`, {
            status: n
         })
          alert(`อนุมัติ id${id} sucessful`)
      }

      const getcomment = () => {
        axios
        .get("http://localhost:3001/getcomment", {})
        .then((res) => {
        setLabelcomment(res.data);
      }).catch((error) => {
        console.log(error);
      });
    };

      const noconfirmleader = async(id,n) => {
        console.log('tt',id)
        console.log('rr',n)
        console.log('comment',comment)
        const time1 = moment(times1).format('h:mm:ss');
        const date1 = moment(dates1).format('YYYY-MM-DD')
        axios
          .put(`http://localhost:3001/noconfirmleader/${id}`, {
            status: n
         })
         await iscomment(id,time1,date1)
        alert(`ไม่อนุมัติ id${id} sucessful`)
      }

    const iscomment = (id,time1,date1) => {
        console.log('45',id)
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
        useEffect(() => {
            Fiscalyear()
          }, []);

          const Fiscalyear = async() => {
            await axios
              .get(`http://localhost:3001/fiscalyearproject/${location.state.fiscalyear_id}`,{})
              .then((res) => {
                console.log(res.data.fiscalyear)
                setFiscalyear1(res.data)
            }).catch((error) => {
                console.log(error)
              });
          }
          console.log('11',fiscalyear1)

          useEffect(() => {
            axios
              .get(`http://localhost:3001/userproject`,{})
              .then((res) => {
                console.log(res.data)
                setUserproject(res.data)
            }).catch((error) => {
                console.log(error)
              });
          }, []);
          console.log('22',userproject)

          useEffect(() => {
            axios
              .get(`http://localhost:3001/objectiveproject`,{})
              .then((res) => {
                console.log(res.data)
                setObjectiveproject(res.data)
            }).catch((error) => {
                console.log(error)
              });
          }, []);
          console.log('33',objectiveproject)

          useEffect(() => {
            axios
              .get(`http://localhost:3001/indicproject`,{})
              .then((res) => {
                console.log(res.data)
                setIndicproject(res.data)
            }).catch((error) => {
                console.log(error)
              });
          }, []);
          console.log('44',indicproject)

          useEffect(() => {
            axios
              .get(`http://localhost:3001/stepproject`,{})
              .then((res) => {
                console.log(res.data)
                setStepproject(res.data)
            }).catch((error) => {
                console.log(error)
              });
          }, []);
          console.log('55',stepproject)

          useEffect(() => {
            axios
              .get(`http://localhost:3001/chargesproject`,{})
              .then((res) => {
                console.log(res.data)
                setChargesproject(res.data)
            }).catch((error) => {
                console.log(error)
              });
          }, []);
          console.log('77',chargesproject)


          useEffect(() => {
            axios
              .get(`http://localhost:3001/benefitproject`,{})
              .then((res) => {
                console.log(res.data)
                setBenefitproject(res.data)
            }).catch((error) => {
                console.log(error)
              });
          }, []);
          console.log('77',benefitproject)

    return (
        <div className="tabview-demo">
            <div className="field col-12 md:col-6" style={{ marginTop: '2em' }} >
                <TabView>
                    <TabPanel header="รายละเอียดโครงการ">
                        <p><h5 style={{ marginTop: '1em' }}>ปีงบประมาณ : {}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em' }}>ชื่อโครงการ : {location.state.project_name}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em' }}>หน่วยงานที่รับผิดชอบโครงการ : {location.state.section_id}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em' }}>ผู้รับผิดชอบโครงการ : {location.state.user_project_id}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em' }}>ชื่อแผนยุทธ์ศาสตร์ : {location.state.plan_name_main}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>ประเด็นยุทธ์ศาสตร์ : {location.state.strategic_id}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>เป้าประสงค์ : {location.state.goal_id}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>กลยุทธ์ : {location.state.tactic_id}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em'}}>ประเภทของโครงการ : {}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em'}}>ลักษณะโครงการ : {location.state.type}</h5></p>
                        <p>
                            <h5 style={{ marginTop: '1.5em'}}>การบูรณาการโครงการ : {location.state.integration_id}</h5>
                            <InputTextarea value={location.state.integration_name} style={{ marginLeft: '12.5em'}} rows={8} cols={80} />
                        </p>
                        <p>
                            <h5 style={{ marginTop: '1.5em'}}>หลักการและเหตุผล : </h5>
                            <InputTextarea value={location.state.rationale} style={{ marginLeft: '12.5em'}} rows={8} cols={80}/>
                        </p>
                        <p><h5 style={{ marginTop: '1.5em' }}>วัตถุประสงค์ : {location.state.objective_name}</h5></p>
                        <p>
                            <h5 style={{ marginTop: '1.5em' }}>ตัวชี้วัดความสำเร็จระดับโครงการ : </h5>
                            <DataTable value={location.state.indicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                <Column field="indic_project" header="ตัวชี้วัดความสำเร็จ"/>
                                <Column field="unit" header="หน่วยนับ" />
                                <Column field="cost" header="ค่าเป้าหมาย" />
                            </DataTable>
                        </p>
                        <p><h5 style={{ marginTop: '1.5em' }}>กลุ่มเป้าหมาย : {location.state.target_group}</h5></p>
                        <p>
                            <h5 style={{ marginTop: '1.5em' }}>ขั้นตอนการดำเนินการ : </h5>
                            <DataTable value={location.state.stepproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                <Column field="step_name" header="ขั้นตอนการดำเนินการ/รายการกิจกรรม"/>
                                <Column field="start" header="เริ่มต้น" />
                                <Column field="stop" header="สิ้นสุด" />
                            </DataTable>
                        </p>
                        <p><h5 style={{ marginTop: '1.5em' }}>แหล่งเงิน/ประเภทงบประมาณที่ใช้ : {location.state.source_name}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em' }}>ปริมาณการงบประมาณที่ใช้ : {location.state.butget} บาท</h5></p>
                        <p><h5 style={{ marginTop: '1.5em' }} >แผนงาน : {location.state.workplan_id}</h5></p>
                        <p>
                            <h5 style={{ marginTop: '1.5em' }}>ประเภทการใช้จ่าย : </h5>
                            <DataTable value={location.state.chargesproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                <Column field="charges_name_head" header="ประเภทค่าใช้จ่าย" />
                                <Column field="quarter_one" header="แผ่นการใช้จ่านใตรมาส 1"/>
                                <Column field="quarter_two" header="แผ่นการใช้จ่านใตรมาส 2" />
                                <Column field="quarter_three" header="แผ่นการใช้จ่านใตรมาส 3" />
                                <Column field="quarter_four" header="แผ่นการใช้จ่านใตรมาส 4" />
                            </DataTable>
                        </p>
                        <p><h5 style={{ marginTop: '1.5em' }}>ประโยชน์ที่คาดว่าจะได้รับ : {location.state.benefit_name}</h5></p>
                        <p><h5 style={{ marginTop: '1.5em' }}>เอกสาร TOR : </h5></p>
                    </TabPanel>
                    <TabPanel header="พิจารณาโครงการ">
                        <p><h5>
                            พิจารณาโครงการ : 
                            <Button label="อนุมัติ" icon="pi pi-check" className="p-button-success" style={{ marginRight: '.6em', marginLeft: '.5em', width:'8%' }} onClick={() => onClick('confirm')}/>
                            <Dialog header="แน่ใจหรือไม่?" visible={confirm} onHide={() => onHide('confirm')} breakpoints={{'950x': '75vw'}} style={{width: '40vw'}} footer={renderFooter1('confirm')}>
                            <div className="field">
                                <i className="pi pi-exclamation-circle p-button-warning" style={{'fontSize': '8em' }}></i>
                                </div>
                                <p>คุณต้องการอนุมัติโครงการนี้ไปยังเจ้าหน้าที่ฝ่ายแผน</p>
                            </Dialog>
                            <Button label="ไม่อนุมัติ" icon="pi pi-times" className="p-button-danger" onClick={() => onClick('noconfirm')}/>
                            <Dialog header="เนื่องจาก" visible={noconfirm} onHide={() => onHide('noconfirm')} breakpoints={{'950x': '75vw'}} style={{width: '40vw'}} footer={renderFooter2('noconfirm')}>
                                <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={8} cols={82} />
                            </Dialog>
                            </h5>
                        </p>
                    </TabPanel>
                    <TabPanel header="ความคิดเห็น">
                        <p><h5 style={{ marginTop: '1em' }}>ความคิดเห็น : </h5></p>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}

export default Leader