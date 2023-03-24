import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { persistor, store } from "./Data/Store";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import "hover.css";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "../node_modules/hamburgers/dist/hamburgers.min.css";
import "aos/dist/aos.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-phone-input-2/lib/style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<HelmetProvider>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routes />
				<ToastContainer
					theme="colored"
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					pauseOnFocusLoss
					pauseOnHover
				/>
			</PersistGate>
		</Provider>
	</HelmetProvider>
);
