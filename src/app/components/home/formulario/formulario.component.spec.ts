import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { of } from 'rxjs';
import { Product } from '../../../interfaces/products';
import { FormularioComponent } from "./formulario.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

const listProducts: Product[] = [
    {
        "id": "trj-yape",
        "name": "Tarjeta Yape",
        "description": "Tarjeta nueva yapes",
        "logo": "https://blog.cuy.pe/wp-content/uploads/2021/02/Sin-ti%CC%81tulo-2-5.jpg",
        "date_release": new Date("2022-03-25"),
        "date_revision": new Date("2023-03-25")
    },
    {
        "id": "trj-tgh",
        "name": "Tarjetas de credito amex",
        "description": "Tarjeta de consumo bajo la modalidad de crédito",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": new Date("2022-03-25"),
        "date_revision": new Date("2023-03-25")
    }
];

const product: Product = {
    "id": "trj-yape",
    "name": "Tarjeta Yape",
    "description": "Tarjeta nueva yapes",
    "logo": "https://blog.cuy.pe/wp-content/uploads/2021/02/Sin-ti%CC%81tulo-2-5.jpg",
    "date_release": new Date("2022-03-25"),
    "date_revision": new Date("2023-03-25")
};

class ComponentTestRoute {};


describe('Formulario component', () => {
    let component: FormularioComponent;
    let fixture: ComponentFixture<FormularioComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule.withRoutes([
                  {path:'main/listado', component: ComponentTestRoute},
                  {path:'main/form', component: ComponentTestRoute}
                ])
            ],
            declarations: [
                FormularioComponent
            ],
            providers: [
                ProductService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(FormularioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.formAction.valid).toBeFalsy();
      });

      it('date_release form field validity', () => {
        let date_release = component.formAction.controls['date_release'];
        expect(date_release.valid).toBeTruthy();
      });

      it('date_revision form field is invalid', () => {
        let date_release = component.formAction.controls['date_release'];
        let date_revision = component.formAction.controls['date_revision'];
        date_revision.setValue('2024-04-23');
        expect(date_revision.valid).toBeFalsy();
      });

      it('date_revision form field is valid', () => {
        let date_release = component.formAction.controls['date_release'];
        let date_revision = component.formAction.controls['date_revision'];
        date_release.setValue('2024-04-23');
        date_revision.setValue('2025-04-23');
        expect(date_revision.valid).toBeTruthy();
      });

      it('logo form field is valid', () => {
        let logo = component.formAction.controls['logo'];
        logo.setValue('https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg');
        expect(logo.valid).toBeTruthy();
      });

      it('name form field validity', () => {
        let name = component.formAction.controls['name'];
        name.setValue('na');
        expect(name.valid).toBeFalsy();
      });


      it('submit form and create product', () => {
        expect(component.formAction.valid).toBeFalsy();

        component.formAction.controls['id'].clearAsyncValidators();
        component.formAction.controls['id'].setValue("tarj-123");
        component.formAction.controls['name'].setValue("Tarjeta");
        component.formAction.controls['logo'].setValue("https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg");
        component.formAction.controls['description'].setValue("description");
        component.formAction.controls['date_release'].setValue("2024-04-23");
        component.formAction.controls['date_revision'].setValue("2025-04-23");

        expect(component.formAction.valid).toBeTruthy();

        const producServ = fixture.debugElement.injector.get(ProductService);
        const spy = jest.spyOn(producServ, 'createUpdateProducto').mockReturnValueOnce( of(product) );

        component.saveProduct();
        expect(spy).toHaveBeenCalledTimes(1);

      });

      it('should navigate listado', ()=>{
        const router = TestBed.inject(Router);
        
        const spy = jest.spyOn(router, 'navigate');

        component.redirectList();
        expect(spy).toHaveBeenCalledWith(['main/listado']);
      })



})