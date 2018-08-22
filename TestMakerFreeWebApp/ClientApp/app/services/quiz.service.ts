import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class QuizService {

    constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

    getQuizList(listType: QuizListType): Observable<Quiz[]> {
        var url = this.baseUrl + "api/quiz/" + listType;
        return this.http.get<Quiz[]>(url);
    }
}

export enum QuizListType {
    ByTitle = "byTitle",
    Latest = "Latest",
    Random = "Random"
}