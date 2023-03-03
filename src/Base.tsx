import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import ScrollButton from "./Components/ScrollButton";
import CookiePolicyModal from "./Components/CookiePolicyModal";
import HomeShape from "./Components/HomeShape";
import AOS from "aos";
const Base = ({ children }: any) => {
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			AOS.init();
		}
		return () => {
			mounted = false;
		};
	}, []);
	useEffect(() => {
		var mounted = true;
		if (mounted) {
			AOS.refresh();
		}
		return () => {
			mounted = false;
		};
	}, []);
	return (
		<>
			<Navbar />
			{children}
			<ScrollButton />
			<CookiePolicyModal />
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				pauseOnFocusLoss
				pauseOnHover
			/>
			<HomeShape backcolor="colorblue" />
			<Footer />
		</>
	);
};
export default Base;
