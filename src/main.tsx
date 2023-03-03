import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import { HelmetProvider } from "react-helmet-async";
import CartProvider from "./Contexts/CartContext";
import OrderDetailProvider from "./Contexts/OrderDetailContext";
import WishlistProvider from "./Contexts/WishlistContext";
import SingleEntityProvider from "./Contexts/SingleEntityContext";
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
		<CookiesProvider>
			<CartProvider>
				<SingleEntityProvider>
					<WishlistProvider>
						<OrderDetailProvider>
							<Routes />
							<ToastContainer
								theme="colored"
								position="bottom-center"
								autoClose={5000}
								hideProgressBar={false}
								pauseOnFocusLoss
								pauseOnHover
							/>
						</OrderDetailProvider>
					</WishlistProvider>
				</SingleEntityProvider>
			</CartProvider>
		</CookiesProvider>
	</HelmetProvider>
);
