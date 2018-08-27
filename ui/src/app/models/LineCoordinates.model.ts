import { Colors } from '../tools/constants';

export class LineCoordinates {
    public start: CoordinatePair;
    public end: CoordinatePair;
    public amount: number;
    public incrementAmount: number;
    public color: string;
    public doneDrawing: boolean = false;

    constructor(height: number) {
        this.start = new CoordinatePair(this.getRandom(), 0);
        this.end = new CoordinatePair(this.getRandom(), height);
        this.amount = 0;
        this.incrementAmount = Math.random() * 0.01 + 0.005;
        this.color = this.getRandomColor();
    }

    private getRandom() {
        return Math.random() * window.innerWidth;
    }

    // private getRandomEnd(start: number, height: number) {
    //     let range = window.innerWidth / 4;
    //     let lowerBound = start - range < 0 ? 0 : start - range;
    //     let upperBound = start + range > height ? height : start + range;

    //     return (Math.random() * (upperBound - lowerBound)) + lowerBound;
    // }

    private getRandomColor(): string {
        return Colors.shadesOfGray[Math.floor(Math.random() * Colors.shadesOfGray.length)];
    }
}

export class CoordinatePair {
    public x: number;
    public y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}