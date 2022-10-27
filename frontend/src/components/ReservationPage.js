import {useState} from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';

const ReservationPage = () => {

    const [state, setState] = useState({
        date: "",
    });

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value
            }
        })
        console.log(event.target.value);
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
                        value={state.date} />
                </Form.Group>
            </Col></Row>
        </Container>
    )
}

export default ReservationPage