import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  classNameFontSize = '';
  classNameLetterSpacing = '';
  classNameBold = '';
  classNameCursor = '';
  classNameMove = '';
  classNameColor = '';
  displayStyle = "none";

  array = ['A','B','C','D','A','C','B','D','G','H','G','A']

  constructor(
    private render: Renderer2,
    public translate: TranslateService

  )
  {
    translate.addLangs(['English', 'हिन्दी']);
    translate.setDefaultLang('English');
  }

  ngOnInit(): void {
    // debugger
    //   let newarray= this.array
    //   console.log
    //   for (let i = 0; i < this.array.length; i ++) {

    //   }

    let first = -1;
    let second = -1;
    let array = [3,2,5,4,1,9,7,8,6]
    console.log("array", array)
    for (let i=0; i<array.length-1; i++ ) {
      if (array[i] > first) {
        second = first;
        first = array[i];
      }
      else if (array[i] > second && array[i] != first) {
        second = array[i];
      }
    }
    console.log(second)

    console.log(Math.max(3,2,5,4,1,9,7,8,6))



  }

  switchLang(lang: string) {
    console.log("lang", lang)
    this.translate.use(lang);
  }


  openPopup() {
    this.displayStyle = "block";
    document.getElementById("close").classList.add("hidden");
  }

  closePopup() {
    this.displayStyle = "none";
    document.getElementById("close").classList.remove("hidden");
    this.render.removeClass(document.getElementById("modal"), this.classNameMove);
  }

  reset(classNameFontSize: any, classNameLetterSpacing: any, classNameBold: any, classNameCursor: any, classNameColor: any) {
    if (this.classNameFontSize) {
      this.render.removeClass(document.getElementById("demo"), this.classNameFontSize);
    }
    if (this.classNameLetterSpacing) {
      this.render.removeClass(document.getElementById("demo"), this.classNameLetterSpacing);
    }
    if (this.classNameBold) {
      this.render.removeClass(document.getElementById("demo"), this.classNameBold);
    }
    if (this.classNameCursor) {
      this.render.removeClass(document.getElementById("demo"), this.classNameCursor);
    }
    if (this.classNameColor) {
      this.render.removeClass(document.getElementById("textColor"), this.classNameColor);
    }
    document.getElementById("fancy").classList.add("hidden");
    document.getElementById("borderless").classList.add("hidden");
    document.getElementById("link1").classList.remove("link");
    document.getElementById("link2").classList.remove("link");
    document.getElementById("link3").classList.remove("link");
    document.getElementById("link4").classList.remove("link");
    document.getElementById("link5").classList.remove("link");
  }

  accessibility(event: any, classNameFontSize: any) {
    if (this.classNameFontSize) {
      this.render.removeClass(document.getElementById("demo"), this.classNameFontSize);
    }
    this.render.addClass(document.getElementById("demo"), classNameFontSize);
    this.classNameFontSize = classNameFontSize;
  }

  accessibility1(event: any, classNameLetterSpacing: any) {
    if (this.classNameLetterSpacing) {
      this.render.removeClass(document.getElementById("demo"), this.classNameLetterSpacing);
    }
    this.render.addClass(document.getElementById("demo"), classNameLetterSpacing);
    this.classNameLetterSpacing = classNameLetterSpacing;
  }

  accessibility2(event: any, classNameBold: any) {
    if (this.classNameBold) {
      this.render.removeClass(document.getElementById("demo"), this.classNameBold);
    }
    this.render.addClass(document.getElementById("demo"), classNameBold);
    this.classNameBold = classNameBold;
  }

  accessibility3(event: any, classNameCursor: any) {
    if (this.classNameCursor) {
      this.render.removeClass(document.getElementById("demo"), this.classNameCursor);
    }
    this.render.addClass(document.getElementById("demo"), classNameCursor);
    this.classNameCursor = classNameCursor;
  }

  accessibility4(event: any, classNameMove: any) {
    if (this.classNameMove) {
      this.render.removeClass(document.getElementById("modal"), this.classNameMove);
    }
    this.render.addClass(document.getElementById("modal"), classNameMove);
    this.classNameMove = classNameMove;
  }

  accessibility5(event: any, classNameColor: any) {
    if (this.classNameColor) {
      this.render.removeClass(document.getElementById("textColor"), this.classNameColor);
    }
    this.render.addClass(document.getElementById("textColor"), classNameColor);
    this.classNameColor = classNameColor;
  }

  fancyTable() {
    document.getElementById("fancy").classList.toggle("hidden");
    document.getElementById("borderless").classList.add("hidden");
  }

  borderlessTable() {
    document.getElementById("borderless").classList.toggle("hidden");
    document.getElementById("fancy").classList.add("hidden");
  }

  highlightLink() {
    document.getElementById("link1").classList.toggle("link");
    document.getElementById("link2").classList.toggle("link");
    document.getElementById("link3").classList.toggle("link");
    document.getElementById("link4").classList.toggle("link");
    document.getElementById("link5").classList.toggle("link");
  }





}
