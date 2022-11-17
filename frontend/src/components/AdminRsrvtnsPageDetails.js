import {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import Table from 'react-bootstrap/esm/Table';

const AdminRsrvtnsPageDetails = (props) => {

    const vehicles = ["Car", "Car with trailer", "Car with caravan", "Consumer Trucks", "Semi-Truck", "Bus", "Tractor", "SUV", "Van", "Campervan"];

    const [state, setState] = useState({
        removeIndex: -1,
        editIndex: -1
    });

    const onChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        if (name === "licencePlate") {
            value = value.toUpperCase();
        }
        setState((state) => {
            return {
                ...state,
                [name]: value
            }
        })
    }

	const changeMode = (mode, index) => {
		if (mode === "remove") {
            setState((state) => {
                return {
                    ...state,
                    removeIndex: index,
                    editIndex: -1
                }
            });
		}
		if (mode === "edit") {
            setState((state) => {
                return {
                    ...state,
                    removeIndex: -1,
                    editIndex: index
                }
            });
		}
		if (mode === "cancel") {
            setState((state) => {
                return {
                    ...state,
                    removeIndex: -1,
                    editIndex: -1
                }
            });
		}
	}

    const removeReservation = (id) => {
        props.removeReservation(id);
        changeMode("cancel");
    }

    const changeModeEdit = (reservation, index) => {
        let tempDocks = props.state.tours[reservation.tourOfDay].map((tour, index) => {
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
                _id: reservation._id,
                token: reservation.token,
                vehicle: reservation.vehicle,
                licencePlate: reservation.licencePlate,
                telephone: reservation.telephone,
                tourCursor: reservation.tourOfDay,
                inDocks: inDocks,
                outDocks: outDocks,
                inDock: reservation.indockOfTour,
                outDock: reservation.outdockOfTour
            }
        });
        changeMode("edit", index);
    }

    const onInDockChange = (event) => {
        let outDocks = props.state.tours[state.tourCursor].map((tour, index) => {
            return [index, tour.dock];
        });
        let inDock = parseInt(event.target.value);
        outDocks.splice(0, (inDock + 1));
        if (inDock === 0) {
            outDocks.splice(outDocks.length - 1, 1);
        }
        setState((state) => {
            return {
                ...state,
                inDock: inDock,
                outDocks: outDocks,
                outDock: outDocks[0][0]
            }
        })
    }

    const onOutDockChange = (event) => {
        setState((state) => {
            return {
                ...state,
                outDock: event.target.value
            }
        })
    }

    const editReservation = () => {
        let reservation = {
            _id: state._id,
            tourOfDay: state.tourCursor,
            inDockOfTour: state.inDock,
            outDockOfTour: state.outDock,
            vehicle: state.vehicle,
            licencePlate: state.licencePlate,
            telephone: state.telephone
        }
        props.editReservation(reservation);
        changeMode("cancel");
    }

    const vehiclesOnFerry = (items, idx) => {
        if (items.length > 0) {
            let dec = 100 * idx;
            let rows = items.map((row, ind) => {
                let index = dec + ind;
                if (state.editIndex === index) {
                    return (
                        <tr key={index}>
                            <td colSpan="4">
                                <Form.Group>
                                    <Form.Label>Starting dock</Form.Label>
                                    <Form.Select id="inDock" name="inDock" value={state.inDock} onChange={onInDockChange}>
                                        {state.inDocks.map((dock, indx) => (
                                            <option key={"in" + indx} value={dock[0]}>{dock[1]}</option>
                                    ))}</Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Destination dock</Form.Label>
                                    <Form.Select id="outDock" name="outDock" value={state.outDock} onChange={onOutDockChange}>
                                        {state.outDocks.map((dock, indx) => (
                                            <option key={"out" + indx} value={dock[0]}>{dock[1]}</option>
                                    ))}</Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Vehicle</Form.Label>
                                    <Form.Select id="vehicle" name="vehicle" value={state.vehicle} onChange={onChange}>
                                        {vehicles.map((vehicle, indx) => (
                                            <option key={"v" + indx} value={vehicle}>{vehicle}</option>
                                    ))}</Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Licence plate</Form.Label>
                                    <Form.Control type="text"
                                        id="licencePlate"
                                        name="licencePlate"
                                        placeholder="Licence Plate"
                                        aria-label="Licence Plate"
                                        onChange={onChange}
                                        value={state.licencePlate}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Telephone</Form.Label>
                                    <Form.Control type="phone"
                                        id="telephone"
                                        name="telephone"
                                        placeholder="Telephone"
                                        aria-label="Telephone"
                                        onChange={onChange}
                                        value={state.telephone}
                                    />
                                </Form.Group>
                            </td>
                            <td>
                                <Button as="input" type="submit" value="Confirm" className="btn btn-primary btn-sm" onClick={() => editReservation()} />{' '}
                                <Button as="input" type="submit" value="Cancel" className="btn btn-secondary btn-sm" onClick={() => changeMode("cancel")} />
                            </td>
                        </tr>
                    )
                }
                if (state.removeIndex === index) {
                    return (
                        <tr key={index}>
                            <td>{row.vehicle}</td>
                            <td>{row.licencePlate}</td>
                            <td>{row.telephone}</td>
                            <td>{row.destination}</td>
                            <td>
                            <Button as="input" type="submit" value="Confirm" className="btn btn-primary btn-sm" onClick={() => removeReservation(row._id)} />{' '}
                            <Button as="input" type="submit" value="Cancel" className="btn btn-secondary btn-sm" onClick={() => changeMode("cancel")} />
                            </td>
                        </tr>
                    )
                }
                return (
                    <tr key={index}>
                        <td>{row.vehicle}</td>
                        <td>{row.licencePlate}</td>
                        <td>{row.telephone}</td>
                        <td>{row.destination}</td>
                        <td>
                        <Button as="input" type="submit" value="Edit" className="btn btn-secondary btn-sm" onClick={() => changeModeEdit(row, index)} />{' '}
                        <Button as="input" type="submit" value="Remove" className="btn btn-danger btn-sm" onClick={() => changeMode("remove", index)} />
                        </td>
                    </tr>
                )
            })
            let vehicleTable = (
                <Table className="table table-sm">
                    <thead>
                        <tr>
                            <th className='col-2'>Vehicle</th>
                            <th className='col-2'>Licence Plate</th>
                            <th className='col-2'>Telephone</th>
                            <th className='col-2'>Destination</th>
                            <th className='col-2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            )
            return vehicleTable;
        }
    }

    let accordion = <br />

    if (props.state.tours.length > 0) {
        let items = props.state.tours[props.state.tourCursor].map((item, index) => {
            return (
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{item.dock} {item.time}{(item.landing === 1) ? "x" : null}{(item.landing === 2) ? "y" : null} ({item.inVehicles.length})</Accordion.Header>
                    <Accordion.Body>
                        {vehiclesOnFerry(item.inVehicles, index)}
                    </Accordion.Body>
                </Accordion.Item>
            )
        })
        accordion = (
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {items}
            </Accordion>
        )
    }

    return (
        <Container>
            <Row><Col>
                <br />
                {accordion}
            </Col></Row>
        </Container>
    )
}

export default AdminRsrvtnsPageDetails;