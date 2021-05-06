import { Component, Inject, OnInit,ElementRef, ViewChild, Input } from '@angular/core';
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
  public SaldoArrastrado:number = 0;
  public esEntrada:boolean = false;
  public TablaPromedio:boolean = true;
  constructor() { }
  @Input() CostoMedioLinea:number = 0;
  public lista: any = 5;
  ngOnInit(): void {
  }
  counter(i: number) {
    return new Array(i);
}

  public CalcularDebe(id:any)
  {
    let Existencias:any = (<HTMLInputElement>document.getElementById("Entrada"+id)).value
    let PrecioUnitario:any = (<HTMLInputElement>document.getElementById("Unitario"+id)).value;
    if (Existencias == null || Existencias == ""  )
    {
      Existencias = 0
    }
    if (PrecioUnitario == null || PrecioUnitario == ""  )
    {
      PrecioUnitario = 0
    }
  
    
    if( (<HTMLInputElement>document.getElementById("Debe"+id)).disabled == true)
    {
      //se hacen los calculos cuando es una salida
      var resultado:number = Existencias * PrecioUnitario;
      resultado = Math.trunc(resultado);
      (<HTMLInputElement>document.getElementById("Debe"+id)).value =  resultado.toString();
      this.setSaldoSalida(id); 
    }
    else
    { //es una entrada y calculamos como entrada  
    var resultado:number = Existencias * PrecioUnitario;
    resultado = Math.trunc(resultado);
    (<HTMLInputElement>document.getElementById("Debe"+id)).value =  resultado.toString();
    this.setSaldo(id,resultado); 
    }
 
  }

  public setCostoMedio(id:any)
  {
  var existencia =  (<HTMLInputElement>document.getElementById("Existencia"+id)).value; 
  var saldo =  (<HTMLInputElement>document.getElementById("Saldo"+id)).value;
  (<HTMLInputElement>document.getElementById("Medio"+id)).value = (parseInt(saldo) / parseInt(existencia) ).toString();
  }

  public setSaldo(id:any,NuevaSuma:any)
  {
    this.SumaSaldo = 0;
    let sumatotal:number = 0;
    let i:number = 0;
   
    this.SumaSaldo = this.SumaSaldo + NuevaSuma;
    if (id == 0)
    {
    (<HTMLInputElement>document.getElementById("Saldo"+id)).value = this.SumaSaldo.toString();
    }
    else
    {
      var identificador = id-1
     
      var saldoAnterior = (<HTMLInputElement>document.getElementById("Saldo"+identificador)).value;
      this.SumaSaldo = this.SumaSaldo + parseFloat(saldoAnterior);
   
      (<HTMLInputElement>document.getElementById("Saldo"+id)).value = this.SumaSaldo.toString();
    }
 
    this.setCostoMedio(id);
  }

  setSaldoSalida(id:any)
  {
   var Salida =  (<HTMLInputElement>document.getElementById("Salida"+id)).value;

   var CostoMedioUnitario =  (<HTMLInputElement>document.getElementById("Unitario"+id)).value;

    var CostoSalida =  parseFloat(CostoMedioUnitario) * parseFloat(Salida);

   var saldoAnterior = parseInt((<HTMLInputElement>document.getElementById("Saldo"+(id-1))).value);
   (<HTMLInputElement>document.getElementById("Haber"+id)).value = CostoSalida.toString();
   (<HTMLInputElement>document.getElementById("Saldo"+id)).value = (saldoAnterior - CostoSalida).toString();
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index:any) {
      this.fieldArray.splice(index, 1);
  }

  HabilitarHabilitarEntrada(id:any)
  {
    var Entrada = (<HTMLInputElement>document.getElementById("Entrada"+id)).value;
    if (Entrada != null || Entrada != undefined || Entrada != "")
    {
     
      (<HTMLInputElement>document.getElementById("Salida"+id)).disabled = true;
      (<HTMLInputElement>document.getElementById("Haber"+id)).disabled = true;
    }
    if(Entrada == "")
    {
    
      (<HTMLInputElement>document.getElementById("Salida"+id)).disabled = false;
      (<HTMLInputElement>document.getElementById("Haber"+id)).disabled = false;
    }
  }
  HabilitarHabilitarSalida(id:any)
  {
    var salida = (<HTMLInputElement>document.getElementById("Salida"+id)).value;
    if (salida != null || salida != undefined || salida != ""  )
    {
      (<HTMLInputElement>document.getElementById("Entrada"+id)).disabled = true;
      (<HTMLInputElement>document.getElementById("Debe"+id)).disabled = true;
      (<HTMLInputElement>document.getElementById("Unitario"+id)).value =  (<HTMLInputElement>document.getElementById("Medio"+(id-1))).value ;

    }
    if(salida == "")
    {
      (<HTMLInputElement>document.getElementById("Entrada"+id)).disabled = false;
      (<HTMLInputElement>document.getElementById("Debe"+id)).disabled = false;
    }
  }

  calcularComprobacion()
  {
   var unidades:number = parseFloat((<HTMLInputElement>document.getElementById("udsexistenciacbp")).value);
   var costomedio:number =  parseFloat((<HTMLInputElement>document.getElementById("costomediocbp")).value);
    if(unidades == null || unidades == undefined)
    {
      unidades = 0;
    }
    if(costomedio == null || costomedio == undefined )
    {
      costomedio = 0;
    }

     (<HTMLInputElement>document.getElementById("resultadocbp")).value = (costomedio * unidades).toString()

  }
  


}
