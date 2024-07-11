import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

const Interview=pgTable('prepInterview',{
    id:serial('id').primaryKey(),
    jsonInterviewResponse:text('jsonInterviewResponse').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDescription:varchar('jobDescription').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdBy'),
    interviewId:varchar('interviewId').notNull()
});

export default Interview;