export class ParseACL {
    [key: string]: ReadWriteACL;
}

export class ReadWriteACL {
    read?: string;
    write?: string;
}