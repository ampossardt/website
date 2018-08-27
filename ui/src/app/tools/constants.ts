import { TechItem } from "../models/techItem.model";

export class Colors {
    public static seafoam: string = "#1cff94";
    public static shadesOfGray: string[] = ["#39393E", "#3F3F44", "#45454A", "#4B4B50", "#525256", "#58585C"];//["#1cff94", "#4dffab", "#1aff93", "#00e679", "#00b35e"];
}

export class TechItems {
    public static get list(): TechItem[] {
        return [
            new TechItem('csharp.svg', 'c#', .15),
            new TechItem('netcore.svg', '.net core', .15),
            new TechItem('angular.svg', 'angular', .15),
            new TechItem('html5.svg', 'html5', .15),
            new TechItem('css3.svg', 'css', .15),
            new TechItem('git.svg', 'git', .15),
            new TechItem('docker.svg', 'docker', .15),
            new TechItem('kubernetes-logo.svg', 'kubernetes', .15)
        ];
    }
}