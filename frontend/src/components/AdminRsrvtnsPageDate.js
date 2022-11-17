import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Table from 'react-bootstrap/esm/Table';

const AdminRsrvtnsPageDate = (props) => {

    const onChange = (event) => {
        let date = event.target.value
        props.setState((state) => {
            return {
                ...state,
                date: date
            }
        })
        props.setReservationDate(date);
        props.getReservationsOfDay(date);
    }

    useEffect(() => {
        const timetableOfDay = props.timetableOfDay;
        let tour = [];
        let tours = [];
		for (let i = 0; i < timetableOfDay.length; i++) {
            if (timetableOfDay[i].start) {
                if (tour.length > 0) {
                    tours.push(tour);
                    tour = [];
                }
            }
            tour.push({
                dock: timetableOfDay[i].dock,
                time: timetableOfDay[i].time,
                landing: timetableOfDay[i].landing,
                restriction: timetableOfDay[i].restriction,
                inVehicles: [],
                outVehicles: []
            })
        }
        if (tour.length > 0) {
            tours.push(tour);
            tour = [];
        }
        const reservationsOfDay = props.reservationsOfDay;
        for (let i = 0; i < reservationsOfDay.length; i++) {
            const vehicle = {
                _id: reservationsOfDay[i]._id,
                token: reservationsOfDay[i].token,
                vehicle: reservationsOfDay[i].vehicle,
                licencePlate: reservationsOfDay[i].licence_plate,
                telephone: reservationsOfDay[i].telephone,
                tourOfDay: reservationsOfDay[i].tour_of_day,
                indockOfTour: reservationsOfDay[i].indock_of_tour,
                outdockOfTour: reservationsOfDay[i].outdock_of_tour,
                destination: tours[reservationsOfDay[i].tour_of_day][reservationsOfDay[i].outdock_of_tour].dock
            }
            tours[reservationsOfDay[i].tour_of_day][reservationsOfDay[i].indock_of_tour].inVehicles.push(vehicle)
            tours[reservationsOfDay[i].tour_of_day][reservationsOfDay[i].outdock_of_tour].outVehicles.push(vehicle)
        }
        props.setState((state) => {
            return {
                ...state,
                tours: tours
            }
        })
	}, [props.timetableOfDay])

    let timetableTable = <br />

    if (props.state.tours.length > 0) {
        let rows = props.state.tours.map((tour, index) => {
            let vehiclesInFerry = 0;
            return (
                tour.map((row, indx) => {
                    vehiclesInFerry += row.inVehicles.length;
                    vehiclesInFerry -= row.outVehicles.length;
                    return (
                        <tr key={index + "-" + indx} className={(row.restriction) ? "table-warning" : null}>
                            {(indx === 0) ? <td><strong>{row.dock}</strong></td> : <td>{row.dock}</td>}
                            <td>{row.time}{(row.landing === 1) ? "x" : null}{(row.landing === 2) ? "y" : null}</td>
                            <td>
                                {row.inVehicles.length}
                            </td>
                            <td>
                                {vehiclesInFerry}
                            </td>
                            <td>
                                {row.outVehicles.length}
                            </td>
                            <td>
                                <div>
                                    {(indx === 0) ? <Button as="input" type="submit" value="Details" className="btn btn-secondary btn-sm" onClick={() => props.goToDetails(index)} /> : null}
                                </div>
                            </td>
                        </tr>
                    )
                })
            )
        })
        timetableTable = (
            <Table className="table table-sm">
                <thead>
                    <tr>
                        <th className='col-2'>Dock</th>
                        <th className='col-2'></th>
                        <th className='col-2'>From Dock</th>
                        <th className='col-2'>In Ferry</th>
                        <th className='col-2'>To Dock</th>
                        <th className='col-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }

    return (
        <Container>
            <Row><Col xs={3}>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"
                        id="date"
                        name="date"
                        placeholder="Date"
                        aria-label="Date"
                        onChange={onChange}
                        value={props.state.date} />
                </Form.Group>
            </Col></Row>
            <Row><Col>
                <br />
                {timetableTable}
            </Col></Row>
        </Container>
    )
}

export default AdminRsrvtnsPageDate;