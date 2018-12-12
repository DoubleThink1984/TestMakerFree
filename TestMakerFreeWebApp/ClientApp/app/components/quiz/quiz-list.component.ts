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

    constructor(
        private quizService: QuizService,
        private router: Router) {}

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

        this.quizService.getQuizList(listType).subscribe(response => {
            const keys = response.headers.keys();
            var headers = keys.map(key =>
                `${key} :  ${response.headers.get(key)}`);
            this.quizzes = response.body as Quiz[];
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