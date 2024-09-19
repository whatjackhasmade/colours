"use client";

import React from "react";

export function useCopyToClipboard() {
	const [copiedValue, setCopiedValue] = React.useState("");

	const copyToClipboard = (text: string) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		document.execCommand("copy");
		textArea.remove();
		setCopiedValue(text);
	};

	return { copyToClipboard, copiedValue };
}
