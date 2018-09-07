import { Component, Inject, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { RequestOptions, Headers } from "@angular/http";

@Component({
    selector: "login",
    templateUrl: "./upload-edit.component.html",
    styleUrls: ['./upload-edit.component.css']
})

export class UploadEditComponent {
    form: FormGroup;
    imageUrl: string;
    fileUpload: File;

    constructor(private http: HttpClient,
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        @Inject('BASE_URL') private baseUrl: string) {

    }

    @ViewChild("fileInput") fileInput: any;

    addFile(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            let input = new FormData();
            input.append("file", fileToUpload);

            let url = this.baseUrl + "api/uploads";
            this.http.post(url, input).subscribe(res => {
                var asdf = res;
            },
            error => console.log(error));
        }
    }
}