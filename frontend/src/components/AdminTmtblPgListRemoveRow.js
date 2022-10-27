import Button from 'react-bootstrap/Button';

const AdminTmtblPgListRemoveRow = (props) => {

    return (
        <tr>
            <td>
                {props.timetable.title + " (" + props.timetable.begin_date + " - " + props.timetable.endDate + ")" }
            </td>
            <td>
                <div>
                    <Button as="input" type="submit" value="Confirm" className="btn btn-primary col-4 btn-sm" onClick={() => props.removeTimetable(props.timetable._id)} />{' '}
					<Button as="input" type="submit" value="Cancel" className="btn btn-secondary col-4 btn-sm" onClick={() => props.changeMode("cancel")} />
                </div>
            </td>
        </tr>
    )
}

export default AdminTmtblPgListRemoveRow;