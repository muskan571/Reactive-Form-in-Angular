import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ConfigurationOptions, ContentOptionsEnum, CustomCountryModel, NumberResult, SortOrderEnum, TooltipOptionsEnum }from 'intl-input-phone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newForm: FormGroup;
  submitted: boolean = false
  message: string = ''
  error = false
  showPassword: boolean = false;
  showre_Password: boolean = false;
  // genders=['Male','Female', 'Prefer not to say'];
  fileToUpload: any;
  imageUrl: any;

  newlist;

  amountCtrl = new FormControl(null, { updateOn: 'blur' });

  configOption1 : ConfigurationOptions;
  configOption2 : ConfigurationOptions;
  customCountryList1 : CustomCountryModel[] = [];
  NumberModel: string = "+1 3235634245";
  SelectedCountryISOCode: string = "US";
  IsRequired: boolean = false;
  OutputValue : NumberResult = new NumberResult();

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService,

  ) {

    translate.addLangs(['English', 'हिन्दी']);
    translate.setDefaultLang('English');

    //config 1
    this.configOption1 = new ConfigurationOptions();
    this.configOption1.SelectorClass = "OptionType1";
    this.configOption1.OptionTextTypes = [];
    this.configOption1.OptionTextTypes.push(ContentOptionsEnum.Flag);
    this.configOption1.OptionTextTypes.push(ContentOptionsEnum.CountryName);
    this.configOption1.OptionTextTypes.push(ContentOptionsEnum.CountryPhoneCode);

    //show the selected country
    this.configOption1 = new ConfigurationOptions();
    this.configOption1.SelectorClass = "CountryListType1";
    this.configOption1.IsShowAllOtherCountry = false;

    //config 2
    this.configOption2 = new ConfigurationOptions();
    this.configOption2.SelectorClass = "OrderByType2";
        //set the sortby value using the sortorderenum.
    this.configOption2.SortBy = SortOrderEnum.CountryName;

    this.configOption1.SelectorClass = "InputValidation1";
    this.configOption2.ToolTipText = TooltipOptionsEnum.CountryISOCode;

   }

  ngOnInit(): void {
    this.newForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]],
      dateofbirth: ['', [Validators.required]],
      address: [''],
      hobby: new FormArray([]),
      gender: ['Male'],
      income: [''],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      re_password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      rememberMe: [true, [Validators.required]],
      phone: ['', [Validators.required]],
      profile: ['', [Validators.required]]
    }
  );
  }

  requiredFlagChange(isRequire: boolean) {
    this.IsRequired = isRequire;
  }
  onNumberChage(outputResult) {
    this.OutputValue = outputResult;
    console.log("Output result is", this.OutputValue);
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
        //Show image preview
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onAddHobby(){
    const control=new FormControl(null);
    (<FormArray>this.newForm.get('hobby')).push(control);
  }

  hobbygetControl() {
    return (this.newForm.get('hobby') as FormArray).controls;
  }

  removeInputControl(idx: number) {
    (this.newForm.get('hobby') as FormArray).removeAt(idx);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public togglere_PasswordVisibility(): void {
    this.showre_Password = !this.showre_Password;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  keyPressNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    if (/[0-9]/.test(pastedText)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  save() {
    debugger
    this.message = "";
    this.submitted = true;
  // if (this.newForm.valid) {
  //     return;
  //   }

  if(!this.newForm.valid) {

    if (this.newForm.value.password != this.newForm.value.re_password) {
      this.error = true;
      this.message = 'Confirm password must match with password';
      return false;
    }

  var ageinYears = ((Date.now() - +(new Date(this.newForm.value.dateofbirth))) / (60 * 60 * 24 * 365 * 1000));
    if (ageinYears < 18) {
      this.message = 'Your age must be 18 years old or above.';
      this.error = true;
      return false;
    }

    else {
      debugger
      if(this.newForm.value.email === "" || this.newForm.value.dateofbirth === "" || this.newForm.value.password === "" || this.newForm.value.re_password === "") {
        this.error = true;
        this.message = "Please fill the required field.";
      }
      else {
      this.error = false;
      this.message = "";
    }
    }
  }

  }

  get f() {
    return this.newForm.controls;
  }

  reseterror() {
    this.message = "";
    this.error = false;
  }

}
