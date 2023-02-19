const BACKEND = "https://backend.meemokidz.com/";

//AUTHENTICATION APIs
export const Login_API = `${BACKEND}auth/login/`;
export const Logout_API = `${BACKEND}auth/logout/`;
export const Register_API = `${BACKEND}auth/registration/`;
export const EmailVerify_API = `${BACKEND}auth/registration/verify-email/`;
export const PasswordReset_API = `${BACKEND}auth/password/reset/`;
export const PasswordResetConfirm_API = `${BACKEND}auth/password/reset/confirm/`;
export const PasswordChange_API = `${BACKEND}auth/password/change/`;
export const EmailChange_API = `${BACKEND}api/email_change/`;

//Social Authentication APIs
export const GoogleAuth_API = `${BACKEND}auth/google/`;
export const FacebookAuth_API = `${BACKEND}auth/facebook/`;

//USER DETAILS APIs
export const ProfileData_API = `${BACKEND}api/get_profile/`;

//ECOM APIs
export const Products_API = `${BACKEND}api/get_products/`;
export const CouponValidity_API = `${BACKEND}api/check_coupon_validity/`;
export const ProductCategory_API = `${BACKEND}api/get_product_categories/`;
export const MyOrders_API = `${BACKEND}api/get_user_orders/`;

//Payment APIs
export const PaymentSuccess_API = `${BACKEND}api/razorpay/success/`;
export const Payment_API = `${BACKEND}api/razorpay/order/`;
export const RazorpayKey_API = `${BACKEND}api/get_razorpay_id/`;

//OTHER APIs
export const Testimonials_API = `${BACKEND}api/get_testimonials/`;
export const EmailSubscription_API = `${BACKEND}api/emailsubscriber/`;
export const FeedbackForm_API = `${BACKEND}api/feedbackform/`;
export const ContactUsForm_API = `${BACKEND}api/contactusform/`;
export const ReviewRatingForm_API = `${BACKEND}api/reviewandrating/`;
export const OurTeam_API = `${BACKEND}api/get_team_members/`;
export const ReportABug_API = `${BACKEND}api/reportabug/`;
export const FAQs_API = `${BACKEND}api/get_FAQ/`;
export const TnC_API = `${BACKEND}api/get_TermsandCondition/`;
export const PrivP_API = `${BACKEND}api/get_PrivacyPolicy/`;
export const CnR_API = `${BACKEND}api/get_CancellationAndRefund/`;
export const RatingCountAPI = `${BACKEND}api/get_product_ratings/`;
export const InvoiceRequest_API = `${BACKEND}api/request_invoice/`;
