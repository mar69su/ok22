import Button from 'react-bootstrap/Button';

const AdminUserPasswordRow = (props) => {

	return(
            <tr key={props.index}>
                <td>{props.user.username}</td>
                <td>
                    <div>
                        <Button as="input" type="submit" value="Confirm" className="btn btn-primary btn-sm" onClick={() => props.removeItem(props.index)} />{' '}
						<Button as="input" type="submit" value="Cancel" className="btn btn-secondary btn-sm" onClick={() => props.changeMode("cancel")} />
                    </div>
                </td>
            </tr>

	)
}

export default AdminUserPasswordRow;