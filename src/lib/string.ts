import { format } from "timeago.js";

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
	return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

export const timeAgo = (time: string) => {
	return format(time, "en");
};

export const initials = (value?: string): string => {
  if (!value) return 'IN';

  return value
    .split(" ")
    .map(word => word[0].toUpperCase())
    .join("");
};

