import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListadoComponent } from "./listado.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { of } from 'rxjs';
import { Product } from '../../../interfaces/products';

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


describe('Listado component', () => {
    let component: ListadoComponent;
    let fixture: ComponentFixture<ListadoComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                ListadoComponent
            ],
            providers: [
                ProductService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getAllProducts get products from the subscription',()=>{
        const producServ = fixture.debugElement.injector.get(ProductService);
        const spy = jest.spyOn(producServ, 'getProductsFinancial').mockReturnValueOnce( of(listProducts) );
        component.getAllProducts();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('searchByName filter products by name',()=>{
        
        component.auxDataFilterSearch = listProducts;
        
        component.searchByName('Yape');
        expect(component.products.length).toBeGreaterThan(0);
    });

    it('deleteProduct product and call method getAllProducts ',()=>{
        
        const producServ = fixture.debugElement.injector.get(ProductService);
        const spy = jest.spyOn(producServ, 'deleteProduct').mockReturnValueOnce( of('Product successfully removed') );
        const spy2 = jest.spyOn(component, 'getAllProducts').mockImplementation( () => null);
        window.confirm = jest.fn(() => true);
        component.deleteProduct(product);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);

    });

})