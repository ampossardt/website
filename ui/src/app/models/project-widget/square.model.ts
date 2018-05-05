export class ProjectTileSquare {
    public width: number;
    public height: number;
    public offset: number;
    public style: any;
    public classes: any;
    public remainingColors: string[]
    public directions: string[];
    public isFirstHalf: boolean;
    public iterationCount: string;

    constructor(width?: number, height?: number, offset?: number) {
        this.offset = offset;
        this.initColors();
        this.directions = ['top-left', 'bottom-left', 'top-right', 'bottom-right'];
        this.classes = {
            stackable: 'stackable',
            triangle: 'triangle'
        };
        this.style = {
            'animation-delay': `${this.randomFloat() * 2}s`,
            'left': `${this.offset}px`,
            'animation-iteration-count': this.iterationCount
        };
    }

    public loadStyles(lastSquare: ProjectTileSquare) {
        if(!lastSquare) {
            this.initNewTriangle();
        } else {
            this.initExistingTriangle(lastSquare);
        }
    }

    public complementary(complement: ProjectTileSquare): ProjectTileSquare {
        let newSquare = new ProjectTileSquare(this.width, this.height, this.offset);
        newSquare.loadStyles(complement);
        return newSquare;
    }

    public startAnimation() {
        this.classes.animate = 'disappear';
        //this.classes.iteration = '';
    }

    public stopAnimation() {
        this.classes.animate = '';
        //this.classes.iteration = 'stop';
    }

    public get classList(): string[] {
        let classes = [];

        for (var property in this.classes) {
            if (this.classes.hasOwnProperty(property)) {
                classes.push(this.classes[property]);
            }
        }

        return classes;
    }

    private initNewTriangle() {
        let randomColorIndex = this.random(this.remainingColors.length);
        this.classes.color = this.remainingColors[randomColorIndex];
        this.remainingColors.splice(randomColorIndex, 1)

        let randomDirectionIndex = this.random(this.directions.length);
        this.classes.direction = this.directions[randomDirectionIndex];
        this.isFirstHalf = true;
    }

    private initExistingTriangle(lastSquare: ProjectTileSquare) {
        this.remainingColors = lastSquare.remainingColors;

        if(!this.remainingColors.length) this.initColors();

        let randomColorIndex = this.random(this.remainingColors.length);
        this.classes.color = this.remainingColors[randomColorIndex];
        this.remainingColors.splice(randomColorIndex, 1);

        if(lastSquare.isFirstHalf) {
            this.classes.direction = this.getCorrespondingTriangle(lastSquare.classes.direction);
        } else {
            let randomDirectionIndex = this.random(this.directions.length);
            this.classes.direction = this.directions[randomDirectionIndex];
        }

        this.isFirstHalf = !lastSquare.isFirstHalf;
    }

    private random(max) {
        return Math.floor(Math.random() * max);
    }

    private randomFloat() {
        let factor = Math.pow(10, 2);
        return Math.round(Math.random() * factor) / factor;
    }

    private getCorrespondingTriangle(direction: string) {
        switch(direction) {
            case 'top-left':
                return 'bottom-right';
            case 'top-right':
                return 'bottom-left';
            case 'bottom-left':
                return 'top-right';
            case 'bottom-right':
                return 'top-left';
        }
    }

    private initColors() {
        this.remainingColors = ['light-green', 'medium-green', 'dark-green', 'extra-dark-green', 'light-gray', 'medium-gray', 'dark-gray', 'extra-dark-gray'];
    }
}