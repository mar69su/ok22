import {useState} from 'react';
import AdminTmtblPgListRemoveRow from './AdminTmtblPgListRemoveRow';
import AdminTmtblPgListRow from './AdminTmtblPgListRow';
import Table from 'react-bootstrap/Table';

const AdminTmtblPgList = (props) => {

    const [listState, setListState] = useState({
        removeIndex: -1,
    });

    const changeMode = (mode, index) => {
		if (mode === "remove") {
            setListState((state) => {
                return {
                    ...state,
                    removeIndex: index,
                }
            })
		}
		if (mode === "cancel") {
            setListState((state) => {
                return {
                    ...state,
                    removeIndex: -1,
                }
            })
		}
	}

    const editTimetable = (id) => {
        props.editTimetable(id);
    }

    const removeTimetable = (id) => {
        changeMode("cancel");
        props.removeTimetable(id);
    }

    let timetablesList = props.timetablesList.map((timetable, index) => {
        if (listState.removeIndex === index) {
		    return <AdminTmtblPgListRemoveRow key={index} changeMode={changeMode} removeTimetable={removeTimetable}  timetable={timetable} />
        }
        return <AdminTmtblPgListRow key={index} index={index} changeMode={changeMode} editTimetable={editTimetable} timetable={timetable} />
    })

    return (
        <Table className="table table-sm">
            <thead>
                <tr>
                    <th className="col-2">Timetables</th>
                    <th className="col-2"></th>
                </tr>
            </thead>
            <tbody>
                {timetablesList}
            </tbody>
        </Table>
    )
}

export default AdminTmtblPgList;