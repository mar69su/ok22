import {useState} from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Navigationbar = (props) => {

    const [state, setState] = useState({
        username: "",
        password: ""
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (state.username.length < 4 || state.password.length < 8) {
            props.setError("Username must be atleast four characters and password eigth characters long");
            return;
        }
        let user = {
            ...state
        }
        setState((state) => {
            return {
				username: "",
				password: ""
			}
        })
        props.login(user);
    }

	let links = (
		<Navbar.Collapse className="justify-content-end">
			<Nav className="me-auto">
				<Nav.Link as={Link} to="/reservation">Reservation</Nav.Link>
				<Nav.Link as={Link} to="/timetable">Timetable</Nav.Link>
			</Nav>
			<Navbar.Text>
				<Form className="d-flex">
					<Form.Control
						id="username"
						name="username"
						type="text"
						placeholder="Username"
						className="me-2"
						aria-label="Username"
						onChange={onChange}
						value={state.username}
					/>
					<Form.Control
						id="password"
						name="password"
						type="password"
						placeholder="Password"
						className="me-2"
						aria-label="Password"
						onChange={onChange}
						value={state.password}
					/>
					<Button variant="primary" onClick={onSubmit}>Login</Button>
				</Form>
			</Navbar.Text>
		</Navbar.Collapse>
	)

	if (props.isLogged) {
		links = <>
			<Navbar.Collapse className="justify-content-end">
				<Nav className="me-auto">
					{(props.manageUsers) ? <Nav.Link as={Link} to="/admin/users">Users</Nav.Link> : null }
					{(props.manageReservations) ? <Nav.Link as={Link} to="/admin/reservations">Reservations</Nav.Link> : null }
					{(props.manageTimetables) ? <Nav.Link as={Link} to="/admin/timetables">Timetables</Nav.Link> : null }
				</Nav>
				<Nav>
					<Nav.Link as={Link} to="/" onClick={props.logout}>Logout</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</>
	}
	return (
		<Navbar bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand href="/">ok22</Navbar.Brand>
				{links}
			</Container>
		</Navbar>
	)
}

export default Navigationbar;