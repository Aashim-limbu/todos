import { useState, useEffect } from "react";

function useLocalStorage(index, initialValue) {
	const storedValue = localStorage.getItem(index);

	const initial =
		storedValue && storedValue !== "undefined" && storedValue !== "null"
			? JSON.parse(storedValue)
			: initialValue;

	const [value, setValue] = useState(initial);

	useEffect(() => {
		localStorage.setItem(index, JSON.stringify(value));
	}, [value, index]);

	return [value, setValue];
}

export default useLocalStorage;
