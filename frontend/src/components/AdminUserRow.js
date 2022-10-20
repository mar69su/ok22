import Button from 'react-bootstrap/Button';

const AdminUserRow = (props) => {

	return(
            <tr key={props.index}>
                <td>{props.user.username}</td>
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

export default AdminUserRow;