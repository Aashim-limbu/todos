import { useState, useEffect, useCallback } from "react";

export default function useFetch(query,OPTIONS) {
	const [error, setError] = useState(null);
	const [Data, setData] = useState(null);
	const [Loading, setLoading] = useState(true);

	const fetchData = useCallback(async (query, controller,OPTIONS={}) => {
		setLoading(true);
		setError(null);
		setData(null);

		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/${query}`,
				{
                    signal: controller.signal,
					...OPTIONS
				}
			);

			if (response.ok) {
				const data = await response.json();
				setData(JSON.stringify(data));
			} else {
				throw new Error(response.statusText);
			}
		} catch (e) {
			console.log(e);
			setError(e);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		fetchData(query, controller,OPTIONS);
		return () => controller.abort();
	}, [query, fetchData]);

	return { Loading, error, Data };
}
