const TimetablePgRow = (props) => {

	return(
		<>
			{(props.row.start) ? <tr><td colSpan="8"></td></tr> : null}
			<tr>
				<td>
					{(props.row.start) ? <strong>{props.row.dock}</strong> : <>{props.row.dock}</>}
				</td>
				{props.row.week.map((day, index) => (
						<td key={"td" + props.index + "-" + index} className={ (day.restriction) ? "table-warning  text-center" : " text-center"}>
							{day.time} {(day.landing === 1) ? "x" : null}{(day.landing === 2) ? "y" : null}
						</td>
				))}
			</tr>
		</>
	)
}

export default TimetablePgRow;