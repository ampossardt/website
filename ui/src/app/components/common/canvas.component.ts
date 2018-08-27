import { Component, ElementRef, ViewChild, Input, HostListener } from "@angular/core";
import { LineCoordinates } from "../../models/LineCoordinates.model";
import { FormGroup } from "@angular/forms";

@Component({
    templateUrl: './canvas.component.html',
    selector: 'background-canvas',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {    
    private drawing: boolean = false;
    private ready: boolean = false;

    public ctx: CanvasRenderingContext2D;
    public isFinished: Function;
    public updateCanvas: Function;

    @ViewChild('canvas') canvas: ElementRef;
    @Input('canvasWidth') public innerWidth: number;
    @Input('canvasHeight') public innerHeight: number;

    // Number in px to offset the scroll listener telling the canvas to start drawing
    @Input('triggerOffset') public triggerOffset: number;
    @Input('parentElement') public element: ElementRef

    ngOnInit() {
        if(!this.innerWidth) {
            this.innerWidth = window.innerWidth;
        }

        if(!this.innerHeight) {
            this.innerHeight = window.innerHeight;
        }

        if(!this.triggerOffset) {
            this.triggerOffset = 150;
        }
    }

    ngAfterViewInit() {
        this.ctx = this.canvas.nativeElement.getContext('2d');
    }

    private draw() {
        this.drawing = true;
        
        this.updateCanvas(this.ctx, this.innerWidth, this.innerHeight);

        if(this.isFinished()) {
            return;
        }

        requestAnimationFrame(() => this.draw());
    }

    @HostListener('window:scroll', ['$event'])
    private checkScroll() {
        if(!this.element) return;

        let elementPosition = this.element.nativeElement.offsetTop;
        let scrollPosition = window.pageYOffset;

        if(scrollPosition >= elementPosition - this.triggerOffset && !this.drawing) {
            this.draw();
        }
    }
}