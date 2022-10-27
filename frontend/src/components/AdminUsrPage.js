import {useState} from 'react';
import AdminUsrPgList from "./AdminUsrPgList";
import AdminUsrPgNew from "./AdminUsrPgNew";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const AdminUsrPage = (props) => {

    const [tabKey, setTabKey] = useState('list');

    return (
        <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
	        <Tab eventKey="list" title="Users">
                <br />
                <AdminUsrPgList editUser={props.editUser} editPassword={props.editPassword} removeUser={props.removeUser} usersList={props.usersList} />
	        </Tab>
	        <Tab eventKey="new" title="New">
                <br />
                <AdminUsrPgNew addUser={props.addUser} />
        	</Tab>
        </Tabs>
    )
}

export default AdminUsrPage;