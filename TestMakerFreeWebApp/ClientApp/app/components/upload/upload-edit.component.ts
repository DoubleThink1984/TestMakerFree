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
    upload: Upload = <Upload>{};
    localImgUrl: string;

    constructor(private http: HttpClient,
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        @Inject('BASE_URL') private baseUrl: string) {
        this.createForm();
    }

    @ViewChild("fileInput") fileInput: any;

    createForm() {
        this.form = this.fb.group({
            FileName: ['', Validators.required],
            Description: ['', Validators.required],
            File: File
        });
    }

    onSubmit(): void {
        var tmpUpload = <Upload>{};
        tmpUpload.Description = this.form.value.Description;
        tmpUpload.FileName = this.form.value.FileName;
        tmpUpload.Id = this.upload.Id;

        let fi = this.fileInput.nativeElement;
        //let fi = this.form.value.File;
        if (fi.files && fi.files[0]) {
            tmpUpload.File = fi.files[0];
            let input = new FormData();
            input.append("File", tmpUpload.File);
            input.append("Description", tmpUpload.Description);
            input.append("FileName", tmpUpload.FileName);
            input.append("Id", '');

            let url = this.baseUrl + "api/uploads";
            this.http.post<Upload>(url, input).subscribe(res => {
                var createdUpload = res;
                this.router.navigate(["home"]);
            },
            error => console.log(error));
        }
    }

    previewImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localImgUrl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    getFormControl(name: string) {
        return this.form.get(name);
    }

    isValid(name: string) {
        var e = this.getFormControl(name);
        return e && e.valid;
    }

    isChanges(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    }
}