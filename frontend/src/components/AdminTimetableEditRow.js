import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdminTimetableEditRow = (props) => {

    const docks = ["Granvik", "Granholmen", "Björkholm", "Heisala", "Ramsholm", "Stenholm", "Aspholm", "Kuggö", "Pensar"];

    const [state, setState] = useState({
		dock: props.item.dock,
		start: props.item.start,
		week: structuredClone(props.item.week)
	})

    const onChange = (event) => {
        let dock = state.dock;
        let start = state.start;
        if (event.target.name === "dock") {
            dock = event.target.value;
        }
        if (event.target.name === "start") {
            start = !start;
        }
        setState((state) => {
            return {
                ...state,
                dock: dock,
                start: start
            }
        })
    }

    const onArrayChange = (event) => {
        let tempArray = state.week;
        let targetArray = event.target.name.split("-")
        let targetVar = targetArray[0];
        let targetIndex = Number(targetArray[1]);
        let targetVal = event.target.value;
        if (targetVar === "time") {
            tempArray[targetIndex].time = targetVal;
        }
        if (targetVar === "landing") {
            tempArray[targetIndex].landing = Number(targetVal);
        }
        if (targetVar === "restriction") {
            tempArray[targetIndex].restriction = !tempArray[targetIndex].restriction;
        }
        setState((state) => {
            return {
                ...state,
                week: tempArray
            }
        })
    }

    const editItem = () => {
        props.editItem(state, props.index);
    }

    return (
		<tr>
			<td>
                <Form.Select defaultValue={state.dock} id="dock" name="dock" onChange={onChange}>{docks.map((dock, index) => (
                    <option key={"op" + index} value={dock}>{dock}</option>
                ))}</Form.Select>
                <Form.Check 
                    type="checkbox"
                    id="start"
                    name="start"
                    label="Start"
                    checked={state.start}
                    onChange={onChange} />
            </td>
            {state.week.map((day, index) => (
                <td key={"td" + props.index + "-" + index}>
                    <Form.Control
						id={"time-" + index}
						name={"time-" + index}
						type="text"
						placeholder="Time"
						aria-label="Time"
						onChange={onArrayChange}
						value={day.time} />
                    <Form.Check
                        type="radio"
                        name={"landing-" + index}
                        id={"landing-" + index}
                        label={"No"}
                        value={0}
						onChange={onArrayChange}
                        checked={day.landing === 0} />
                    <Form.Check
                        type="radio"
                        name={"landing-" + index}
                        id={"landing-" + index}
                        label={"Needed"}
                        value={1}
						onChange={onArrayChange}
                        checked={day.landing === 1} />
                    <Form.Check
                        type="radio"
                        name={"landing-" + index}
                        id={"landing-" + index}
                        label={"Reservation"}
                        value={2}
						onChange={onArrayChange}
                        checked={day.landing === 2} />
                    <Form.Check
                        type="radio"
                        name={"landing-" + index}
                        id={"landing-" + index}
                        label={"Yes"}
                        value={3}
						onChange={onArrayChange}
                        checked={day.landing === 3} />
                    <Form.Check
                        key={"check" + index}
                        type="checkbox"
                        name={"restriction-" + index}
                        id={"restriction-" + index}
                        label={"Restriction"}
						onChange={onArrayChange}
                        checked={day.restriction} />
                </td>
            ))}
            <td colSpan="2">
                <div>
                    <Button as="input" type="submit" value="Confirm" className="btn btn-primary col-4 btn-sm" onClick={editItem} />{' '}
                    <Button as="input" type="submit" value="Cancel" className="btn btn-secondary col-4 btn-sm" onClick={() => props.changeMode("cancel")} />
                </div>
            </td>
		</tr>
	)
}

export default AdminTimetableEditRow;