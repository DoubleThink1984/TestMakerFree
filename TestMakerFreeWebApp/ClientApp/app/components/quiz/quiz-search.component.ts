import { Input, Component, Inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: "quiz-search",
    templateUrl: './quiz-search.component.html',
    styleUrls: ['./quiz-search.component.css']
})

export class QuizSearchComponent {
    @Input() class: string;
    @Input() placeholder: string;
    
    constructor(private router: Router, ) { }

    search(search: string) {
        this.router.navigate(["search"], { queryParams: { q: search || ""} });
    }
}