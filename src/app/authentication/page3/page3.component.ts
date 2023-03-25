import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {
  getJsonDetail;

  constructor(
    private localStorage: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getJsonDetail = JSON.parse(this.localStorage.getData('jsonDataNew'))
    console.log("get", this.getJsonDetail)
  }

  back() {
    this.router.navigate(['']);
  }

}
