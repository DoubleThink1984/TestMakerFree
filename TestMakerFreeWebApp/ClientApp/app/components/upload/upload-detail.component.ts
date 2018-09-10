import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ResponseType } from "@angular/http";

@Component({
    selector: "upload-detail",
    templateUrl: "./upload-detail.component.html",
    styleUrls: ['./upload-detail.component.css']
})

export class UploadDetailComponent {
    imageToShow: any;
    imageHref: string;
    fileData: Blob;
    fileType: string;

    constructor(private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.imageHref = this.baseUrl + "api/uploads/GetFile/" + id;
            this.getImage(id);
        }
    }

    getImage(id: number) {
        var url = this.baseUrl + "api/uploads/" + id;
        this.http.get(url, { responseType: "blob" }).subscribe(data => {
            this.fileData = data;
            this.createImageFromBlob(data);
        },
        error => console.log(error));
    }

    createImageFromBlob(image: any) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.imageToShow = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    getFile() {
        this.downLoadFile(this.fileData, "image/png");
    }

    downLoadFile(data: any, type: string) {
        var blob = new Blob([data], { type: type.toString() });
        var url = window.URL.createObjectURL(blob);
        var pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert('Please disable your Pop-up blocker and try again.');
        }
    }
}