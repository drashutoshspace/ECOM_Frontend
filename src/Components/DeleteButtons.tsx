import { toast } from "react-toastify";

export function DeleteButtonForCart({
	isAuthenticated,
	onClick,
}: {
	isAuthenticated: boolean;
	onClick: () => void;
}) {
	return (
		<button
			className="ms-2 colorblue border-0 border5px bgyellow bglightblue"
			onClick={() => {
				if (isAuthenticated) {
					onClick();
				} else {
					return toast.warning("Please login first!");
				}
			}}
			style={{ width: 40, height: 40 }}
		>
			<i className="fas fa-times" />
		</button>
	);
}
