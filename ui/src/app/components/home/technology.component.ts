import { Component, HostListener, ElementRef, Output, ViewChild } from '@angular/core';
import { TechItem } from '../../models/techItem.model';
import { TechItems } from '../../tools/constants';

@Component({
    selector: 'technology-section',
    templateUrl: './technology.component.html',
    styleUrls: ['./technology.component.scss']
})
export class TechnologySectionComponent {
    public delayOffset: number = .15;
    public techItems: TechItem[];
    public state: string = '';
    public svgWidth: number;
    public contentHeight: number;

    @ViewChild('container') container: ElementRef;

    constructor(public element: ElementRef) {
        this.techItems = TechItems.list;
        
    }

    ngAfterViewInit() {
        if(this.svgWidth && this.svgWidth > 0) return;

        this.contentHeight = this.container.nativeElement.scrollHeight;

        if(window.innerWidth <= 1450) {
            // Something something magic numbers are bad...
            // Here's some facts: the svg is too large at screen sizes around 1450 pixels,
            // so start there, and 270 is the approximate starting width of the svg at its largest
            this.svgWidth = Math.floor((window.innerWidth / 1450) * 250);
        }
    }

    @HostListener('window:scroll', ['$event'])
    private checkScroll() {
        let elementPosition = this.element.nativeElement.offsetTop;
        let scrollPosition = window.pageYOffset;

        if(scrollPosition >= (elementPosition - window.innerHeight / 4)) {
            this.state = 'show';
        }
    }

}