"use client";

import React from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useKeypress } from "@/hooks/useKeypress";
import { getLuminance, hexToRgb } from "@/utils";

const characters = "0123456789ABCDEF";

function generateRandomHex(): string {
	let result = "";

	for (let i = 0; i < 6; i++) {
		result += characters[Math.floor(Math.random() * 16)];
	}

	return `#${result}`;
}

export function getTextColorBasedOnBg(hexColor: string): string {
	const rgb = hexToRgb(hexColor);
	if (!rgb) return "#000"; // Default to black in case of invalid color

	const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
	return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export default function Container() {
	const [backgroundColour, setBackgroundColour] = React.useState("#000000");
	const [textColour, setTextColour] = React.useState("#FFFFFF");
	const { copyToClipboard } = useCopyToClipboard();

	useKeypress({
		key: " ",
		onKeyPressed: () => {
			const generatedBackgroundColour = generateRandomHex();
			setBackgroundColour(generatedBackgroundColour);
			copyToClipboard(generatedBackgroundColour);

			const generatedTextColour = getTextColorBasedOnBg(
				generatedBackgroundColour
			);

			console.log(generatedTextColour);
			setTextColour(generatedTextColour);
		},
	});

	const rgbValue = hexToRgb(backgroundColour);

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: backgroundColour,
			}}
		>
			<p
				style={{
					color: textColour,
					fontSize: "5rem",
				}}
			>
				{backgroundColour}
			</p>
			<ul
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem",
					listStyle: "none",
					color: textColour,
					textAlign: "center",
				}}
			>
				{rgbValue && (
					<li>
						rgb(
						{Object.values(rgbValue).join(", ")})
					</li>
				)}
				{rgbValue && (
					<li>
						rgba(
						{Object.values(rgbValue).join(", ")}, 1)
					</li>
				)}
			</ul>
		</div>
	);
}
