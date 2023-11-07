import React, {
	useReducer,
	useRef,
	useState,
	useEffect,
	createContext,
} from "react";
import TodoList from "./components/TodoList";
import Button from "./components/Button";
import TodoFilterForm from "./components/TodoFilterForm";
export const TODOS_IDENTIFIER = {
	addTodo: "ADD_TODO",
	removeTodo: "REMOVE_TODO",
	edit: "EDIT_TODO",
	toggle: "TOGGLE_CHECKBOX",
};
const LOCAL_STORAGE_KEY = "TODOS";
function reducer(state, action) {
	switch (action.type) {
		case TODOS_IDENTIFIER.addTodo:
			return {
				...state,
				TODOS: [...state.TODOS, { name: action.payload, completed: false }],
			};
		case TODOS_IDENTIFIER.removeTodo:
			return {
				...state,
				TODOS: state.TODOS.filter(({ name }) => name !== action.payload),
			};
		case TODOS_IDENTIFIER.edit:
			return {
				...state,
				TODOS: state.TODOS.map((todo) => {
					if (todo.name === action.payload)
						return { ...todo, name: action.editTodo };
					return todo;
				}),
			};
		case TODOS_IDENTIFIER.toggle:
			return {
				state,
				TODOS: state.TODOS.map((todo) => {
					if (todo.name === action.payload)
						return { ...todo, completed: action.newCompleted };
					return todo;
				}),
			};
		default:
			break;
	}
}
export const todoContext = createContext();
function App() {
	const TODO_STATE = {
		TODOS: getItem(),
	};
	const [filterName, setfilterName] = useState("");
	const [hideCompletedFilter, sethideCompletedFilter] = useState(false);
	function getItem() {
		const value = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (value == null) return [];
		return JSON.parse(value);
	}
	function addNewTodo(todo) {
		dispatch({
			type: TODOS_IDENTIFIER.addTodo,
			payload: todo,
		});
	}
	function removeTodo(name) {
		dispatch({ type: TODOS_IDENTIFIER.removeTodo, payload: name });
	}
	function editTodo(name, inputValue) {
		dispatch({
			type: TODOS_IDENTIFIER.edit,
			payload: name,
			editTodo: inputValue,
		});
	}
	function toggle(name, completed) {
		dispatch({
			type: TODOS_IDENTIFIER.toggle,
			payload: name,
			newCompleted: completed,
		});
	}
	const [{ TODOS }, dispatch] = useReducer(reducer, TODO_STATE);
	const filteredTodos = TODOS.filter(({ name, completed }) => {
		if (hideCompletedFilter && completed) return;
		return name.includes(filterName);
	});
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(TODOS));
	}, [TODOS]);
	const inputRef = useRef();
	function handleSubmit(e) {
		e.preventDefault();
		if (inputRef.current.value === "") return;
		console.log(inputRef.current.value);
		addNewTodo(inputRef.current.value);
		inputRef.current.value = "";
	}
	console.log(TODOS);
	return (
		<todoContext.Provider value={{ addNewTodo, removeTodo, editTodo, toggle }}>
			<form
				onSubmit={handleSubmit}
				className="bg-slate-300 h-screen flex flex-col items-center justify-center"
			>
				<TodoFilterForm
					filterName={filterName}
					setfilterName={setfilterName}
					hideCompletedFilter={hideCompletedFilter}
					sethideCompletedFilter={sethideCompletedFilter}
				/>
				<div className="wrapper bg-green-400 w-2/3 p-3">
					<div className="text-xl">
						<label htmlFor="NEW_TODO" className="mr-2">
							NEW TODO:
						</label>
						<input autoFocus ref={inputRef} type="NEW TODO" id="NEW_TODO" />
						<Button type="submit" className="ml-2">
							ADD
						</Button>
					</div>
					<div className="flex flex-col mt-2">
						{filteredTodos.map((todo, index) => (
							<TodoList todo={todo} key={index} dispatch={dispatch} />
						))}
					</div>
				</div>
			</form>
		</todoContext.Provider>
	);
}

export default App;
