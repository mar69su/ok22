import Button from 'react-bootstrap/Button';

const AdminTimetableRemoveRow = (props) => {

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
						<Button as="input" type="submit" value="Confirm" className="btn btn-primary col-4 btn-sm" onClick={() => props.removeItem(props.index)} />{' '}
						<Button as="input" type="submit" value="Cancel" className="btn btn-secondary col-4 btn-sm" onClick={() => props.changeMode("cancel")} />
					</div>
				</td>
			</tr>
		</>



	)
}

export default AdminTimetableRemoveRow;