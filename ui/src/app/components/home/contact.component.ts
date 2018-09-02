import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineCoordinates } from '../../models/LineCoordinates.model';
import { CanvasComponent } from '../common/canvas.component';
import { MailService } from '../../services/mail.service';

@Component({
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html',
    selector: 'contact-section'
})
export class ContactSectionComponent implements OnInit {
    private coordinates: LineCoordinates[] = [];
    private lineCount: number;

    public contactForm: FormGroup;
    public sending: boolean;
    public sent: boolean;
    public error: boolean;

    @ViewChild('background') public canvas: CanvasComponent;

    constructor(public element: ElementRef, private mailService: MailService) {
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
            email: new FormControl('', [Validators.required, Validators.email]),
            comment: new FormControl('', Validators.required)
        });
        
    }

    private submit(event) {
        event.preventDefault();
        if(this.sending) {
            console.log('already sending');
            return;
        }
        
        this.error = false;

        if(this.contactForm.valid) {
            this.sending = true;

            this.mailService.sendEmail(this.contactForm.value).then(response => {                
                this.sending = false;
                this.sent = true;
            }).catch((response) => {
                this.sending = false;
                this.error = true;
                console.log(response);
            });
        } else {
            for(let name in this.contactForm.controls) {
                let control = this.contactForm.get(name);
                
                if(!control.valid) {
                    control.markAsDirty();
                }
            }
        }
    }

    private sendEmail() {
        
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