import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {  TipoAccion, Product } from '../../../interfaces/products';
import { ProductService } from '../../../services/product.service';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

    formAction: FormGroup;
    submitted:boolean = false;
    listEnumTypes = TipoAccion;
    typeForm:TipoAccion = this.listEnumTypes.Create;
    message = '';
    urlValida:boolean = true;
    fechaActual = new Date().toISOString().substring(0,10);

    subscriptionUpdateCreate$: Subscription;

    imagePattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  constructor(private productServ: ProductService,
              private router: Router,
              private formBuilder: FormBuilder) {
                this.createFormAction();
              }

  ngOnInit() {
    this.typeForm = this.productServ.typeForm;
    if(  this.typeForm === this.listEnumTypes.Update ){
        this.updateProduct(this.productServ.infoProductsEdit);
    }
  }


  createFormAction(){
    let fechaAux = new Date();
    fechaAux.setFullYear( fechaAux.getFullYear()+1 );
    let fechaRev = fechaAux.toISOString().substring(0,10);

    this.formAction = this.formBuilder.group(
        {
            id: ['',  {
              validators : [Validators.required, Validators.minLength(3), Validators.maxLength(10) ],
              asyncValidators: [idExistsValidator(this.productServ)],
              updateOn: 'blur'
            }],
            name: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(100)] ],
            logo: ['', [ Validators.required, Validators.pattern(this.imagePattern) ] ],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            date_release: [this.fechaActual, [Validators.required, this.customValidatorDateRelease ] ],
            date_revision: [fechaRev, [Validators.required, this.customValidatorDateRevision ] ]
        }
    )
  }

  get form(){
    return this.formAction.controls;
}

customValidatorDateRevision(control: AbstractControl){  

    let isValid = true;
 
    const dateRelease = control.parent?.controls?.['date_release'].value;

    if( dateRelease ){
      let auxDate = new Date(dateRelease);
      auxDate.setFullYear( auxDate.getFullYear()+1 );
      console.log( auxDate?.toISOString().substring(0,10) )
      isValid = auxDate?.toISOString().substring(0,10) === control.value;
    }else{
      isValid =false;
    }

    return isValid ? null : { 'dateReleError': 'This value is invalid' };  
  }

  customValidatorDateRelease(control: AbstractControl){  

    let isValid = true;
    isValid = Date.parse(control.value) >= Date.parse(new Date().toISOString().substring(0,10));

    return isValid ? null : { 'dateIsLate': 'This date is invalid' };
  }

  updateDateRevision(dateRelease:string){
    let newFechaRev = new Date(dateRelease);
    newFechaRev.setFullYear( newFechaRev.getFullYear()+1 );
    this.formAction.get('date_revision').setValue(newFechaRev.toISOString().substring(0,10)) ;
  }

  redirectList(){
    this.router.navigate(['main/listado']);
  }

  resetForm(){
    if( this.typeForm === this.listEnumTypes.Update ){
        this.updateProduct(this.productServ.infoProductsEdit);
    }else{
      this.createFormAction();
    }
  }


  updateProduct(product:Product){
    this.formAction.setValue({
        id: product.id,
        name : product.name,
        logo : product.logo,
        description : product.description,
        date_release: product.date_release?.toString().substring(0,10),
        date_revision: product.date_revision?.toString().substring(0,10)
    });
    this.formAction.get('id').clearAsyncValidators();
    this.formAction.get('date_release').setValidators([Validators.required]);
    this.formAction.get('date_revision').setValidators([Validators.required]);
  }

  saveProduct(){
    this.submitted = true;


    if( !this.formAction.invalid  ){
       this.productServ.createUpdateProducto(this.formAction.value, this.typeForm)
          .pipe(take(1))
          .subscribe( resp=>{
              let typeString:string = 'creado';
              if( this.typeForm === TipoAccion.Update )  typeString = 'actualizado';
              this.message = `Producto ${typeString} exitosamente!`;
              this.productServ.eventoFormulario.emit({title: this.message , code:200});
              this.submitted = false;
          },error=>{
              this.message = 'Ocurrió un error inesperado!';
              this.productServ.eventoFormulario.emit({title:this.message , code:400});
              this.submitted = false;
          })
    }
    
  }


}


export function idExistsValidator(producs: ProductService):AsyncValidatorFn  {
  return (control: AbstractControl) => {
      return producs.verifyExistProduct(control.value.toLowerCase())
          .pipe(
              map(resp => {
                return resp ? {idExists:true} : null
              })
          );
  }
}
