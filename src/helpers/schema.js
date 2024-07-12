import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const Interview=pgTable('prep-interview-ai',{ //table name
    id:serial('id').primaryKey(),
    jsonInterviewResponse:text('jsonInterviewResponse').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDescription:varchar('jobDescription').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    interviewId:varchar('interviewId').notNull()
});
