import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminUsrPgListEditRow = (props) => {

    const [state, setState] = useState({
		...props.user
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
            ...state
        }
        props.editUser(user);
    }

    return (
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
                <div>
                    <Form.Check type="checkbox" inline
                        id="manageUsers"
                        name="manageUsers"
                        label="Manage users"
                        onChange={onChange}
                        checked={state.manageUsers} />
                    <Form.Check 
                        type="checkbox" inline
                        id="manageReservations"
                        name="manageReservations"
                        label="Manage reservations"
                        onChange={onChange}
                        checked={state.manageReservations} />
                    <Form.Check 
                        type="checkbox" inline
                        id="manageTimetables"
                        name="manageTimetables"
                        label="Manage timetables"
                        onChange={onChange}
                        checked={state.manageTimetables} />
                </div>
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

export default AdminUsrPgListEditRow;