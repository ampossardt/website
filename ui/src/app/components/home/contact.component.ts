import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineCoordinates } from '../../models/LineCoordinates.model';
import { CanvasComponent } from '../common/canvas.component';
import { createText } from '@angular/core/src/view/text';

@Component({
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html',
    selector: 'contact-section'
})
export class ContactSectionComponent implements OnInit {
    private coordinates: LineCoordinates[] = [];
    private lineCount: number;

    public contactForm: FormGroup;
    public sent: boolean;

    @ViewChild('background') public canvas: CanvasComponent;

    constructor(public element: ElementRef) {
    }

    ngOnInit() {
        this.lineCount = 60;
        
        for(let i = 0; i < this.lineCount; i++) {
            this.coordinates.push(new LineCoordinates(window.innerHeight));
        }

        this.canvas.updateCanvas = this.draw.bind(this);
        this.canvas.isFinished = this.isDoneDrawing.bind(this);

        this.contactForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            comment: new FormControl('', Validators.required)
        });
        
    }

    private submit(event) {
        event.preventDefault();
        if(this.contactForm.valid) {
            for(let name in this.contactForm.controls) {
                let control = this.contactForm.get(name);

                control.setValue('');
                control.markAsPristine();
            }

            this.sent = true;
        } else {
            for(let name in this.contactForm.controls) {
                let control = this.contactForm.get(name);

                control.markAsDirty();
            }
        }
    }

    private draw(ctx: CanvasRenderingContext2D, innerWidth: number, innerHeight: number) {
        ctx.lineWidth = 3;
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for(let i = 0; i < this.coordinates.length; i++) {
            let item = this.coordinates[i];
            let x = item.start.x + (item.end.x - item.start.x) * item.amount;
            let y = item.start.y + (item.end.y - item.start.y) * item.amount;

            item.doneDrawing = y > innerHeight;

            ctx.beginPath();
            ctx.strokeStyle = item.color;
            ctx.moveTo(item.start.x, item.start.y);
            ctx.lineTo(x, y);
            item.amount += item.incrementAmount;
            ctx.stroke();
            ctx.closePath();
        }
    }

    private isDoneDrawing(): boolean {
        return this.coordinates.every((item) => item.doneDrawing);
    }
}