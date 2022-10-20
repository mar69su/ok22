import Button from 'react-bootstrap/Button';

const AdminUserRemoveRow = (props) => {

	return(
            <tr key={props.index}>
                <td>{props.user.username}</td>
                <td>
                    <div>
                        <Button as="input" type="submit" value="Confirm" className="btn btn-primary btn-sm" onClick={() => props.removeUser(props.user.id)} />{' '}
						<Button as="input" type="submit" value="Cancel" className="btn btn-secondary btn-sm" onClick={() => props.changeMode("cancel")} />
                    </div>
                </td>
            </tr>

	)
}

export default AdminUserRemoveRow;