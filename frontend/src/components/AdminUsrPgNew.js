import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AdminUsrPgNew = (props) => {

    const [state, setState] = useState({
        username: "",
        password: "",
        manageUsers: false,
        manageReservations: false,
        manageTimetables: false
    });

    const onChange = (event) => {
        let username = state.username;
        let password = state.password;
        let manageUsers = state.manageUsers;
        let manageReservations = state.manageReservations;
        let manageTimetables = state.manageTimetables;
        if (event.target.name === "username") {
            username = event.target.value;
        }
        if (event.target.name === "password") {
            password = event.target.value;
        }
        if (event.target.name === "manageUsers") {
            manageUsers = !manageUsers;
        }
        if (event.target.name === "manageReservations") {
            manageReservations = !manageReservations;
        }
        if (event.target.name === "manageTimetables") {
            manageTimetables = !manageTimetables;
        }
        setState(() => {
            return {
                username: username,
                password: password,
                manageUsers: manageUsers,
                manageReservations: manageReservations,
                manageTimetables: manageTimetables
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const addUser = () => {
        let user = {
            ...state
        }
        props.addUser(user);
        setState({
            username: "",
            password: "",
            manageUsers: false,
            manageReservations: false,
            manageTimetables: false
        })
    }

    return (
        <Form onSubmit={onSubmit}>
            <Container>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            aria-label="Username"
                            onChange={onChange}
                            value={state.username}
                        />
                    </Form.Group>
                </Col></Row>
                <Row><Col xs={3}>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text"
                            id="password"
                            name="password"
                            placeholder="Password"
                            aria-label="Password"
                            onChange={onChange}
                            value={state.password}
                        />
                    </Form.Group>
                </Col></Row>
                <Row><Col>
                    <Form.Check type="checkbox"
                        id="manageUsers"
                        name="manageUsers"
                        label="Manage users"
                        onChange={onChange}
                        checked={state.manageUsers} />
                    <Form.Check 
                        type="checkbox"
                        id="manageReservations"
                        name="manageReservations"
                        label="Manage reservations"
                        onChange={onChange}
                        checked={state.manageReservations} />
                    <Form.Check 
                        type="checkbox"
                        id="manageTimetables"
                        name="manageTimetables"
                        label="Manage timetables"
                        onChange={onChange}
                        checked={state.manageTimetables} />
                    <br />
                    <Button as="input" type="submit" value="Add user" className="btn btn-primary btn-sm" onClick={() => addUser()} /><br />
                </Col></Row>
            </Container>
        </Form>
    )
}

export default AdminUsrPgNew;