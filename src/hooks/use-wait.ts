import { useEffect, useState } from "react";

export const useWait = (ms: number = 1000) => {
	const [isWaiting, setIsWaiting] = useState(true);

	useEffect(() => {
		const id = setTimeout(() => {
			setIsWaiting(false);
		}, ms);

		return () => {
			clearTimeout(id);
		};
	}, [ms]);

	return isWaiting;
};
