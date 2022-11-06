import {useState} from 'react';
import AdminTmtblPgEditEditRow from './AdminTmtblPgEditEditRow';
import AdminTmtblPgEditRemoveRow from './AdminTmtblPgEditRemoveRow';
import AdminTmtblPgEditRow from './AdminTmtblPgEditRow';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

const AdminTmtblPgEdit = (props) => {

    const onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "visible") {
            value = !props.timetable.visible;
        }
        props.updateTimetableForm(name, value);
    }

    const [state, setState] = useState({
        removeIndex: -1,
        editIndex: -1,
    });

    const changeMode = (mode, index) => {
		if (mode === "remove") {
            setState((state) => {
                return {
                    ...state,
                    removeIndex: index,
                    editIndex: -1,
                }
            })
		}
		if (mode === "edit") {
            setState((state) => {
                return {
                    ...state,
                    removeIndex: -1,
                    editIndex: index
                }
            })
		}
		if (mode === "cancel") {
            setState((state) => {
                return {
                    ...state,
                    removeIndex: -1,
                    editIndex: -1
                }
            })
		}
	}

    const addNewRow = (index) => {
        props.updateTimetableNewRow(index);
        changeMode("edit", index);
    }

    const editRow = (row, index) => {
        props.updateTimetableEditRow(row, index);
        changeMode("cancel");
    }

    const removeRow = (index) => {
        props.updateTimetableRemoveRow(index);
        changeMode("cancel");
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    let rows = props.timetable.rows.map((row, index) => {
        if (state.editIndex === index) {
		    return <AdminTmtblPgEditEditRow key={index} row={row} index={index} changeMode={changeMode} editRow={editRow} />
        }
        if (state.removeIndex === index) {
            return <AdminTmtblPgEditRemoveRow key={index} row={row} index={index} changeMode={changeMode} removeRow={removeRow} />
        }
	    return <AdminTmtblPgEditRow key={index} row={row} index={index} changeMode={changeMode} addNewRow={addNewRow} />
	})

    let timetableTable = <br />

    if (rows.length > 0) {
        timetableTable = (
            <Table className="table table-sm">
                <thead>
                    <tr>
                        <th className="col-1">Dock</th>
                        <th className="col-1">Monday</th>
                        <th className="col-1">Tuesday</th>
                        <th className="col-1">Wednesday</th>
                        <th className="col-1">Thursday</th>
                        <th className="col-1">Friday</th>
                        <th className="col-1">Saturday</th>
                        <th className="col-1">Sunday</th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }

    return (
        <Form onSubmit={onSubmit}>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Form.Group>
                            <Form.Label>Begin Date</Form.Label>
                            <Form.Control type="date"
                                id="beginDate"
                                name="beginDate"
                                placeholder="Date"
                                aria-label="Date"
                                onChange={onChange}
                                value={props.timetable.beginDate} />
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date"
                                id="endDate"
                                name="endDate"
                                placeholder="Date"
                                aria-label="Date"
                                onChange={onChange}
                                defaultValue={props.timetable.endDate} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                aria-label="Title"
                                onChange={onChange}
                                value={props.timetable.title} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Form.Check 
                            type="switch"
                            id="visible"
                            name="visible"
                            label="Visible"
                            onChange={onChange}
                            checked={props.timetable.visible} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        {timetableTable}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Button as="input" type="submit" value="Add new row" className="btn btn-primary btn-sm" onClick={() => addNewRow(props.timetable.rows.length)}/><br />
                        </div>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Button as="input" type="submit" value="Save" className="btn btn-primary btn-sm" onClick={() => props.saveTimetable()} />{' '}
                            <Button as="input" type="submit" value="Clear" className="btn btn-secondary btn-sm" onClick={() => props.clearTimetable()} />{' '}
                            <Button as="input" type="submit" value="Save as New" className="btn btn-primary btn-sm" onClick={() => props.saveAsNewTimetable()} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default AdminTmtblPgEdit;