/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/helpers/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:CRO3Y0xDEXSt@ep-shy-dream-a5jm7hzo.us-east-2.aws.neon.tech/Prep%20Interview%20AI?sslmode=require",
    }
  };