import { IDevice, UAParser } from "ua-parser-js";

const isServer = typeof window === "undefined";

const parser = !isServer ? new UAParser(window.navigator.userAgent) : null;

const emptyDevice: IDevice = { model: undefined, type: undefined, vendor: undefined };
const { type }: IDevice = !isServer ? parser!.getDevice() : emptyDevice;

export const userAgent = !isServer ? parser?.getResult() : {};

export const isMobile = type === "mobile" || type === "tablet";
