import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminUsrPgListRow = (props) => {

	return(
            <tr key={props.index}>
                <td>{props.user.username}
                    <div>
                        <Form.Check type="checkbox" inline disabled
                            id={"manageUsers" + props.index}
                            name={"manageUsers" + props.index}
                            label="Manage users"
                            defaultChecked={props.user.manageUsers} />
                        <Form.Check type="checkbox" inline disabled
                            id={"manageReservations" + props.index}
                            name={"manageReservations" + props.index}
                            label="Manage reservations"
                            defaultChecked={props.user.manageReservations} />
                        <Form.Check type="checkbox" inline disabled
                            id={"manageTimetables" + props.index}
                            name={"manageTimetables" + props.index}
                            label="Manage timetables"
                            defaultChecked={props.user.manageTimetables} />
                    </div>
                </td>
                <td>
                    <div>
                        <Button as="input" type="submit" value="Edit" className="btn btn-secondary col-3 btn-sm" onClick={() => props.changeMode("edit", props.index)} />{' '}
                        <Button as="input" type="submit" value="Remove" className="btn btn-danger col-3 btn-sm" onClick={() => props.changeMode("remove", props.index)} />{' '}
                        <Button as="input" type="submit" value="Password" className="btn btn-secondary col-3 btn-sm" onClick={() => props.changeMode("password", props.index)} />
                    </div>
                </td>
            </tr>

	)
}

export default AdminUsrPgListRow;