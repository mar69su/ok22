import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import {Routes, Route, Navigate} from 'react-router-dom';
import Navigationbar from './components/Navigationbar';
import AdminTmtblPage from './components/AdminTmtblPage';
import AdminRsrvtnsPage from './components/AdminRsrvtnsPage';
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
		timetableOfDay: [{dock: "", time: ""}],
		reservation: {},
		reservationsOfDay: [],
		reservationDate: "",
		token: "",
		isLogged: false,
		manageUsers: false,
		manageReservations: false,
		manageTimetables: false,
		loading: false,
		error: "",
		message: ""
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
				loading: loading
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

	const setMessage = (message) => {
		setState((state) => {
			let tempState = {
				...state,
				message: message
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
			timetableOfDay: [],
			reservation: {},
			reservationsOfDay: [],
			reservationDate: "",
			isLogged: false,
			manageUsers: false,
			manageReservations: false,
			manageTimetables: false,
			token: "",
			loading: false,
			error: "",
			message: ""
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
			editTimetable(state.timetable, id);
		} else {
			addTimetable(state.timetable);
		}
	}

	const saveAsNewTimetable = () => {
		addTimetable(state.timetable);
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

	// ADMIN RESERVATION STATE FUNCTIONS

	const setReservationDate = (date) => {
        setState((state) => {
            return {
                ...state,
				reservationDate: date
			}
        })
	}

	// RESERVATION STATE FUNCTIONS

	const clearReservation = () => {
        setState((state) => {
            return {
                ...state,
				reservation: {}
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
		}
	}, [])

	// FETCH


	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			//console.log(urlRequest.url);
			setLoading(true);
			let response = await fetch(urlRequest.url, urlRequest.request);
			setLoading(false);
			if(response.ok) {
				let reservationData = {};
				//console.log("action: " + urlRequest.action);
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
						setMessage("New user added");
						return;
					case "edituser":
						getUsersList();
						setMessage("User edited succesfully");
						return;
					case "removeuser":
						getUsersList();
						setMessage("User removed");
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
						clearTimetable();
						setMessage("Timetable added");
						return;
					case "edittimetable":
						getTimetablesList();
						clearTimetable();
						setMessage("Timetable edited succesfully");
						return;
					case "removetimetable":
						getTimetablesList();
						setMessage("Timetable removed");
						return;
					case "gettimetableofday":
						let timetableOfDayData = await response.json();
						if (timetableOfDayData) {
							setState((state) => {
								let tempState = {
									...state,
									timetableOfDay: timetableOfDayData
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "addreservation":
						reservationData = await response.json();
						if (reservationData) {
							clearReservation();
							setMessage("Your Reservation ID is " + reservationData.token);
						}
						return;
					case "getreservation":
						reservationData = await response.json();
						if (reservationData) {
							setState((state) => {
								let tempState = {
									...state,
									reservation: reservationData
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "cancelreservation":
						setMessage("Reservation cancelled succesfully.");
						clearReservation();
						return;
					case "getreservationsofday":
						let reservationOfDayData = await response.json();
						if (reservationOfDayData) {
							setState((state) => {
								let tempState = {
									...state,
									timetableOfDay: reservationOfDayData.timetable,
									reservationsOfDay: reservationOfDayData.reservations
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "editreservation":
						setMessage("Reservation edited succesfully.");
						getReservationsOfDay(state.reservationDate);
						return;
					case "removereservation":
						setMessage("Reservation removed succesfully.");
						getReservationsOfDay(state.reservationDate);
						return;
					case "getvisibletimetableslist":
						let visibleTimetablesData = await response.json();
						if(visibleTimetablesData) {
							setState((state) => {
								let tempState = {
									...state,
									timetablesList: visibleTimetablesData
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "getvisibletimetable":
						let visibleTimetableData = await response.json();
						if (visibleTimetableData) {
							setState((state) => {
								let tempState = {
									...state,
									timetable: visibleTimetableData
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
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
					case "gettimetableofday":
						setError("Fetching timetable failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "getreservation":
						setError("Fetching reservation failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "cancelreservation":
						setError("Removing reservation failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "getreservationsofday":
						setError("Fetching reservation failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "editreservation":
						setError("Editinting reservation failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "removereservation":
						setError("Removing reservation failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "getvisibletimetableslist":
						setError("Fetching timetableslist failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "getvisibletimetable":
						setError("Fetching timetable failed. Server responded with " + response.status + " " + response.statusText)
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

	// - - - A D M I N  U S E R S - - -

	const getUsersList = () => {
		setUrlRequest({
            url: "/admin/users/list",
            request: {
                method: "GET",
                headers: {"Content-Type": "application/json", token: state.token}
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

	// - - - A D M I N  R E S E R V A T I O N S - - -

	const getReservationsOfDay = (date) => {
		setUrlRequest({
			url: "/admin/reservations/reservations/" + date,
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json", token: state.token}
			},
			action: "getreservationsofday"
		})
	}

	const editReservation = (reservation) => {
		setUrlRequest({
			url: "/admin/reservations/edit/" + reservation._id,
			request: {
				method: "PUT",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(reservation)
			},
			action: "editreservation"
		})
	}

    const removeReservation = (id) => {
		setUrlRequest({
			url: "/admin/reservations/remove/" + id,
			request: {
				method: "DELETE",
				headers: {"Content-Type": "application/json", token: state.token}
			},
			action: "removereservation"
		})
    }


	// - - - A D M I N  T I M E T A B L E S - - -

	const getTimetablesList = () => {
		setUrlRequest({
			url: "/admin/timetables/list",
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json", token: state.token}
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

	// - - - R E S E R V A T I O N S - - -

	const getTimetableOfDay = (date) => {
		setUrlRequest({
			url: "/reservations/timetable/" + date,
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json"}
			},
			action: "gettimetableofday"
		})
	}

	const addReservation = (reservation) => {
		setUrlRequest({
			url: "/reservations/add",
			request: {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(reservation)
			},
			action: "addreservation"
		})
	}

	const getReservation = (id, lp) => {
		setUrlRequest({
			url: "/reservations/one/" + id + "/" + lp,
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json"}
			},
			action: "getreservation"
		})
	}

	const cancelReservation = (id) => {
		setUrlRequest({
			url: "/reservations/remove/" + id,
			request: {
				method: "DELETE",
				headers: {"Content-Type": "application/json"}
			},
			action: "cancelreservation"
		})
	}

	// - - - T I M E T A B L E S - - -

	const getVisibleTimetablesList = () => {
		setUrlRequest({
			url: "/timetables/list",
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json"}
			},
			action: "getvisibletimetableslist"
		})
	}

	const getVisibleTimetable = (id) => {
		setUrlRequest({
			url: "/timetables/one/" + id,
			request: {
				method: "GET",
				headers: {"Content-Type": "application/json"}
			},
			action: "getvisibletimetable"
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
	if (state.message) {
		messageArea = (
			<Alert variant="info" onClose={() => setMessage()} dismissible>
				{state.message}
			</Alert>
		)
	}
	let tempRender = (
		<Routes>
			<Route exact path="/" element={<FrontPage />} />
			<Route path="/reservation" element={<ReservationPage getTimetableOfDay={getTimetableOfDay} timetableOfDay={state.timetableOfDay} addReservation={addReservation} getReservation={getReservation} clearReservation={clearReservation} reservation={state.reservation} cancelReservation={cancelReservation} />}/>
			<Route path="/timetable" element={<TimetablePage getVisibleTimetablesList={getVisibleTimetablesList} getVisibleTimetable={getVisibleTimetable} timetablesList={state.timetablesList} timetable={state.timetable} />}/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
	if (state.isLogged) {
		tempRender = (
			<Routes>
				<Route exact path="/" element={<FrontPage />} />
				<Route path="/admin/users" element={<AdminUsrPage getUsersList={getUsersList} usersList={state.usersList} addUser={addUser} editUser={editUser} editPassword={editPassword} removeUser={removeUser} />}/>
				<Route path="/admin/reservations" element={<AdminRsrvtnsPage getReservationsOfDay={getReservationsOfDay} timetableOfDay={state.timetableOfDay} reservationsOfDay={state.reservationsOfDay} setReservationDate={setReservationDate} editReservation={editReservation} removeReservation={removeReservation} />}/>
				<Route path="/admin/timetables" element={<AdminTmtblPage getTimetablesList={getTimetablesList} timetablesList={state.timetablesList} timetable={state.timetable} updateTimetableForm={updateTimetableForm} updateTimetableNewRow={updateTimetableNewRow} updateTimetableEditRow={updateTimetableEditRow} updateTimetableRemoveRow={updateTimetableRemoveRow} getTimetable={getTimetable} removeTimetable={removeTimetable} saveTimetable={saveTimetable} saveAsNewTimetable={saveAsNewTimetable} clearTimetable={clearTimetable} />}/>
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
