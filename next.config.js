//env's in env.local are loaded server, env's here are loaded to client

const path = require("path");

module.exports = {
  webpack: (config) => {
    return config;
  },

  env: {
    DJANGO_API_URL: process.env.DJANGO_API_URL,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    BASE_URL: process.env.BASE_URL,
  },
};
