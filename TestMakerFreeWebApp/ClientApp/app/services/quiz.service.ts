import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class QuizService {

    constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

    getQuizList(listType: QuizListType): Observable<HttpResponse<Quiz[]>> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };

        var url = this.baseUrl + "api/quiz/" + listType;
        return this.http.get<Quiz[]>(url, { observe: 'response', headers: { 'Accept': 'application/json' } });
    }
}

export enum QuizListType {
    ByTitle = "byTitle",
    Latest = "Latest",
    Random = "Random"
}