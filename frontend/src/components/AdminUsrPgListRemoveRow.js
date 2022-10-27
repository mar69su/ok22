import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const AdminUsrPgListRemoveRow = (props) => {

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
                        <Button as="input" type="submit" value="Confirm" className="btn btn-primary btn-sm" onClick={() => props.removeUser(props.user._id)} />{' '}
						<Button as="input" type="submit" value="Cancel" className="btn btn-secondary btn-sm" onClick={() => props.changeMode("cancel")} />
                    </div>
                </td>
            </tr>

	)
}

export default AdminUsrPgListRemoveRow;