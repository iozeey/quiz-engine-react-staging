import includes from "lodash/includes";
export const isLocalHosted = includes(window.location.hostname, "localhost");
export const isStaging = includes(window.location.hostname, "gradingly.netlify.app");
export const baseUrl = isLocalHosted
  ? "http://localhost:8000"
  : isStaging ? "https://staging.gradingly.com":"https://app.gradingly.com";

export const baseStagingAPI = `${baseUrl}/api`;

export const getBaseApiUrl = () => baseStagingAPI;
