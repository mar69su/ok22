import {useState, useEffect} from 'react';
import AdminTmtblPgEdit from './AdminTmtblPgEdit';
import AdminTmtblPgList from './AdminTmtblPgList';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const AdminTmtblPage = (props) => {

    const [tabKey, setTabKey] = useState('list');

    const editTimetable = (id) => {
        props.getTimetable(id);
        setTabKey("edit");
    }

    const removeTimetable = (id) => {
        props.removeTimetable(id);
    }

    useEffect(() => {
		props.getTimetablesList();
	}, [])

    return (
        <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
	        <Tab eventKey="list" title="Timetables">
                <br />
                <AdminTmtblPgList editTimetable={editTimetable} removeTimetable={removeTimetable} timetablesList={props.timetablesList} />
	        </Tab>
	        <Tab eventKey="edit" title="Edit">
                <br />
                <AdminTmtblPgEdit timetable={props.timetable}  updateTimetableForm={props.updateTimetableForm} updateTimetableNewRow={props.updateTimetableNewRow} updateTimetableEditRow={props.updateTimetableEditRow} updateTimetableRemoveRow={props.updateTimetableRemoveRow} saveTimetable={props.saveTimetable} saveAsNewTimetable={props.saveAsNewTimetable} clearTimetable={props.clearTimetable} />
        	</Tab>
        </Tabs>
    )
}

export default AdminTmtblPage;