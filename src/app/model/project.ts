import { Bug } from './bug';
import { WeeklyStatus } from './weekly-status';

export class Project {
    $key ?: string;
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
