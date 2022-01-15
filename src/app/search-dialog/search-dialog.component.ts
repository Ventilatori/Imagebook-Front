import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
    type: new FormControl('people', [Validators.required]),
  })

  constructor(
    private dialogRef: MatDialogRef<SearchDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    const query = this.searchForm.value.search
    const type = this.searchForm.value.type
    this.dialogRef.close([query, type])
  }
}
