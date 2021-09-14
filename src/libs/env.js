import includes from "lodash/includes";
export const isLocalHosted = includes(window.location.hostname, "localhost");
export const isStaging = includes(window.location.hostname, "gradingly.netlify.app");
export const baseUrl = isLocalHosted
  ? "http://localhost:8000"
  : isStaging ? "https://staging.gradingly.com":"http://18.133.72.95:8000";

export const baseStagingAPI = `${baseUrl}/api`;

export const getBaseApiUrl = () => baseStagingAPI;
