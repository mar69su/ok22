import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';

const ReservationPgCancel = (props) => {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const onChange = (event) => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
        const name = event.target.name;
        let value = event.target.value;
        let tempValue = "";
        value = value.toUpperCase();
        for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < letters.length; j++) {
                if (value.charAt(i) === letters.charAt(j)) {
                    tempValue += value.charAt(i);
                }
            }
        }
        props.setState((state) => {
            return {
                ...state,
                [name]: tempValue
            }
        })
    }

    let reservationInfo = <br />;

    if (props.reservation.token) {
        const d = new Date(props.reservation.date);
        reservationInfo = (
            <Row><Col xs={3}>
                <strong>{days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate()}</strong><br />
                <strong>Tour:</strong> {props.reservation.tourOfDay}<br />
                <strong>Starting dock:</strong> {props.reservation.inDock}<br />
                <strong>Destination dock: </strong>{props.reservation.outDock}<br />
                <strong>Vehicle:</strong> {props.reservation.vehicle}<br />
                <strong>Licence plate:</strong> {props.reservation.licencePlate}<br />
                <strong>Telephone:</strong> {props.reservation.telephone}<br />
                <br />
                <Button as="input" type="submit" value="Cancel Reservation" className="btn btn-danger btn-sm" onClick={() => props.cancelReservation(props.reservation._id)} /><br />
            </Col></Row>
        )
    }

    return (
        <Form onSubmit={onSubmit}>
            <Container>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Reservation ID</Form.Label>
                        <Form.Control type="text"
                            id="reservationID"
                            name="reservationID"
                            placeholder="Reservation ID"
                            aria-label="Reservation ID"
                            onChange={onChange}
                            value={props.state.reservationID}
                        />
                    </Form.Group>
                </Col></Row>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Licence plate</Form.Label>
                        <Form.Control type="text"
                            id="licencePlate"
                            name="licencePlate"
                            placeholder="Licence Plate"
                            aria-label="Licence Plate"
                            onChange={onChange}
                            value={props.state.licencePlate}
                        />
                    </Form.Group>
                    <br />
                    <Button as="input" type="submit" value="Search Reservation" className="btn btn-primary btn-sm" onClick={props.getReservation} /><br />
                </Col></Row>
                <Row><Col xs={3}>
                    <br />
                </Col></Row>
                {reservationInfo}
            </Container>
        </Form>
    )
}

export default ReservationPgCancel;