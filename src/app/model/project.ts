import { Bug } from './bug';
import { WeeklyStatus } from './weekly-status';
import { User } from './user';
import { TestCase } from './testcase';

export class Project {
    $key ?: string;
    projectName ?: string;
    projectAbbr ?: string;
    testCases ?: TestCase[];
    bugs ?: Bug[];
    weeklyStatus ?: WeeklyStatus[];
    users ?: User[];
}
