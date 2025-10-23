export const capitalize = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const isoToEmoji = (code: string) => {
	return code
		.split("")
		.map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
		.map((n) => String.fromCodePoint(n))
		.join("");
};

export const isoToName = (code: string) => {
	return new Intl.DisplayNames(['en'], { type: "region" }).of(code);
};
