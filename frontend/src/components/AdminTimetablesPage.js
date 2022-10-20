import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import AdminTimetableRow from './AdminTimetableRow';
import AdminTimetableEditRow from './AdminTimetableEditRow';
import AdminTimetableRemoveRow from './AdminTimetableRemoveRow';
import Container from 'react-bootstrap/esm/Container';

const AdminTimetablesPage = (props) => {

    const [formState, setFormState] = useState({
        beginDate: "2022-01-01",
        endDate: "2022-12-31",
        title: "",
        status: "in_progress",
        rows: []
    })

    const onChange = (event) => {
        setFormState((formState) => {
            return {
                ...formState,
                [event.target.name]: event.target.value
            }
        })
    }

    const [tableState, setTableState] = useState({
        removeIndex: -1,
        editIndex: -1,
        rows: []
    });

    const onSubmit = (event) => {
        event.preventDefault();
        setFormState((state) => {
            return {
                ...state,
                rows: tableState.rows
            }
        })
        let item = {
            ...formState
        }
        props.addTimetable(item);
    }
    

    const changeTableMode = (mode, index) => {
		if (mode === "remove") {
            setTableState((state) => {
                return {
                    ...state,
                    removeIndex: index,
                    editIndex: -1,
                }
            })
		}
		if (mode === "edit") {
            setTableState((state) => {
                return {
                    ...state,
                    removeIndex: -1,
                    editIndex: index
                }
            })
		}
		if (mode === "cancel") {
            setTableState((state) => {
                return {
                    ...state,
                    removeIndex: -1,
                    editIndex: -1,
                }
            })
		}
	}

    const addNewRow = (index) => {
        console.log(index);
        let rowItem = {
            dock: "Granvik",
            start: false,
            week: [
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                }
            ]
        }
        let tempArray = tableState.rows;
        tempArray.splice(index, 0, rowItem);
        setTableState((rowState) => {
            return {
                ...rowState,
                editIndex: index,
                removeIndex: -1,
                rows: tempArray
            }
        })
    }

    const editItem = (item, index) => {
        let tempArray = tableState.rows;
        tempArray[index] = item;
        setTableState((rowState) => {
            return {
                ...rowState,
                editIndex: -1,
                removeIndex: -1,
                rows: tempArray
            }
        })
	}

    const removeItem = (index) => {
        let tempArray = tableState.rows;
        tempArray.splice(index, 1);
        setTableState((rowState) => {
            return {
                ...rowState,
                editIndex: -1,
                removeIndex: -1,
                rows: tempArray
            }
        })
	}

    let items = tableState.rows.map((item, index) => {
        //console.log(tableState.editIndex + ":" + tableState.removeIndex + ":" + index);
        if (tableState.editIndex === index) {
		    return <AdminTimetableEditRow key={index} item={item} index={index} changeMode={changeTableMode} editItem={editItem} />
        }
        if (tableState.removeIndex === index) {
		    return <AdminTimetableRemoveRow key={index} item={item} index={index} changeMode={changeTableMode} removeItem={removeItem} />
        }
	    return <AdminTimetableRow key={index} item={item} index={index} changeMode={changeTableMode} addNewRow={addNewRow} />
	})

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Container fluid>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Begin Date</Form.Label>
                                <Form.Control type="date"
                                    id="beginDate"
                                    name="beginDate"
                                    placeholder="Date"
                                    aria-label="Date"
                                    onChange={onChange}
                                    value={formState.beginDate} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date"
                                    id="endDate"
                                    name="endDate"
                                    placeholder="Date"
                                    aria-label="Date"
                                    onChange={onChange}
                                    value={formState.endDate} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    aria-label="Title"
                                    onChange={onChange}
                                    value={formState.title} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button as="input" type="submit" value="Save" />
                        </Col>
                    </Row>
                </Container>
            </Form>
            <br />
            <Table className="table table-bordered table-sm">
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
                {items}
                </tbody>
            </Table>
            <Button as="input" type="submit" value="Add new row" onClick={() => addNewRow(tableState.rows.length)}/><br />
        </>
    )
}

export default AdminTimetablesPage