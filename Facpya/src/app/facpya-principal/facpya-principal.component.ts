import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facpya-principal',
  templateUrl: './facpya-principal.component.html',
  styleUrls: ['./facpya-principal.component.css']
})
export class FacpyaPrincipalComponent implements OnInit {
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  constructor() { }
  public lista: any = 5;
  ngOnInit(): void {
  }
  counter(i: number) {
    return new Array(i);
}

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index:any) {
      this.fieldArray.splice(index, 1);
  }

}
