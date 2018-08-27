export class TechItem {
    public imageName: string;
    public label: string;
    private baseUrl: string;
    private offset: number;

    constructor(imageName: string, label: string, offset: number) {
        this.baseUrl = 'assets/img/';
        this.imageName = imageName;
        this.label = label;
        this.offset = offset;
    }

    public get imagePath(): string {
        return `${this.baseUrl}${this.imageName}`;
    }

    public getDelay(index: number): string {
        return `${(index + 1) * this.offset}s`;
    }
}