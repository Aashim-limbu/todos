import React, { useState, useRef, useContext } from "react";
import Button from "./Button";
import { todoContext } from "../App";
import { TODOS_IDENTIFIER } from "../App";

function TodoList({ todo: { name, completed }}) {
	const { removeTodo, editTodo, toggle } = useContext(todoContext);
	const [Edit, setEdit] = useState(false);
	const [inputValue, setInputValue] = useState(name);
	const inputRef = useRef();

	function handleChange(e) {
		setInputValue(e.target.value);
	}

	function handleClick(e) {
		editTodo(name, inputValue);
		setEdit(false);
	}

	return (
		<ul>
			<li className="bg-slate-200 flex justify-between p-2 text-xl my-2 border border-b-black">
				{Edit ? (
					<div>
						<input
							ref={inputRef}
							type="text"
							value={inputValue}
							onChange={handleChange}
						/>
						<Button type="submit" className="ml-2" onClick={handleClick}>
							SAVE
						</Button>
					</div>
				) : (
					<div>
						<input
							type="checkbox"
							checked={completed}
							onChange={(e) => {
								toggle(name, e.target.checked);
							}}
						/>
						<span className="ml-4">{name}</span>
					</div>
				)}
				<Button
					className="bg-yellow-500"
					onClick={() => {
						setEdit((Edit) => !Edit);
					}}
				>
					EDIT
				</Button>
				<Button
					className="bg-red-500"
					onClick={() => {
						removeTodo(name);
					}}
				>
					DELETE
				</Button>
			</li>
		</ul>
	);
}

export default TodoList;
