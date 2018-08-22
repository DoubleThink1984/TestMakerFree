import { Component, Inject, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { QuizListType, QuizService } from "../../services/quiz.service";

@Component({
    selector: "quiz-list",
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent implements OnInit {
    @Input() class: string;
    title: string;
    selectedQuiz: Quiz;
    quizzes: Quiz[];
    http: HttpClient;
    baseUrl: string;

    constructor(http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        private quizService: QuizService,
        private router: Router) {
        this.http = http;
        this.baseUrl = baseUrl;
    }

    ngOnInit() {
        console.log("QuizListComponent" + 
            " instantiated with the following class: "
            + this.class);

        var listType: QuizListType;

        switch (this.class) {
            case "latest":
                listType = QuizListType.Latest;
            default:
                listType = QuizListType.Latest;
                break;
            case "byTitle":
                listType = QuizListType.ByTitle;
                break;
            case "random":
                listType = QuizListType.Random;
                break;
        }

        this.quizService.getQuizList(listType).subscribe(res => {
            this.quizzes = res;
        },
            error => { console.log(error) });
    }

    onSelect(quiz: Quiz) {
        this.selectedQuiz = quiz;
        console.log("quiz with Id "
            + this.selectedQuiz.Id
            + " has been selected.");
        this.router.navigate(["quiz", this.selectedQuiz.Id]);
    }
}