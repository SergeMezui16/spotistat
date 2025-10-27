import { useIsMobile } from "@/hooks";

export const Slicer = ({
	text,
	size = 10,
	mobileOnly = false,
}: {
	text: string;
	size?: number;
	mobileOnly?: boolean;
}) => {
	const isMobile = useIsMobile();

	if (!isMobile && mobileOnly) return text;

	if (text.length <= size) return text;

	return <span title={text}>{`${text.slice(0, size)}...`}</span>;
};
