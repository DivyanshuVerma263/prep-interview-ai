/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/helpers/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://prep-interview_owner:4SR5NknqEOUo@ep-plain-boat-a5avvqvz.us-east-2.aws.neon.tech/prep-interview?sslmode=require",
    }
  };