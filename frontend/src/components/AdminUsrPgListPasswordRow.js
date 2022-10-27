import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminUsrPgListPasswordRow = (props) => {

    const [state, setState] = useState({
		...props.user,
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

    const editPassword = () => {
        let user = {
            ...state
        }
        props.editPassword(user);
    }

    return (
        <tr key={props.index}>
        <td>
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
        </td>
        <td>
            <div>
                <Button as="input" type="submit" value="Confirm" className="btn btn-primary btn-sm" onClick={() => editPassword()} />{' '}
                <Button as="input" type="submit" value="Cancel" className="btn btn-secondary btn-sm" onClick={() => props.changeMode("cancel")} />
            </div>
        </td>
    </tr>
)
}

export default AdminUsrPgListPasswordRow;