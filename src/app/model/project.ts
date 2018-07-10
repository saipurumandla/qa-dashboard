import { Bug } from './bug';
import { WeeklyStatus } from './weekly-status';

export interface Project {
    projectId ?: number;
    projectName ?: string;
    projectAbbr ?: string;
    testCases ?: string[];
    ca ?: string[];
    cba ?: string[];
    bugs ?: Bug[];
    weeklyStatus ?: WeeklyStatus[];
    testCasesCount ?: number;
    caCount ?: number;
    cbaCount ?: number;
}
