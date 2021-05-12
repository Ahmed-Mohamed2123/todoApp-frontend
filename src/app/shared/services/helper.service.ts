import {Injectable, TemplateRef} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private spinner: NgxSpinnerService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) {
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  // For toast messages
  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000
    });
  }

  // Dialog
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template, {
      width: '400px'
    });
  }
  hideDialog() {
    this.dialog.closeAll();
  }

}
