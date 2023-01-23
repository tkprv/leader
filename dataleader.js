import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Row, Col} from 'reactstrap'
import { Dropdown } from 'primereact/dropdown'
import { useHistory } from "react-router-dom";

const Dataleader = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [userproject, setUserproject] = useState([])
  const [value2, setValue2] = useState('')
  let history = useHistory();

    const actionTemplate = (node, column) => { 
    console.log('11',node.project_id)
    console.log('22',node.user_project_id)
      return <div>
            <Button label="ดูรายละเอียด" type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/tapbar/leader", state: node })
          }>
            </Button>
        </div>;
    }

    const report1 = (node, column) => { 
        return <div>
              <Button label="ดูรายงาน" type="button" icon="pi pi-search" className="p-button-outlined p-button-secondary" >
              </Button>
          </div>;
      }

      const report2 = (node, column) => { 
        return <div>
              <Button label="ดูรายงาน" type="button" icon="pi pi-search" className="p-button-outlined p-button-secondary" >
              </Button>
          </div>;
      }

      const report3 = (node, column) => { 
        return <div>
              <Button label="ดูรายงาน" type="button" icon="pi pi-search" className="p-button-outlined p-button-secondary" >
              </Button>
          </div>;
      }

      const report4 = (node, column) => { 
        return <div>
              <Button label="ดูรายงาน" type="button" icon="pi pi-search" className="p-button-outlined p-button-secondary" >
              </Button>
          </div>;
      }

      useEffect(() => {
          axios
            .get("http://localhost:3001/fiscalyear", {})
            .then((res) => {
              setFiscalyear(res.data)
          })
            .catch((error) => {
              console.log(error)
            });
        }, []);

        const onsetFiscalyear = (e) => {
            setSelectedFiscalyear(e.value);
        }

        useEffect(() => {
          Project()
        }, []);
      const Project = () => {
          axios
          .get("http://localhost:3001/project",{})
          .then((res) => {
           setProject(res.data)
    console.log('log',res)
})
  .catch((error) => {
    console.log(error)
  });
}

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

  console.log("11111",fiscalyear)
  
    return (
        <div align='left'>
            <div className="field col-12 md:col-6"style={{ marginTop: '2em' }}>
              <Row>
                <Col xs='3'>
                <h4>ปีงบประมาณ</h4>
                <Dropdown value={selectedfiscalyear} options={fiscalyear} style={{ width: '10em' }} onChange={onsetFiscalyear} optionLabel="fiscalyear" placeholder="-เลือก-" />
                </Col>
                <Col xs='9'>
                <h4>สถานะ</h4>
                <Dropdown value={value2} style={{ width: '30em' }} onChange={(e) => setValue2(e.target.value)} placeholder="-เลือก-" />
                </Col>
              </Row>
              </div>
              <div align='left'>
                <hr width="1100"></hr>
              </div>
              <div>
                <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="project_name" header="ชื่อโครงการ"/>
                  <Column body={actionTemplate} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: '15%' }}/>
                  <Column field="status" header="สถานะ" style={{ textAlign: 'center' }}/>
                  <Column body={report1} header="รายงานความก้าวหน้าไตรมาส 1" style={{ textAlign: 'center'}}/>
                  <Column body={report2} header="รายงานความก้าวหน้าไตรมาส 2" style={{ textAlign: 'center' }}/>
                  <Column body={report3} header="รายงานความก้าวหน้าไตรมาส 3" style={{ textAlign: 'center' }}/>
                  <Column body={report4} header="รายงานความก้าวหน้าไตรมาส 4" style={{ textAlign: 'center' }}/>
                  <Column field="value" header="วันที่สร้าง" style={{ textAlign: 'center' }}/>
                  <Column field="inventoryStatus" header="เอกสารโครงการ" style={{ textAlign: 'center' }}/>
                </DataTable>
              </div>
          </div>
    );
}

export default Dataleader