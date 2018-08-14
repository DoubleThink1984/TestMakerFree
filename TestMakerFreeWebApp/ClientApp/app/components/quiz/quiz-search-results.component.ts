import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { query } from "@angular/animations";

@Component({
    selector: "quiz-search-results",
    templateUrl: './quiz-search-results.component.html',
    styleUrls: ['./quiz-search-results.component.css']
})

export class QuizSearchResultsComponent {
    quizzes: Quiz[];
    query: string = "";

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) { }

    ngOnInit() {
        this.activatedRoute.queryParams.debounceTime(500).distinctUntilChanged().subscribe(params => {

            var url = this.baseUrl + "api/quiz/search/";
            var searchString = params['q'];

            this.http.get<Quiz[]>(url, { params: new HttpParams().set('q', searchString) }).subscribe(result => {
                this.quizzes = result;
            }, error => console.error(error));
        });
    }

    onSelect(id: number) {
        this.router.navigate(["quiz", id]);
    }

}