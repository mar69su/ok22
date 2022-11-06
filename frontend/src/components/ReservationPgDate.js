import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Table from 'react-bootstrap/esm/Table';

const ReservationPageDate = (props) => {

    const onChange = (event) => {
        let date = event.target.value
        props.setState((state) => {
            return {
                ...state,
                date: date
            }
        })
        props.getTimetableOfDay(date);
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
                restriction: timetableOfDay[i].restriction
            })
        }
        if (tour.length > 0) {
            tours.push(tour);
            tour = [];
        }
        props.setState((state) => {
            return {
                ...state,
                tours: tours
            }
        })
	}, [props.timetableOfDay])

    let rows = props.timetableOfDay.map((row, index) => {
        return (
            <tr key={index}>
                {(row.start) ? <td><strong>{row.dock}</strong></td> : <td>{row.dock}</td>}
                <td>{row.time}{(row.landing === 1) ? "x" : null}{(row.landing === 2) ? "y" : null}</td>
                <td>
                <div>
                {(row.start) ? <Button as="input" type="submit" value="Reserve" className="btn btn-secondary btn-sm" onClick={() => props.goToStepTwo(index)} /> : null}
                </div>

                </td>
            </tr>
        )
    })

    let timetableTable = <br />

    if (props.state.date.length > 0) {
        if (rows.length > 0) {
            timetableTable = (
                <Table className="table table-sm">
                    <thead>
                        <tr>
                            <th className="col-2">Dock</th>
                            <th className="col-2"></th>
                            <th className="col-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            )
        }
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

export default ReservationPageDate;