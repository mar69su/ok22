import Button from 'react-bootstrap/Button';

const AdminTmtblPgEditRemoveRow = (props) => {

	return(
		<>
			{(props.row.start) ? <tr><td colSpan="10"></td></tr> : null}
			<tr>
				<td>
					{props.row.dock}
				</td>
				{props.row.week.map((day, index) => (
						<td key={"td" + props.index + "-" + index} className={ (day.restriction) ? "table-warning" : null}>
							{day.time} {(day.landing === 1) ? "x" : null}{(day.landing === 2) ? "y" : null}{(day.landing === 3) ? "." : null}
						</td>
				))}
				<td colSpan="2">
					<div>
                        <Button as="input" type="submit" value="Confirm" className="btn btn-primary col-4 btn-sm" onClick={() => props.removeRow(props.index)} />{' '}
						<Button as="input" type="submit" value="Cancel" className="btn btn-secondary col-4 btn-sm" onClick={() => props.changeMode("cancel")} />
					</div>
				</td>
			</tr>
		</>
	)
}

export default AdminTmtblPgEditRemoveRow;