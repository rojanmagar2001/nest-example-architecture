import { Request } from "express";
import { ISession } from "../interfaces";
import requestIp from "request-ip";
import geoip from "geoip-lite";
import { ConflictException } from "@nestjs/common";
import DeviceDetector from "node-device-detector";

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: true,
  deviceTrusted: true,
  deviceInfo: true,
  maxUserAgentSize: 500,
});

export function extractGeoIpInformation(req: Request): ISession {
  const clientIp = requestIp.getClientIp(req);

  console.log("clientIp", clientIp);

  if (!clientIp) throw new ConflictException("Could not extract client IP");

  const geo = geoip.lookup(clientIp);

  console.log("geo", geo);

  //   if (!geo) throw new ConflictException("Could not extract geo information");

  const userAgent = req.headers["user-agent"]?.toString() || "";

  const deviceDetector = new DeviceDetector();

  const device = deviceDetector.detect(userAgent);

  console.log(device);

  return {
    ip: clientIp,
    geo: geo ? (geo.city ? `${geo.city}, ${geo.country}` : geo.country) : "",
    userAgent,
    device: device.device?.brand || "",
    os: device.os?.name || "",
    browser: device.client?.name || "",
    type: device.device?.type || "",
    model: device.device?.model || "",
  };
}
