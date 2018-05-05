import { Component, ElementRef, ViewChild } from '@angular/core'
import { ProjectTileRow } from '../../models/project-widget/square-row.model';
import { ProjectTileSquare } from '../../models/project-widget/square.model';

@Component({
    templateUrl: './projectTile.component.html',
    selector: 'project-tile',
    styleUrls: ['./projectTile.component.scss']
})
export class ProjectTileComponent {
    @ViewChild('tile') private container: ElementRef;

    private dimensions = {
        width: 700,
        height: 500,
        squareWidth: 100
    };
    private rows: ProjectTileRow[];
    private overlayClass: string;
    private timeoutId;

    private get tilesWide() {
        return this.dimensions.width / this.dimensions.squareWidth;
    }

    private get tilesHigh() {
        return this.dimensions.height / this.dimensions.squareWidth;
    }

    constructor() {
        this.rows = [];
    }

    ngOnInit() {
        this.initRows();
    }

    private initRows() {
        for(let i = 0; i < this.tilesHigh; i++) {
            let row = new ProjectTileRow(i * this.dimensions.squareWidth);
            row.squares.push(...this.getRowSquares());
            this.rows.push(row);
        }
        console.log(this.rows);
    }

    private getRowSquares(): ProjectTileSquare[] {
        let squares: ProjectTileSquare[] = [];
        let lastSquare: ProjectTileSquare = undefined;

        for(let i = 0; i < this.tilesWide; i++) {
            let square = new ProjectTileSquare(
                this.dimensions.squareWidth, 
                this.dimensions.squareWidth,
                i * this.dimensions.squareWidth
            );
            square.loadStyles(lastSquare);
            squares.push(square);
            lastSquare = square.complementary(square);
            squares.push(lastSquare);
        }

        return squares;
    }

    public enter() {
        if(this.timeoutId) clearTimeout(this.timeoutId);
        this.overlayClass = 'hide';
        for(let i = 0; i < this.rows.length; i++) {
            this.rows[i].startAnimation();
        }
    }

    public leave() {
        this.overlayClass = '';
        this.timeoutId = setTimeout(() => {
            for(let i = 0; i < this.rows.length; i++) {
                this.rows[i].stopAnimation();
            }
        }, 500);
    }
}