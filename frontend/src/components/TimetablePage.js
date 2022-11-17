import {useState, useEffect} from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Table from 'react-bootstrap/esm/Table';
import TimetablePgRow from './TimetablePgRow';

const TimetablePage = (props) => {

    useEffect(() => {
		props.getVisibleTimetablesList();
	}, [])

    let timetablesList = props.timetablesList.map((timetable, index) => {
        return <Row key={index}><Col><a href="#" onClick={() => props.getVisibleTimetable(timetable._id)} >{timetable.title + " (" + timetable.beginDate + " - " + timetable.endDate + ")"}</a></Col></Row>
    })


    let rows = props.timetable.rows.map((row, index) => {
	    return <TimetablePgRow key={index} row={row} index={index} />
	})

    let timetableTable = <br />

    if (rows.length > 0) {
        timetableTable = (
            <Table className="table table-sm">
                <thead>
                    <tr>
                        <th className="col-1">Dock</th>
                        <th className="col-1 text-center">Monday</th>
                        <th className="col-1 text-center">Tuesday</th>
                        <th className="col-1 text-center">Wednesday</th>
                        <th className="col-1 text-center">Thursday</th>
                        <th className="col-1 text-center">Friday</th>
                        <th className="col-1 text-center">Saturday</th>
                        <th className="col-1 text-center">Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr><td colSpan="8"></td></tr>
                    <tr><td colSpan="8">x = anlöpes vid behov / poiketaan tarvittaessa.</td></tr>
                    <tr><td colSpan="8">y =  bör beställas minst 10 min före avg. från Granvik, morgonturen föreg. kväll före kl. 17:00/Tilattava vähint. 10 min ennen lähtöä Granvikista, aamuvuoro ed. iltana ennen klo 17:00</td></tr>
                    <tr><td colSpan="8" className="table-warning">Reservering av bilplats tidigast samma veckas måndag / autopaikan varaus aikaisintaan saman viikon maanantaista alkaen.</td></tr>
                </tbody>
            </Table>
        )
    }

    return (
        <Container fluid>
            {timetablesList ? timetablesList : null}
            <Row>
                <Col>
                    <br />
                    {timetableTable}
                </Col>
            </Row>
        </Container>
    )
}

export default TimetablePage;