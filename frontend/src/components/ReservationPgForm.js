import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';

const ReservationPageForm = (props) => {

    const vehicles = ["Car", "Car with trailer", "Car with caravan", "Consumer Trucks", "Semi-Truck", "Bus", "Tractor", "SUV", "Van", "Campervan"];

    const onChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        if (name === "licencePlate") {
            value = value.toUpperCase();
        }
        props.setState((state) => {
            return {
                ...state,
                [name]: value
            }
        })
    }

    const onInDockChange = (event) => {
        let outDocks = props.state.tours[props.state.tourCursor].map((tour, index) => {
            return [index, tour.dock];
        });
        let inDock = event.target.value;
        let index = parseInt(inDock.charAt(inDock.length-1)) + 1;
        outDocks.splice(0, index);
        if (index === 0) {
            outDocks.splice(outDocks.length - 1, 1);
        }
        props.setState((state) => {
            return {
                ...state,
                inDock: inDock,
                outDocks: outDocks,
                outDock: outDocks[0][0]
            }
        })
    }

    const onOutDockChange = (event) => {
        props.setState((state) => {
            return {
                ...state,
                outDock: event.target.value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Form onSubmit={onSubmit}>
            <Container>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Starting dock</Form.Label>
                            <Form.Select id="inDock" name="inDock" value={props.state.inDock} onChange={onInDockChange}>
                                {props.state.inDocks.map((dock, index) => (
                                    <option key={"in" + index} value={dock[0]}>{dock[1]}</option>
                            ))}</Form.Select>
                    </Form.Group>
                </Col></Row>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Destination dock</Form.Label>
                            <Form.Select id="outDock" name="outDock" value={props.state.outDock} onChange={onOutDockChange}>
                                {props.state.outDocks.map((dock, index) => (
                                    <option key={"out" + index} value={dock[0]}>{dock[1]}</option>
                            ))}</Form.Select>
                    </Form.Group>
                </Col></Row>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Vehicle</Form.Label>
                            <Form.Select id="vehicle" name="vehicle" value={props.state.vehicle} onChange={onChange}>
                                {vehicles.map((vehicle, index) => (
                                    <option key={"v" + index} value={vehicle}>{vehicle}</option>
                            ))}</Form.Select>
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
                </Col></Row>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="phone"
                            id="telephone"
                            name="telephone"
                            placeholder="Telephone"
                            aria-label="Telephone"
                            onChange={onChange}
                            value={props.state.telephone}
                        />
                    </Form.Group>
                    <br />
                    <Button as="input" type="submit" value="Make Reservation" className="btn btn-primary btn-sm" onClick={() => props.addReservation()} /><br />
                </Col></Row>
            </Container>
        </Form>
    )
}

export default ReservationPageForm;