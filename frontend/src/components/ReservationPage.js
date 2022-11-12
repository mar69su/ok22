import {useState, useEffect} from 'react';
import ReservationPgCancel from './ReservationPgCancel';
import ReservationPgDate from './ReservationPgDate';
import ReservationPgForm from './ReservationPgForm';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const ReservationPage = (props) => {

    const [state, setState] = useState({
        date: "",
        tours: [],
        tourCursor: 0,
        inDocks: [],
        outDocks: [],
        inDock: "",
        outDock: "",
        vehicle: "Car",
        licencePlate: "",
        telephone: "",
        reservationID: ""
    });

    useEffect(() => {
		props.clearReservation();
	}, [])

    const [tabKey, setTabKey] = useState("step1");

    const goToStepTwo = (index) => {
        let j = 0;
        for (let i = 0; i < state.tours.length; i++) {
            j += state.tours[i].length;
            if (j > index) {
                let tempDocks = state.tours[i].map((tour, index) => {
                    return [index, tour.dock];
                });
                let inDocks = [...tempDocks];
                inDocks.splice(inDocks.length - 1, 1);
                let outDocks = [...tempDocks];
                outDocks.splice(0, 1);
                outDocks.splice(outDocks.length - 1, 1);
                setState((state) => {
                    return {
                        ...state,
                        tourCursor: i,
                        inDocks: inDocks,
                        outDocks: outDocks,
                        inDock: inDocks[0][0],
                        outDock: outDocks[0][0]
                    }
                })
                break;
            }
        }
        setTabKey("step2");
    }

    const addReservation = () => {
        let reservation = {
            date: state.date,
            tourOfDay: state.tourCursor,
            inDockOfTour: state.inDock,
            outDockOfTour: state.outDock,
            vehicle: state.vehicle,
            licencePlate: state.licencePlate,
            telephone: state.telephone
        }
        props.addReservation(reservation);
        setTabKey("reservations");
    }

    const getReservation = () => {
        props.getReservation(state.reservationID, state.licencePlate);
    }

    return (
        <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
	        <Tab eventKey="step1" title="Step 1">
                <br />
                <ReservationPgDate state={state} setState={setState} timetableOfDay={props.timetableOfDay} getTimetableOfDay={props.getTimetableOfDay} goToStepTwo={goToStepTwo} />
	        </Tab>
	        <Tab eventKey="step2" title="Step 2" disabled={state.inDock ? false : true}>
                <br />
                <ReservationPgForm state={state}  setState={setState} addReservation={addReservation} />
        	</Tab>
	        <Tab eventKey="reservations" title="Reservations">
                <br />
                <ReservationPgCancel state={state}  setState={setState} getReservation={getReservation} reservation={props.reservation} cancelReservation={props.cancelReservation} />
	        </Tab>
        </Tabs>
    )
}

export default ReservationPage;