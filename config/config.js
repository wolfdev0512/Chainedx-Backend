const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  FB_TYPE,
  FB_PROJECT_ID,
  FB_PRIVATE_KEY_ID,
  FB_PRIVATE_KEY,
  FB_CLIENT_EMAIL,
  FB_CLIENT_ID,
  FB_AUTH_URI,
  FB_TOKEN_URI,
  FB_AUTH_PROVIDER_X509_CERT_URL,
  FB_CLIENT_X509_CERT_URL,
  FB_UNIVERSE_DOMAIN,
  FB_STORAGEBUCKET,
} = process.env;

// adding init assertions
assert(PORT, "Application port is required");
assert(FB_TYPE, "Firebase type is required");
assert(FB_PROJECT_ID, "Firebase project_id is required");
assert(FB_PRIVATE_KEY_ID, "Firebase private_key_id is required");
assert(FB_PRIVATE_KEY, "Firebase private_key is required");
assert(FB_CLIENT_EMAIL, "Firebase client_email is required");
assert(FB_CLIENT_ID, "Firebase client_id is required");
assert(FB_AUTH_URI, "Firebase auth_uri is required");
assert(FB_TOKEN_URI, "Firebase token_uri is required");
assert(FB_AUTH_PROVIDER_X509_CERT_URL, "Firebase auth_x509 is required");
assert(FB_CLIENT_X509_CERT_URL, "Firebase client_x509 is required");
assert(FB_UNIVERSE_DOMAIN, "Firebase universe_domain is required");
assert(FB_STORAGEBUCKET, "Firebase storage_bucket is required");



module.exports = {
  port: PORT,

  firebaseConfig: {
    type: FB_TYPE,
    project_id: FB_PROJECT_ID,
    private_key_id: FB_PRIVATE_KEY_ID,
    private_key: FB_PRIVATE_KEY,
    client_email: FB_CLIENT_EMAIL,
    client_id: FB_CLIENT_ID,
    auth_uri: FB_AUTH_URI,
    token_uri: FB_TOKEN_URI,
    auth_provider_x509_cert_url: FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: FB_CLIENT_X509_CERT_URL,
    universe_domain: FB_UNIVERSE_DOMAIN,
  },

  storage_bucket: FB_STORAGEBUCKET
};
