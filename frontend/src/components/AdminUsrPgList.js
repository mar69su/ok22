import {useState} from 'react';
import AdminUsrPgListEditRow from './AdminUsrPgListEditRow';
import AdminUsrPgListPasswordRow from './AdminUsrPgListPasswordRow';
import AdminUsrPgListRemoveRow from './AdminUsrPgListRemoveRow';
import AdminUsrPgListRow from './AdminUsrPgListRow';
import Table from 'react-bootstrap/Table';

const AdminUsrPgList = (props) => {

    const [state, setState] = useState({
        removeIndex: -1,
        editIndex: -1,
        passwordIndex: -1,
    });

	const changeMode = (mode, index) => {
		if (mode === "remove") {
			setState({
				removeIndex: index,
				editIndex: -1,
                passwordIndex: -1
			})
		}
		if (mode === "edit") {
			setState({
				removeIndex: -1,
				editIndex: index,
                passwordIndex: -1
			})
		}
		if (mode === "password") {
			setState({
				removeIndex: -1,
				editIndex: -1,
                passwordIndex: index
			})
		}
		if (mode === "cancel") {
			setState({
				removeIndex: -1,
				editIndex: -1,
                passwordIndex: -1
			})
		}
	}

	const removeUser = (id) => {
		props.removeUser(id);
		changeMode("cancel");
	}

	const editUser = (user) => {
		props.editUser(user);
		changeMode("cancel");
	}

	const editPassword = (user) => {
		props.editPassword(user);
		changeMode("cancel");
	}

	let users = props.usersList.map((user, index) => {
        if (state.editIndex === index) {
            return <AdminUsrPgListEditRow key={index} user={user} index={index} editUser={editUser} changeMode={changeMode} />
        }
        if (state.removeIndex === index) {
            return <AdminUsrPgListRemoveRow key={index} user={user} index={index} removeUser={removeUser} changeMode={changeMode} />
        }
        if (state.passwordIndex === index) {
            return <AdminUsrPgListPasswordRow key={index} user={user} index={index} editPassword={editPassword} changeMode={changeMode} />
        }
        return <AdminUsrPgListRow key={index} user={user} index={index} changeMode={changeMode} />
    })

    return (
        <Table className="table table-sm">
            <thead>
                <tr>
                    <th className="col-2">Users</th>
                    <th className="col-2"></th>
                </tr>
            </thead>
            <tbody>
            {users}
            </tbody>
        </Table>
    )
}

export default AdminUsrPgList;