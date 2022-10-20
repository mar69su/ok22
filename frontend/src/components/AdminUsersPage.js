import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import AdminUserRow from './AdminUserRow';
import AdminUserEditRow from './AdminUserEditRow';
import AdminUserPasswordRow from './AdminUserPasswordRow';
import AdminUserRemoveRow from './AdminUserRemoveRow';

const AdminUsersPage = (props) => {

    const [state, setState] = useState({
        removeIndex: -1,
        editIndex: -1,
        passwordIndex: -1,
    });

	const changeMode = (mode, index) => {
		if (mode === "remove") {
			setState({
				removeIndex: index,
				editIndex: -1,
                passwordIndex: -1
			})
		}
		if (mode === "edit") {
			setState({
				removeIndex: -1,
				editIndex: index,
                passwordIndex: -1
			})
		}
		if (mode === "password") {
			setState({
				removeIndex: -1,
				editIndex: -1,
                passwordIndex: index
			})
		}
		if (mode === "cancel") {
			setState({
				removeIndex: -1,
				editIndex: -1,
                passwordIndex: -1
			})
		}
	}

    const [formState, setFormState] = useState({
        username: "",
        password: "",
        manageUsers: false,
        manageReservations: false,
        manageTimetables: false
    });

    const onChange = (event) => {
        let username = formState.username;
        let password = formState.password;
        let manageUsers = formState.manageUsers;
        let manageReservations = formState.manageReservations;
        let manageTimetables = formState.manageTimetables;
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
        setFormState(() => {
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
        let user = {
            ...formState
        }
        props.addUser(user);
        setFormState({
            username: "",
            password: "",
            manageUsers: false,
            manageReservations: false,
            manageTimetables: false
        })
    }

	const removeUser = (id) => {
		props.removeUser(id);
		changeMode("cancel");
	}

	const editUser = (user) => {
		props.editUser(user);
		changeMode("cancel");
	}

	let users = props.usersList.map((user, index) => {
        if (state.editIndex === index) {
            return <AdminUserEditRow key={index} user={user} index={index} editUser={editUser} changeMode={changeMode} />
        }
        if (state.removeIndex === index) {
            return <AdminUserRemoveRow key={index} user={user} index={index} removeUser={removeUser} changeMode={changeMode} />
        }
        if (state.passwordIndex === index) {
            return <AdminUserPasswordRow key={index} user={user} index={index}  changeMode={changeMode} />
        }
        return <AdminUserRow key={index} user={user} index={index} changeMode={changeMode} />
    })

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Form  onSubmit={onSubmit}>
                        <Container>
                            <Row><Col>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        aria-label="Username"
                                        onChange={onChange}
                                        value={formState.username}
                                    />
                                </Form.Group>
                            </Col></Row>
                            <Row><Col>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        onChange={onChange}
                                        value={formState.password}
                                    />
                                </Form.Group>
                            </Col></Row>
                            <Row><Col>
                            <Form.Check type="checkbox"
                                    id="manageUsers"
                                    name="manageUsers"
                                    label="Manage users"
                                    onChange={onChange}
                                    checked={formState.manageUsers} />
                                <Form.Check 
                                    type="checkbox"
                                    id="manageReservations"
                                    name="manageReservations"
                                    label="Manage reservations"
                                    onChange={onChange}
                                    checked={formState.manageReservations} />
                                <Form.Check 
                                    type="checkbox"
                                    id="manageTimetables"
                                    name="manageTimetables"
                                    label="Manage timetables"
                                    onChange={onChange}
                                    checked={formState.manageTimetables} />
                                <br />
                                <Button as="input" type="submit" value="Add new user" /><br />
                            </Col></Row>
                        </Container>
                    </Form>
                </Col>
                <Col>
                    <Table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th className="col-2">Users</th>
                                <th className="col-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {users}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminUsersPage