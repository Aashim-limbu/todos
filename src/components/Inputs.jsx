function Inputs({handleChange,currentInput,label}) {
	return (
		<div className="flex-1">
			<label htmlFor="Todo" className="font-bold" >
				{label} :
			</label>
			<input onChange={e=>handleChange(e)}
				type="text"
				id="Todo"
				className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				placeholder={`Enter ${label}:`}
                value={currentInput}
			/>
		</div>
	);
}

export default Inputs;
