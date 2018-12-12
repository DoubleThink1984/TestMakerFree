import { Component, OnInit, OnDestroy } from "@angular/core";


@Component({
    selector: "clock",
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.css']
})

export class ClockComponent implements OnInit, OnDestroy{
    time: Date;
    timerId: number;

    constructor() {
        this.time = new Date();
        //this.tick();
        //this.timerId = setInterval(() => this.time = new Date(), 1000);
    }

    ngOnInit() {
        //this.tick();
        //this.timerId = this.tick();
    }

    ngOnDestroy() {
        this.timerId = 0;
    }

    tick(): number {
        return setInterval(() => this.time = new Date(), 1000);
    }
}