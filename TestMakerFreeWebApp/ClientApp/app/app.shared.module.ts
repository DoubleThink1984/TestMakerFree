import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { QuizService } from './services/quiz.service';
import { AuthService } from './services/auth.service';
import { AuthResponseInterceptor } from './services/auth.response.interceptor';
import { AuthInterceptor } from './services/auth.interceptor';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { QuizSearchComponent } from './components/quiz/quiz-search.component';
import { HomeComponent } from './components/home/home.component';
import { QuizListComponent } from './components/quiz/quiz-list.component';
import { QuizEditComponent } from './components/quiz/quiz-edit.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionListComponent } from './components/question/question-list.component';
import { QuestionEditComponent } from './components/question/question-edit.component';
import { AnswerListComponent } from './components/answer/answer-list.component';
import { AnswerEditComponent } from './components/answer/answer-edit.component';
import { ResultListComponent } from './components/result/result-list.component';
import { ResultEditComponent } from './components/result/result-edit.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './components/user/register.component';
import { QuizSearchResultsComponent } from './components/quiz/quiz-search-results.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        QuizSearchComponent,
        QuizListComponent,
        QuizSearchResultsComponent,
        QuizComponent,
        QuizEditComponent,
        QuestionListComponent,
        QuestionEditComponent,
        AnswerListComponent,
        AnswerEditComponent,
        ResultListComponent,
        ResultEditComponent,
        AboutComponent,
        LoginComponent,
        PageNotFoundComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'search', component: QuizSearchResultsComponent },
            { path: 'quiz/create', component: QuizEditComponent },
            { path: 'quiz/edit/:id', component: QuizEditComponent },
            { path: 'quiz/:id', component: QuizComponent },
            { path: 'question/create/:id', component: QuestionEditComponent },
            { path: 'question/edit/:id', component: QuestionEditComponent },
            { path: 'answer/create/:id', component: AnswerEditComponent },
            { path: 'answer/edit/:id', component: AnswerEditComponent },
            { path: 'result/create/:id', component: ResultEditComponent },
            { path: 'result/edit/:id', component: ResultEditComponent },
            { path: 'about', component: AboutComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '**', component: PageNotFoundComponent }
        ])
    ],
    providers: [
        QuizService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthResponseInterceptor,
            multi: true
        }
    ]
})
export class AppModuleShared {
}
