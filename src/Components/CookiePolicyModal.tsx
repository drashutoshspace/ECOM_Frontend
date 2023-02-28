import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

export default function CookiePolicyModal(): JSX.Element {
	return (
		<CookieConsent
			location="bottom"
			cookieName="myAwesomeCookieName2"
			style={{
				background: "#f2f4f6",
				color: "#00214d",
				fontSize: "16px",
				fontWeight: "600",
				zIndex: "9999",
			}}
			buttonStyle={{
				color: "#00214d",
				fontSize: "14px",
				background: "#fde24f",
				borderRadius: "5px",
				fontWeight: "700",
			}}
			buttonText={"I understood"}
			expires={150}
		>
			By continuing browsing our site you agree with our&nbsp;
			<Link className="colorlightblue yellowhover" to="/privacypolicy">
				Privacy & Cookie Policy
			</Link>
			&nbsp;and&nbsp;
			<Link
				className="colorlightblue yellowhover"
				to="/termsandconditions"
			>
				Terms &amp; Conditions
			</Link>
			.
		</CookieConsent>
	);
}
