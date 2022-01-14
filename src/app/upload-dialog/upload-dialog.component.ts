import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import {PictureService} from '../picture.service';

// TODO: Actually handle files, change text

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  friendCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = ['Funny', 'Cold', 'Cool', 'hehe'];
  tags: string[] = [];
  friends: string[] = [];
  file: File | null = null
  title = ""
  description = ""

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('friendInput') friendInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    private pictureService: PictureService,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if(this.title && this.file) {
      //TODO: Success/Error message
      this.pictureService.uploadPicture(
        this.title, this.description, 
        this.tags, this.friends, 
        this.file).subscribe(_ => this.dialogRef.close())
    }
  }

  onFileUpload(eventTarget: EventTarget | null) {
    const fileInput = eventTarget as HTMLInputElement
    if(fileInput.files) {
      this.file = fileInput.files.item(0)
    } else {
      this.file = null
    }
    console.log(this.file)
  }
  
  add(list: string[], event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) list.push(value);

    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
    this.friendCtrl.setValue(null);
  }

  remove(list: string[], tag: string): void {
    const index = list.indexOf(tag);

    if (index >= 0) {
      list.splice(index, 1);
    }
  }

  selected(list: string[], event: MatAutocompleteSelectedEvent): void {
    list.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.friendInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.friendCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
