import React from "react";
import Button from "./Button";
function TodoFilterForm({
	filterName,
	setfilterName,
	hideCompletedFilter,
	sethideCompletedFilter,
}) {
	return (
		<div className="text-xl mb-2 flex gap-x-2">
			<div className="flex gap-x-1 items-center">
				<label htmlFor="text">Find Todo: </label>
				<input
					type="text"
					name="text"
					id="text"
					value={filterName}
					onChange={(e) => setfilterName(e.target.value)}
				/>
				<Button className="bg-green-600 ml-2">Find</Button>
			</div>
			<div>
				<input type="checkbox" checked={hideCompletedFilter}
                onChange={(e)=>sethideCompletedFilter(e.target.checked)}
                />
				<span> Hide Completed </span>
			</div>
		</div>
	);
}

export default TodoFilterForm;
