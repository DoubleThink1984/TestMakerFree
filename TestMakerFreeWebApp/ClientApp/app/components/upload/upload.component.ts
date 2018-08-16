import { Component, Inject, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpRequest, HttpEventType } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "upload-edit",
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class UploadEditComponent {
    public progress: number;
    public message: string;
    fileToUpload: File;
    form: FormGroup;
    title: string;

    constructor(private http: HttpClient,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        @Inject('BASE_URL') private baseUrl: string) {

        this.createForm();
        this.title = "Upload new File";
    }

    createForm() {
        this.form = this.fb.group({
            Description: ['', Validators.required],
            FormFile: ['', Validators.required]
        });
    }

    upload(files: any) {
        if (files.length === 0)
            return;

        const formData = new FormData();

        for (let file of files)
            formData.append(file.name, file);

        const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
            reportProgress: true,
        });

        this.http.post(this.baseUrl + "api/upload", uploadReq, {reportProgress: true}).subscribe(event => {
            this.router.navigate(["home"]);
            //let e = event;
            //if (event !== null) {
            //    if (event.type === HttpEventType.UploadProgress)
            //        this.uploadProgress = Math.round(100 * event.loaded / event.total);
            //    else if (event instanceof HttpResponse)
            //        this.message = event.body.toString();
            //}            
        });
    }  

    onBack() {
        this.router.navigate(["home"]);
    }

    getFormControl(name: string) {
        return this.form.get(name);
    }

    isValid(name: string) {
        var e = this.getFormControl(name);
        return e && e.valid;
    }

    isChanged(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    }
}