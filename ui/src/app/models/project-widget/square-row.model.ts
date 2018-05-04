import { ProjectTileSquare } from './square.model';

export class ProjectTileRow {
    public offset: number;
    public squares: ProjectTileSquare[];
    public style: any;

    constructor(offset: number) {
        this.squares = [];
        this.offset = offset;
        this.style = {
            'top': `${this.offset}px`
        };
    }

    public startAnimation() {
        for(let i = 0; i < this.squares.length; i++) {
            this.squares[i].startAnimation();
        }
    }

    public stopAnimation() {
        for(let i = 0; i < this.squares.length; i++) {
            this.squares[i].stopAnimation();
        }
    }
}