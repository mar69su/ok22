import Button from 'react-bootstrap/Button';

const AdminTimetableRow = (props) => {

	return(
		<>
			{(props.item.start) ? <tr><td colSpan="10"></td></tr> : null}
			<tr>
				<td>
					{props.item.dock}
				</td>
				{props.item.week.map((day, index) => (
						<td key={"td" + props.index + "-" + index} className={ (day.restriction) ? "table-warning" : null}>
							{day.time} {(day.landing === 1) ? "x" : null}{(day.landing === 2) ? "y" : null}{(day.landing === 3) ? "." : null}
						</td>
				))}
				<td colSpan="2">
					<div>
						<Button as="input" type="submit" value="Edit" className="btn btn-secondary col-3 btn-sm" onClick={() => props.changeMode("edit", props.index)} />{' '}
						<Button as="input" type="submit" value="Remove" className="btn btn-danger col-3 btn-sm" onClick={() => props.changeMode("remove", props.index)} />{' '}
						<Button as="input" type="submit" value="Add Row" className="btn btn-secondary col-3 btn-sm" onClick={() => props.addNewRow((props.index + 1))} />
					</div>
				</td>
			</tr>
		</>
	)
}

export default AdminTimetableRow;