/*        TOAST       */
export const TOAST_INFO = 'info';
export const TOAST_ERROR = 'error';
export const TOAST_SUCCESS = 'success';


/*        GLOBAL        */
export const SPEED = 22;
export const PRICE_PER_M = 0.0005 // 0.50 cts / km = 0,0005 cts / m;
export const PRICE_PER_KM = 0.50 // 0.50 cts / km = 0,0005 cts / m;
export const API_KEY_EASY_TRANSAC = 'et_test_5mvkggrq485-wezdon89-kokzj9e1-7gy3vk6y-jbxkv93m-701z9pr0';

/*        PAYMENT_STATUS        */
export const PAYMENT_SUCCESS = 'captured"';
export const PAYMENT_3D_SECURE_IN_PROGRESS = 'captured"'
export const PAYMENT_FAILED = ''

/*        SIGN-UP FORM*/
export const EMAIL = 'Email';
export const EMAIL_PLACEHOLDER = 'Saisissez votre adresse mail';
export const PASSWORD = 'Mot de passe';
export const PASSWORD_PLACEHOLDER = 'Saisissez votre mot de passe';
export const PHONE = 'Téléphone';
export const PHONE_PLACEHOLDER = 'Téléphone';
export const FULLNAME = 'Nom complet';
export const FULLNAME_PLACEHOLDER = 'Nom complet';
export const BIRTHDAY = 'Date de naissance';
export const BIRTHDAY_PLACEHOLDER = 'Date de naissance';


//export const EMAIL = 'email';
/*        CONNEXION       */
export const HOST_PRO = 'http://195.110.59.212:83';
export const HOST = 'http://195.110.59.212:84';
export const NODE_ENV = 'development';
/*        ENDPOINT API       */
export const API = '/api';
export const PUBLIC = '/public';
export const LOGIN = '/auth/sign-in';
export const SIGNUP = '/auth/sign-up';
export const SIGNUP_VALIDATION = '/auth/sign-up/validation';
export const SIGNUP_SEND_CODE = '/auth/sign-up/send';
export const FORGOTTEN_PASSWORD = '/auth/forgotten-password';
export const FORGOTTEN_PASSWORD_VALIDATION = '/auth/forgotten-password/validation';
export const FORGOTTEN_PASSWORD_RESET = '/auth/forgotten-password/reset';
export const CONTACT_US = 'contact-us';
/*        User       */
export const USER = '/user';
export const CATEGORIES = '/categories';
export const CUSTOM_CATEGORIES = '/categories/custom';
export const SHOP = '/shop';
export const PRODUCT = '/product';
export const PRODUCT_STATUS = '/product/status';
export const UNIT_OF_MEASUREMENT = '/unit/measurement';
export const ORDER = '/order';
export const ORDER_STATUS = '/order/status';
export const PROMOTION = '/promotion';
export const DELIVERY_ADDRESS = '/delivery-address';
export const FAVORIS = '/favoris';
export const METHODS_OF_PAYMENT = '/methods-of-payment';
export const USER_ORDERS = '/orders';

/*        GLOBAL       */
export const ERROR = 'Une erreur est survenue';
export const ERROR_NETWORK_REQUEST =
  'Impossible de récupérer les données, le serveur est indisponible ou une erreur est survenue, veuillez réessayer plus tard';
export const EMPTY_FIELD = 'Champ vide';
export const NUMBER_OF_PICTURES = 4;
/*        AUTH       */
export const BAD_COMBINATION = 'Combinaison incorrect';
export const SIGN_IN_SUCCESS = 'Vous êtes connecté';
export const SEND_NEW_UNIQ_CODE = 'Nouveau code envoyé';
/*        USER       */
export const UPDATE_USER_SUCCESS =
  'Mis à jour avec succès';
/*        DELIVERY ADDRESS       */
export const NEW_DELIVERY_ADDRESS_SUCCESS = 'Nouvelle adresse ajoutée!';
export const UPDATE_DELIVERY_ADDRESS_SUCCESS = 'Adresse mis à jour!';
export const DELETE_DELIVERY_ADDRESS_SUCCESS = 'Adresse supprimée!';
/*        METHODS OF PAYMENT       */
export const NEW_METHODS_Of_PAYMENT_SUCCESS = 'Nouvelle méthode de paiement ajoutée!';
export const UPDATE_METHODS_Of_PAYMENT_SUCCESS = 'Méthode de paiement mis à jour!';
export const DELETE_METHODS_Of_PAYMENT_SUCCESS = 'Méthode de paiement supprimée!';
/*        FAVORIS       */
export const NEW_FAVORIS_SUCCESS = 'Nouveau produit ajouté en favoris!';
export const DELETE_FAVORIS_SUCCESS = 'Favoris supprimée!';
/*          BASKET/CART        */
export const ADD_CART_SUCCESS = 'Produit ajouté au panier';
export const DELETE_CART_SUCCESS = 'Produit supprimé du panier';
/*        ORDERS       */
export const NEW_ORDER_SUCCESS = 'Restez au chaud, on s\'occupe de tous ! ';
//export const NEW_ORDER_SUCCESS = 'Nouvelle commande';
export const UPDATE_ORDER_SUCCESS = 'Commande mis à jour!';
export const DELETE_ORDER_SUCCESS = 'Commande supprimée!';
/*        PROMOTION      */
export const NEW_PROMOTION_SUCCESS = 'Promotion ajoutée!';
export const UPDATE_PROMOTION_SUCCESS = 'Promotion mis à jour!';
export const DELETE_PROMOTION_SUCCESS = 'Promotion supprimée!';
export const DISABLED_PROMOTION_SUCCESS = 'Promotion activée!';
export const ENABLED_PROMOTION_SUCCESS = 'Promotion désactivée!';



/*                              PAYMENT                           */

export const SQUARE_APP_ID = 'sandbox-sq0idb-ase5q_J85-q9LBCunv7w0g';
// Make sure to remove trailing `/` since the CHARGE_SERVER_URL puts it
export const CHARGE_SERVER_HOST = 'REPLACE_ME';
export const CHARGE_SERVER_URL = `${CHARGE_SERVER_HOST}/chargeForCookie`;
export const GOOGLE_PAY_LOCATION_ID = 'REPLACE_ME';
export const APPLE_PAY_MERCHANT_ID = 'REPLACE_ME';
// constants require for card on file transactions
export const CREATE_CUSTOMER_CARD_SERVER_URL = `${CHARGE_SERVER_HOST}/createCustomerCard`;
export const CHARGE_CUSTOMER_CARD_SERVER_URL = `${CHARGE_SERVER_HOST}/chargeCustomerCard`;
export const CUSTOMER_ID = 'REPLACE_ME';


/*                              BASKET TEXT                           */
export const EMPTY_BASKET_TEXT = "Votre panier est vide."
