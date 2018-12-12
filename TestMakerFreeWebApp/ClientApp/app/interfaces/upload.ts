interface Upload {
    Id: number;
    File: File;
    FileName: string;
    Description: string;
    Links: Links;
}

interface Links {
    Links: LinkDto;
}

interface LinkDto {
    Href: string;
    Rel: string;
    Method: string;
}