import {useState, useEffect} from 'react';
import AdminRsrvtnsPageDate from './AdminRsrvtnsPageDate';
import AdminRsrvtnsPageDetails from './AdminRsrvtnsPageDetails';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const AdminRsrvtnsPage = (props) => {

    const [state, setState] = useState({
        date: "",
        tours: [],
        tourCursor: 0
    });

    const goToDetails = (index) => {
        setState((state) => {
            return {
                ...state,
                tourCursor: index
            }
        })
        setTabKey("more");
    }

    const [tabKey, setTabKey] = useState("reservations");

    return (
        <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
	        <Tab eventKey="reservations" title="Reservations">
                <br />
                <AdminRsrvtnsPageDate state={state} setState={setState} getReservationsOfDay={props.getReservationsOfDay} timetableOfDay={props.timetableOfDay} reservationsOfDay={props.reservationsOfDay} setReservationDate={props.setReservationDate} goToDetails={goToDetails} />
	        </Tab>
	        <Tab eventKey="more" title="More...">
                <AdminRsrvtnsPageDetails state={state} setState={setState} editReservation={props.editReservation} removeReservation={props.removeReservation} />
	        </Tab>
        </Tabs>
    )
}

export default AdminRsrvtnsPage