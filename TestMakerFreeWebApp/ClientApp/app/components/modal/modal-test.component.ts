//import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations'; 

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'modal-test',
    templateUrl: './modal-test.component.html',
    styleUrls: ['./modal-test.component.css']
})

export class ModalTestComponent {

    constructor(
        public dialogRef: MatDialogRef<ModalTestComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

//export interface DialogData {
//    animal: string;
//    name: string;
//}


