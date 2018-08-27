import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
    templateUrl: './navigation.component.html',
    selector: 'navigation'

})
export class NavigationComponent {
    @ViewChild('menu') menu: ElementRef;
    @ViewChild('overlay') overlay: ElementRef;
    private open: boolean;

    constructor() {

    }

    public toggleMenu() {
        if(!this.open) {
            this.menu.nativeElement.style["right"] = "0";
            this.overlay.nativeElement.style["display"] = "block";
            this.open = !this.open;
        } else {
            this.menu.nativeElement.style["right"] = "-40vw";
            this.overlay.nativeElement.style["display"] = "none";
            this.open = !this.open;
        }
    }

    public scroll() {
        window.scrollTo({ left: 0, top: 5000, behavior: 'smooth' });
    }
}