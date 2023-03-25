import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {

  getJsonData;
  newForm: FormGroup;
  message: string = '';
  error = false;
  submitted: boolean = false;
  loading: boolean = false;
  radioSelected: any;

  fields = {};

  constructor(
    private fb: FormBuilder,
    private localStorage: StorageService,
    private router: Router,

  ) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hobby: this.fb.array([], [Validators.required])
    }
  );

  }

  ngOnInit(): void {
    this.getJsonData = JSON.parse(this.localStorage.getData('jsonData'))
    console.log("get", this.getJsonData)
  }

  onCheckboxChange(e) {
    const hobby: FormArray = this.newForm.get('hobby') as FormArray;
    if (e.target.checked) {
      hobby.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      hobby.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          hobby.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  get f() {
    return this.newForm.controls;
  }

  // save() {
  //   console.log(this.newForm.value);
  // }
  save(){
    this.error = false;
    this.submitted = true;
    this.message  = "";
    this.loading =  true;

    if (!this.newForm.valid) {
      this.error = true;
      this.message = "Please fill the mandatory fields.";
      this.loading = false;
      return false;
    }
    if (this.newForm.valid) {
      let data = [{
        name: this.newForm.value.name,
        gender: this.newForm.value.gender,
        hobby: this.newForm.value.hobby
      }]
      this.localStorage.saveData("jsonDataNew", JSON.stringify(data));
      console.log("jsonDataNew", JSON.stringify(data));
      this.router.navigate(['get-details']);
      this.loading = false;
    }
  }

  reseterror() {
    this.message = "";
    this.error = false;
  }

  reset() {
    this.message = '';
    this.error = false;
    this.newForm.reset();
    this.submitted = false;
  }



}
