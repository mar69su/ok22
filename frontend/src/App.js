import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import {Routes, Route, Navigate} from 'react-router-dom';
import Navigationbar from './components/Navigationbar';
import AdminReservationsPage from './components/AdminReservationsPage';
import AdminTimetablesPage from './components/AdminTimetablesPage';
import AdminUsersPage from './components/AdminUsersPage';
import FrontPage from './components/FrontPage';
import ReservationPage from './components/ReservationPage';
import TimetablePage from './components/TimetablePage';


function App() {
	
	const [state, setState] = useState({
		usersList: [],
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

	const cleanState = () => {
		let state = {
			list: [],
			usersList: [],
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

	// STORAGE FUNCTIONS

	const saveToStorage = (state) => {
		sessionStorage.setItem("state", JSON.stringify(state));
	}

	useEffect(() => {
		if (sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if (state.isLogged) {
				getUsersList(state.token);
			}
		}
	}, [])

	// FETCH


	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			setLoading(true);
			let response = await fetch(urlRequest.url, urlRequest.request);
			setLoading(false);
			if(response.ok) {
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
							getUsersList(loginData.token);
						}
						return;
					case "logout":
						cleanState();
						return;
					case "getuserslist":
						let data = await response.json();
						if(data) {
							setState((state) => {
								let tempState = {
									...state,
									usersList: data
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
					default:
						return;
				}
			} else {
				if (response.status === 403) {
					cleanState();
					setError("Your session has expired. Logging you out!");
					return;
				}
				switch(urlRequest.action) {
					case "login":
						setError("Login failed. Server responded with " + response.status + " " + response.statusText)
						return;
					case "logout":
						cleanState();
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

    const getUsersList = (token) => {
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
			url: "/admin/users/edit/" + user.id,
			request: {
				method: "PUT",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(user)
			},
			action: "edituser"
		})
	}

	const addTimetable = (item) => {
		setUrlRequest({
			url: "/admin/timetables/add",
			request: {
				method: "POST",
				headers: {"Content-Type": "application/json", token: state.token},
				body: JSON.stringify(item)
			},
			action: "addtimetable"
		})
	}

	// CONDITIONAL RENDERING

	let messageArea = <> </>

	if (state.loading) {
		messageArea = <>Loading...</>
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
				<Route path="/admin/reservations" element={<AdminReservationsPage/>}/>
				<Route path="/admin/timetables" element={<AdminTimetablesPage addTimetable={addTimetable} />}/>
				<Route path="/admin/users" element={<AdminUsersPage addUser={addUser} editUser={editUser} removeUser={removeUser} usersList={state.usersList} />}/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}
	return (
		<div className="App">
			<Navigationbar isLogged={state.isLogged} manageUsers={state.manageUsers} manageReservations={state.manageReservations} manageTimetables={state.manageTimetables} setError={setError} login={login} logout={logout} />
			<br />
			<Container fluid>
				<Row><Col>{messageArea}</Col></Row>
				<Row><Col>{tempRender}</Col></Row>
			</Container>
		</div>
	);
}

export default App;
