export interface WeeklyStatus {
    statusId ?: number;
    week ?: string;
    ca ?: string[];
    cba ?: string[];
    nta ?: string[];
    rta ?: string[];
    report ?: string[];
    nwGoals ?: string[];
    newIssues ?: string[];
    caCount ?: number;
    cbaCount ?: number;
    ntaCount ?: number;
    created ?: Date;
    createdBy ?: string;
    modified ?: Date;
    modifiedBy ?: string;
}
