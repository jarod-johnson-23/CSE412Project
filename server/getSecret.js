const SecretsManager = require("aws-sdk/clients/secretsmanager");
const client = new SecretsManager({
  region: "us-west-1",
});

async function getSecret(secretName) {
  const response = await client
    .getSecretValue({ SecretId: secretName })
    .promise();

  if ("SecretString" in response) {
    return response.SecretString;
  }

  return Buffer.from(response.SecretBinary, "base64").toString("ascii");
}

module.exports = { getSecret };
