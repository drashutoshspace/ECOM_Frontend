import React, { Fragment } from "react";
import Link from "next/link";

const LogoImage = ({ logo }) => {
	return (
		<Fragment>
			<Link href={"/"}>
				<a>
					<img src={`/assets/MeeMo.png`} alt="" height="75px" />
				</a>
			</Link>
		</Fragment>
	);
};

export default LogoImage;
