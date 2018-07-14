import { Bug } from './bug';
import { WeeklyStatus } from './weekly-status';
import { User } from './user';

export class Project {
    $key ?: string;
    projectName ?: string;
    projectAbbr ?: string;
    testCases ?: string[];
    ca ?: string[];
    cba ?: string[];
    bugs ?: Bug[];
    weeklyStatus ?: WeeklyStatus[];
    users ?: User[];
}
