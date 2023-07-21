import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../../../components/new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    constructor(private categoryService: CategoryService,
        public dialog: MatDialog, private snackbar: MatSnackBar) { }

    ngOnInit(): void {
        this.getCategories();
    }

    displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
    dataSource = new MatTableDataSource<CategoryElement>();

    getCategories() {
        this.categoryService.getCategories()
            .subscribe((data: any) => {

                console.log("respuesta", data);
                this.processCategoriesResponse(data);
            }, (error: any) => {
                console.log("error", error);
            })
    }

    processCategoriesResponse(resp: any): void {
        // implementation goes here
        const dataCategory: CategoryElement[] = [];
        if (resp.metadata[0].code == "00") {
            let listCategory = resp.categoryResponse.category;
            listCategory.forEach((element: CategoryElement) => {
                dataCategory.push(element);
            });
            this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
        }
    }
    openCategoryDialog() {
        // implementation goes here

        const dialogRef = this.dialog.open(NewCategoryComponent, {
            width: '450px',

        });

        dialogRef.afterClosed().subscribe((result: any) => {
            console.log('The dialog was closed', result);
            if (result == 1) {
                this.openSnackBar("Kategorie wurde erfolgreich erstellt", "Gespeichert");
            } else if (result == 2) {
                this.openSnackBar("Kategorie wurde nicht erstellt", "Failed");
            }
        });
    }
    openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
        // implementation goes here
        return this.snackbar.open(message, action, {
            duration: 2000,
        });
    }
    edit(id: number, name: string, description: string) {
        // implementation goes here
        const dialogRef = this.dialog.open(NewCategoryComponent, {
            data: { id, name, description }

        });
        return dialogRef.afterClosed().subscribe((result: any) => {
            console.log('The dialog was closed', result);
            if (result == 1) {
                this.openSnackBar("Kategorie wurde erfolgreich aktualisiert", "Gespeichert");
            } else if (result == 2) {
                this.openSnackBar("Kategorie wurde nicht aktualisiert", "Failed");
            }
        });
    }
    delete(id: number) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '450px',
            data: { id }

        });
        return dialogRef.afterClosed().subscribe((result: any) => {
            console.log('The dialog was closed', result);
            if (result == 1) {
                this.openSnackBar("Kategorie wurde erfolgreich gelöscht", "Gelöscht");
            } else if (result == 2) {
                this.openSnackBar("Kategorie wurde nicht aktualisiert", "Failed");
            }
        });
    }


}

export interface CategoryElement {
    id: number;
    name: string;
    description: string;
}

