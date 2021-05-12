import {NgModule} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

const materialModule = [
  MatSnackBarModule,
  MatInputModule,
  MatProgressBarModule,
  MatDialogModule,
  MatButtonModule,
  MatTabsModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [],
  imports: [materialModule],
  exports: [materialModule]
})
export class MaterialModule {}
