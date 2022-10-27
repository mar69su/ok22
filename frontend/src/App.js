import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import {Routes, Route, Navigate} from 'react-router-dom';
import Navigationbar from './components/Navigationbar';
import AdminTmtblPage from './components/AdminTmtblPage';
import AdminReservationsPage from './components/AdminReservationsPage';
import AdminUsrPage from './components/AdminUsrPage';
import FrontPage from './components/FrontPage';
import ReservationPage from './components/ReservationPage';
import TimetablePage from './components/TimetablePage';


function App() {
	
	const [state, setState] = useState({
		usersList: [],
		timetablesList: [],
		timetable: {
	        beginDate: "",
			endDate: "",
			title: "",
			visible: false,
			rows: []
		},
		token: "",
		isLogged: false,
		manageUsers: false,
		manageReservations: false,
		manageTimetables: false,
		loading: false,
		error: ""
	})
	
	const [urlRequest, setUrlRequest] = useState({
		url: "",
		request: {},
		action: ""
	})

	// STATE FUNCTIONS

	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading: loading,
				error: ""
			}
		})
	}

	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error: error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}

	const clearState = () => {
		let state = {
			usersList: [],
			timetablesList: [],
			timetable: {
				beginDate: "",
				endDate: "",
				title: "",
				visible: false,
				rows: []
			},
			isLogged: false,
			manageUsers: false,
			manageReservations: false,
			manageTimetables: false,
			token: "",
			loading: false,
			error: ""
		}
		saveToStorage(state);
		setState(state);
	}

	// ADMIN TIMETABLE STATE FUNCTIONS

	const updateTimetableForm = (param, value) => {
		let tempTimetable = state.timetable;
		tempTimetable[param] = value;
        setState((state) => {
            return {
                ...state,
				timetable: tempTimetable
			}
        })
	}

    const updateTimetableNewRow = (index) => {
        let row = {
            dock: "Granvik",
            start: false,
            week: [
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                },
                {
                    time: "",
                    landing: 0,
                    restriction: false
                }
            ]
        }
        let tempArray = state.timetable.rows;
        tempArray.splice(index, 0, row);
		let tempTimetable = state.timetable;
		tempTimetable.rows = tempArray;
        setState((state) => {
            return {
                ...state,
                timetable: tempTimetable
            }
        })
    }

    const updateTimetableEditRow = (row, index) => {
        let tempArray = state.timetable.rows;
        tempArray[index] = row;
		let tempTimetable = state.timetable;
		tempTimetable.rows = tempArray;
        setState((state) => {
            return {
                ...state,
                timetable: tempTimetable
            }
        })
	}

    const updateTimetableRemoveRow = (index) => {
        let tempArray = state.timetable.rows;
        tempArray.splice(index, 1);
		let tempTimetable = state.timetable;
		tempTimetable.rows = tempArray;
        setState((state) => {
            return {
                ...state,
                timetable: tempTimetable
            }
        })
	}

	const saveTimetable = () => {
		let id = state.timetable._id;
		if (id) {
			console.log("edit");
			editTimetable(state.timetable, id);
		} else {
			console.log("add");
			addTimetable(state.timetable);
		}
	}

	const clearTimetable = () => {
        setState((state) => {
            return {
                ...state,
				timetable: {
					beginDate: "",
					endDate: "",
					title: "",
					visible: false,
					rows: []
				}
			}
        })
	}

	// STORAGE FUNCTIONS

	const saveToStorage = (state) => {
		sessionStorage.setItem("state", JSON.stringify(state));
	}

	useEffect(() => {
		if (sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if (state.isLogged) {
				if (state.manageUsers) {
					getUsersList(state.token);
				}
				if (state.manageTimetables) {
					getTimetablesList(state.token);
				}
			}
		}
	}, [])

	// FETCH


	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			console.log(urlRequest.url);
			setLoading(true);
			let response = await fetch(urlRequest.url, urlRequest.request);
			setLoading(false);
			if(response.ok) {
				console.log("action: " + urlRequest.action);
				switch(urlRequest.action) {
					case "login":
						let loginData = await response.json();
						if (loginData) {
							setState((state) => {
								let tempState = {
									...state,
									isLogged: true,
									manageUsers: loginData.manageUsers,
									manageReservations: loginData.manageReservations,
									manageTimetables: loginData.manageTimetables,
									token: loginData.token
								}
								saveToStorage(tempState);
								return tempState;
							});
							if (loginData.manageTimetables) {
								getTimetablesList(loginData.token);
							}
							if (loginData.manageUsers) {
								getUsersList(loginData.token);
							}
						}
						return;
					case "logout":
						clearState();
						return;
					case "getuserslist":
						let usersData = await response.json();
						if(usersData) {
							setState((state) => {
								let tempState = {
									...state,
									usersList: usersData
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "adduser":
						getUsersList();
						return;
					case "edituser":
						getUsersList();
						return;
					case "removeuser":
						getUsersList();
						return;
					case "gettimetableslist":
						let timetablesData = await response.json();
						if(timetablesData) {
							setState((state) => {
								let tempState = {
									...state,
									timetablesList: timetablesData
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "gettimetable":
						let timetableData = await response.json();
						if (timetableData) {
							setState((state) => {
								let tempState = {
									...state,
									timetable: timetableData
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "addtimetable":
						getTimetablesList();
						return;
					case "edittimetable":
						getTimetablesList();
						return;
					case "removetimetable":
						getTimetablesList();
						return;
					default:
						return;
				}
			} else {
				if (response.status === 403) {
					clearState();
					setError("Your session has expired. Logging you out!");
					return;
				}
				switch(urlRequest.action) {
					case "login":
						setError("Login failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "logout":
						clearState();
						return;
					case "getuserslist":
						setError("Fetching userslist failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "adduser":
						setError("Adding new user failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "edituser":
						setError("Editing user failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "removeuser":
						setError("Removing user failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "gettimetableslist":
						setError("Fetching timetableslist failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "gettimetable":
						setError("Fetching timetable failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "addtimetable":
						setError("Adding new timetable failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "edittimetable":
						setError("Editing timetable failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "removetimetable":
						setError("Removing timetable failed. Server responded with " + response.status + " " + response.statusText)
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
	}, [urlRequest]);
	
	// LOGIN API

	const login = (user) => {
		setUrlRequest({
			url: "/login",
			request: {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(user)
			},
			action: "login"
		})
	}

	const logout = () => {
		setUrlRequest({
			url: "/logout",
			request: {
				method: "POST",
				headers: {"Content-Type": "application/json", token: state.token}
			},
			action: "logout"
		})
	}

	// REST API

	// - - - U S E R S - - -

    const getUsersList = (token) => {
		console.log("getUsersList");
        let tempToken = state.token;
        if (token) {
            tempToken = token;
        }
        setUrlRequest({
            url: "/admin/users/list",
            request: {
                method: "GET",
                headers: {"Content-Type": "application/json", token: tempToken}
            },
            action: "getuserslist"
        })
    }

	const addUser = (user) => {
		setUrlRequest({
			url: "/admin/users/add",
			request: {
				method: "POST",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(user)
			},
			action: "adduser"
		})
	}

	const removeUser = (id) => {
		setUrlRequest({
			url: "/admin/users/remove/" + id,
			request: {
				method: "DELETE",
				headers: {"Content-Type": "application/json", token: state.token}
			},
			action: "removeuser"
		})
	}

	const editUser = (user) => {
		setUrlRequest({
			url: "/admin/users/edit/" + user._id,
			request: {
				method: "PUT",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(user)
			},
			action: "edituser"
		})
	}

	const editPassword = (user) => {
		setUrlRequest({
			url: "/admin/users/password/" + user._id,
			request: {
				method: "PUT",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(user)
			},
			action: "passworduser"
		})
	}

	// - - - T I M E T A B L E S - - -

	const getTimetablesList = (token) => {
		console.log("getTimetablesList");
        let tempToken = state.token;
        if (token) {
            tempToken = token;
        }
		setUrlRequest({
			url: "/admin/timetables/list",
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json", token: tempToken}
			},
			action: "gettimetableslist"
		})
	}

	const getTimetable = (id) => {
		setUrlRequest({
			url: "/admin/timetables/one/" + id,
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json", token: state.token}
			},
			action: "gettimetable"
		})
	}

	const addTimetable = (timetable) => {
		setUrlRequest({
			url: "/admin/timetables/add",
			request: {
				method: "POST",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(timetable)
			},
			action: "addtimetable"
		})
	}

	const editTimetable = (timetable, id) => {
		setUrlRequest({
			url: "/admin/timetables/edit/" + id,
			request: {
				method: "PUT",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(timetable)
			},
			action: "edittimetable"
		})
	}

	const removeTimetable = (id) => {
		setUrlRequest({
			url: "/admin/timetables/remove/" + id,
			request: {
				method: "DELETE",
				headers: {"Content-Type": "application/json", token: state.token}
			},
			action: "removetimetable"
		})
	}

	// CONDITIONAL RENDERING

	let loadingArea = <> </>
	let messageArea = <> </>

	if (state.loading) {
		loadingArea = <>Loading...</>
	}
	if (state.error) {
		messageArea = (
			<Alert variant="danger" onClose={() => setError()} dismissible>
				{state.error}
			</Alert>
		)
	}
	let tempRender = (
		<Routes>
			<Route exact path="/" element={<FrontPage />} />
			<Route path="/reservation" element={<ReservationPage/>}/>
			<Route path="/timetable" element={<TimetablePage/>}/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
	if (state.isLogged) {
		tempRender = (
			<Routes>
				<Route exact path="/" element={<FrontPage />} />
				<Route path="/admin/users" element={<AdminUsrPage addUser={addUser} editUser={editUser} editPassword={editPassword} removeUser={removeUser} usersList={state.usersList} />}/>
				<Route path="/admin/reservations" element={<AdminReservationsPage/>}/>
				<Route path="/admin/timetables" element={<AdminTmtblPage timetablesList={state.timetablesList} timetable={state.timetable} updateTimetableForm={updateTimetableForm} updateTimetableNewRow={updateTimetableNewRow} updateTimetableEditRow={updateTimetableEditRow} updateTimetableRemoveRow={updateTimetableRemoveRow} getTimetable={getTimetable} removeTimetable={removeTimetable} saveTimetable={saveTimetable} clearTimetable={clearTimetable} />}/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}
	return (
		<div className="App">
			<Navigationbar isLogged={state.isLogged} manageUsers={state.manageUsers} manageReservations={state.manageReservations} manageTimetables={state.manageTimetables} setError={setError} login={login} logout={logout} />
			<br />
			<Container fluid>
				<Row><Col>{loadingArea}</Col></Row>
				<Row><Col>{messageArea}</Col></Row>
				<Row><Col>{tempRender}</Col></Row>
			</Container>
		</div>
	);
}

export default App;
