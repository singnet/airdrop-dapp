import { UAParser } from "ua-parser-js";

const isServer = typeof window === "undefined";

const parser = !isServer ? new UAParser(window.navigator.userAgent):null;


const { type } =!isServer? parser.getDevice(): {};

export const userAgent =!isServer? parser.getResult(): {};

export const isMobile = type === "mobile" || type === "tablet";
