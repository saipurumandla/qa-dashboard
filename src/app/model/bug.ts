import { Url } from 'url';

export interface Bug {
    bugId ?: number;
    status ?: string;
    url ?: Url;
    closed ?: Date;
    closedBy ?: string;
    created ?: Date;
    createdBy ?: string;
    modified ?: Date;
    modifiedBy ?: string;
}
