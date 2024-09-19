"use client";

import { useEffect } from "react";

interface UseKeypressArgs {
	key: string;
	onKeyPressed: () => void;
}

export function useKeypress({ key, onKeyPressed }: UseKeypressArgs) {
	function keyDownHandler(event: KeyboardEvent) {
		if (event.key === key) {
			event.preventDefault();
			onKeyPressed();
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, []);
}
