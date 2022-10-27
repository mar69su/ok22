import Button from 'react-bootstrap/Button';

const AdminTmtblPgListRow = (props) => {

    return (
        <tr>
            <td>
                {props.timetable.title + " (" + props.timetable.beginDate + " - " + props.timetable.endDate + ")" }
            </td>
            <td>
                <div>
                    <Button as="input" type="submit" value="Edit" className="btn btn-secondary col-4 btn-sm" onClick={() => props.editTimetable(props.timetable._id)} />{' '}
                    <Button as="input" type="submit" value="Remove" className="btn btn-danger col-4 btn-sm" onClick={() => props.changeMode("remove", props.index)} />
                </div>
            </td>
        </tr>
    )
}

export default AdminTmtblPgListRow;