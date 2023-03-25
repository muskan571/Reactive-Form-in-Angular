import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  newForm: FormGroup;
  getsaveJsonData;
  message: string = '';
  error = false;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localStorage: StorageService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.newForm = this.fb.group({
      jsonData: ['', [Validators.required]]
    }
  );
  }

  save(){
    this.error = false;
    this.submitted = true;
    this.message  = "";
    this.loading =  true;

    if (!this.newForm.valid) {
      this.error = true;
      this.message = "Please fill the mandatory field.";
      this.loading = false;
      return false;
    }
    if (this.newForm.valid) {
      this.localStorage.saveData("jsonData", this.newForm.value.jsonData);
      console.log("jsonData", this.newForm.value.jsonData);
      this.router.navigate(['enter-details']);
      this.loading = false;
    }
  }

  get f() {
    return this.newForm.controls;
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
