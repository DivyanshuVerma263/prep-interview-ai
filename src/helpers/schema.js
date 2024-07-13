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

export const UserAnswer=pgTable('userAnswer',{ //table name
    id:serial('id').primaryKey(),
    interviewIdRef:varchar('interviewId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
});
