import { isBrowser } from "react-use/lib/misc/util";
import axios from "axios";
import { Api as SwaggerApiInstance } from "./swagger.api";

const baseURL = isBrowser
  ? `${window.location.origin}/rewrite/scmp-api`
  : `${process.env.SCMP_API_URL}`;

const API = axios.create({
  baseURL,
});

const PureAPI = axios.create();

const Swagger = new SwaggerApiInstance();
Swagger.instance = API;

export const SwaggerAPI = Swagger;

export { PureAPI };
export default API;
