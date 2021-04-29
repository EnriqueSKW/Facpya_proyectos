import { Component, Inject, OnInit,ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
@Component({
  selector: 'app-facpya-principal',
  templateUrl: './facpya-principal.component.html',
  styleUrls: ['./facpya-principal.component.css']
})
export class FacpyaPrincipalComponent implements OnInit {
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  @ViewChild('container', { static: false }) public mydiv: ElementRef | undefined;
  public SumaSaldo:number = 0;
  constructor() { }
  public lista: any = 5;
  ngOnInit(): void {
  }
  counter(i: number) {
    return new Array(i);
}

  public CalcularDebe(id:any)
  {
    let Existencias:any = (<HTMLInputElement>document.getElementById("Existencia"+id)).value
    let PrecioUnitario:any = (<HTMLInputElement>document.getElementById("Unitario"+id)).value;
    if (Existencias == null || Existencias == ""  )
    {
      Existencias = 0
    }
    if (PrecioUnitario == null || PrecioUnitario == ""  )
    {
      PrecioUnitario = 0
    }
    var resultado:number = Existencias * PrecioUnitario;
    (<HTMLInputElement>document.getElementById("Debe"+id)).value =  resultado.toString();

   
    this.setSaldo(id,resultado);
  }

  public setSaldo(id:any,NuevaSuma:any)
  {
    this.SumaSaldo = 0;
    this.SumaSaldo = this.SumaSaldo + NuevaSuma;
    (<HTMLInputElement>document.getElementById("Saldo"+id)).value = this.SumaSaldo.toString() 
    //hacer un ciclo con todos los id Debe  y sumarlos a la varibale global
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index:any) {
      this.fieldArray.splice(index, 1);
  }

}
