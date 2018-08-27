import { Injectable } from "@angular/core";
import { ContentfulClientApi, createClient } from 'contentful';

@Injectable({
    providedIn: 'root'
})
export class ContentfulService {
    private client: ContentfulClientApi;

    constructor() {
        this.client = createClient({
            space: '4bnnc7ofze6k',
            accessToken: '06f3f71e5fe5ef3f4be95859fd412b577554b7abff951bf789964bab096fce88'
        });
    }

    public getProjects() {
        return this.client.getEntries({ content_type : 'project' });
    }
}