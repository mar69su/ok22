import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminUserEditRow = (props) => {

    const [state, setState] = useState({
		username: props.user.username,
		manageUsers: props.user.manage_users,
        manageReservations: props.user.manage_reservations,
        manageTimetables: props.user.manage_timetables
	})

    const onChange = (event) => {
        let username = state.username;
        let manageUsers = state.manageUsers;
        let manageReservations = state.manageReservations;
        let manageTimetables = state.manageTimetables;
        if (event.target.name === "username") {
            username = event.target.value;
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
        setState((state) => {
            return {
                ...state,
                username: username,
                manageUsers: manageUsers,
                manageReservations: manageReservations,
                manageTimetables: manageTimetables
            }
        })
    }

    const editUser = () => {
        let user = {
            ...state,
            id: props.user.id
        }
        props.editUser(user);
    }

	return(
            <tr key={props.index}>
                <td>
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
                    <br />
                    <Form.Check type="checkbox"
                        id="manageUsers"
                        name="manageUsers"
                        label="Manage users"
                        onChange={onChange}
                        checked={state.manageUsers} />
                    <br />
                    <Form.Check 
                        type="checkbox"
                        id="manageReservations"
                        name="manageReservations"
                        label="Manage reservations"
                        onChange={onChange}
                        checked={state.manageReservations} />
                    <br />
                    <Form.Check 
                        type="checkbox"
                        id="manageTimetables"
                        name="manageTimetables"
                        label="Manage timetables"
                        onChange={onChange}
                        checked={state.manageTimetables} />

                </td>
                <td>
                    <div>
                        <Button as="input" type="submit" value="Confirm" className="btn btn-primary btn-sm" onClick={() => editUser()} />{' '}
						<Button as="input" type="submit" value="Cancel" className="btn btn-secondary btn-sm" onClick={() => props.changeMode("cancel")} />
                    </div>
                </td>
            </tr>

	)
}

export default AdminUserEditRow;