import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ContactRequest } from '../app/app.module'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'create-update-delete';
  contactForm: FormGroup;
  recentList = [];
  mode: string = 'new';
  constructor(private fb: FormBuilder,
    public snackBar: MatSnackBar) {
    this.loadForm();
  }
  loadForm() {
    this.contactForm = this.fb.group({
      name: '',
      email: '',
      contactNumber: ''
    })
  }

  saveContact() {
    let item = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      contactNumber: this.contactForm.controls['contactNumber'].value
    }
    this.recentList.push(item);
    this.resetForm();
    var message = "Contact created successfully"
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }

  updateContact() {
    this.recentList.splice(this.indexUpdate, 1);
    let item = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      contactNumber: this.contactForm.controls['contactNumber'].value
    }
    this.recentList.push(item);
    this.resetForm();
    var message = "Contact update successfully"
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
    this.mode = 'new';
  }
  resetForm() {
    this.contactForm.reset();
  }

  indexUpdate: number;
  editContact(item) {
    this.mode = 'edit';
    this.indexUpdate = this.recentList.indexOf(item)
    // console.log(item);
    this.contactForm.controls['name'].setValue(item.name);
    this.contactForm.controls['email'].setValue(item.email);
    this.contactForm.controls['contactNumber'].setValue(item.contactNumber);
  }

  deleteContact(item) {
    // console.log(item);
    this.recentList.splice(this.recentList.indexOf(item), 1);
    var message = "Contact delete successfully"
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }

  ngOnInit() {

  }
}
