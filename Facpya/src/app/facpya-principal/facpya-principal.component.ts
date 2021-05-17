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
  public SaldoInicial:number = 0;
  public ExistenciaInicial:number = 0;
  public SaldoTotal:number = 0;
  constructor() { }
  @Input() CostoMedioLinea:number = 0;
  public lista: any = 5;
  ngOnInit(): void {
  }
  //el counter aumenta el numero de renglones en cada tabla
  counter(i: number)  {
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

  setExistencias(Tipo:any,id:any,Dato:any)
  {
    if(Dato.value == "")
    {
      return //regresa si el valor es igual a nada
    }
    if (Tipo == 1) //Es una entrada
    {
      Dato.value //obtenemos el valor de entrada, cuantas entradas son
      if(id == 0) // verificamos si es la primer entrada
      {
        var resultado:number = parseInt(Dato.value) + parseInt(this.ExistenciaInicial.toString());
       (<HTMLInputElement>document.getElementById("Existencia"+id)).value = resultado.toString();
       if(Dato.value == "")
       {
         return;
       } 
       else
       {
           this.CalcularDebe(id)
       }
     
      }
      else
      {
        var EntradaAnterior = (<HTMLInputElement>document.getElementById("Existencia"+(id-1))).value;
        var resultado = parseFloat(EntradaAnterior) + parseFloat(Dato.value);
        (<HTMLInputElement>document.getElementById("Existencia"+id)).value = resultado.toString(); 
        if(Dato.value == "")
        {
          return;
        } 
        else
        {
            this.CalcularDebe(id)
        }
      }
    

    }
    else //Es una Salida
    {
      Dato.value //obtenemos el valor de salida, cuantas salidas son
        var EntradaAnterior = (<HTMLInputElement>document.getElementById("Existencia"+(id-1))).value;
        var resultado = parseFloat(EntradaAnterior) - parseFloat(Dato.value);
        (<HTMLInputElement>document.getElementById("Existencia"+id)).value = resultado.toString(); 
        if(Dato.value == "")
        {
          return;
        } 
        else
        {
            this.CalcularDebe(id)
        }
    }
  }

  setExistenciasIniciales(id:any,Entrada?:any)
  {  
   this.ExistenciaInicial = Entrada.value;
  (<HTMLInputElement>document.getElementById("Existencia"+id)).value = Entrada.value; 
  }

  setSaldosIniciales(id:any,Entrada?:any)
  {  
  
  (<HTMLInputElement>document.getElementById("Saldo"+id)).value = Entrada.value; 
  this.SaldoTotal = Entrada.value;
  }

  public setCostoMedio(id:any)
  {
  var existencia =  (<HTMLInputElement>document.getElementById("Existencia"+id)).value; 
  var saldo =  (<HTMLInputElement>document.getElementById("Saldo"+id)).value;
  var resultado = parseFloat(saldo) / parseFloat(existencia); 

  (<HTMLInputElement>document.getElementById("Medio"+id)).value = (resultado.toFixed(2)).toString();
  }

  public setSaldo(id:any,NuevaSuma:any)
  {
    this.SumaSaldo = 0;
    this.SaldoTotal = parseFloat((<HTMLInputElement>document.getElementById("Saldoinicial")).value);
    this.SumaSaldo = this.SumaSaldo + NuevaSuma;
    if (id == 0)//si es el primer renglon de la tabla
    {
      var resultado:number = parseFloat( this.SumaSaldo.toString()) + parseFloat(this.SaldoTotal.toString());
    (<HTMLInputElement>document.getElementById("Saldo"+id)).value = resultado.toString();
      this.SaldoTotal = resultado;
    }
    else //si es cualquier otro renglon de la tabla
    {
      var identificador = id-1
     
      var saldoAnterior = (<HTMLInputElement>document.getElementById("Saldo"+identificador)).value;
      this.SumaSaldo = this.SumaSaldo + parseFloat(saldoAnterior);
   
      (<HTMLInputElement>document.getElementById("Saldo"+id)).value = this.SumaSaldo.toString();
      this.SaldoTotal = this.SumaSaldo;
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
   this.SaldoTotal = saldoAnterior - CostoSalida;
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
    if(salida == "")
    {

      (<HTMLInputElement>document.getElementById("Entrada"+id)).disabled = false;
      (<HTMLInputElement>document.getElementById("Debe"+id)).disabled = false;
    }
    else if (salida != null || salida != undefined || salida != ""  || salida != " "  )
    {
      (<HTMLInputElement>document.getElementById("Entrada"+id)).disabled = true;
      (<HTMLInputElement>document.getElementById("Debe"+id)).disabled = true;
      try { //trata de conseguir los registros previos si es que existen
        if((<HTMLInputElement>document.getElementById("Medio"+(id-1))).value == "" || (<HTMLInputElement>document.getElementById("Medio"+(id-1))).value == undefined ||(<HTMLInputElement>document.getElementById("Medio"+(id-1))).value == null)
        {
          (<HTMLInputElement>document.getElementById("Unitario"+id)).value =  (<HTMLInputElement>document.getElementById("Unitario"+(id-1))).value ;

        }
        else
        {
                  (<HTMLInputElement>document.getElementById("Unitario"+id)).value =  (<HTMLInputElement>document.getElementById("Medio"+(id-1))).value ;

        }
      
      } catch (error) {
         console.log("no hay registros previos de Medio");
       
      
      }


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
