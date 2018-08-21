import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class QuizService {

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject('BASE_URL') private baseUrl: string) {
    }

    getQuizList(type: QuizListType): Observable<Quiz[]> {
        var url = this.baseUrl + "api/quiz/" + type;
        var quizzes: Quiz[];

        return this.http.get<Quiz[]>(url)
        .map((res) => {
            return res;
        })
        .catch(error => {
            return new Observable<any>(error);
        });
        //return this.http.get<Quiz[]>(url)
    }
}

export enum QuizListType {
    ByTitle = "ByTitle",
    Latest = "Latest",
    Random = "Random"
}