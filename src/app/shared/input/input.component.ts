import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {

  inputField: any;
  @Input() errorMessage: string;
  @Input() label: string;
  @Input() showTip: boolean = true
  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.inputField = this.model || this.control;
    if(this.inputField === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName');
    }
  }

  hasSuccess(): boolean{
    return this.inputField.valid && (this.inputField.dirty || this.inputField.touched);
  }

  hasError(): boolean{
    return !this.inputField.valid && (this.inputField.dirty || this.inputField.touched);
  }

}
