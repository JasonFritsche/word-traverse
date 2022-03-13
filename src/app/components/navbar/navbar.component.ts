import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { WordSearchComponent } from "../word-search/word-search.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openWordSearchForm() {
    this.dialog.open(WordSearchComponent, {
      panelClass: "dialogPanel",
    });
  }
}
