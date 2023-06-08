import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from "./product.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product, TipoAccion } from '../interfaces/products';


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

const requestBodyProduct: Product = {
    "id": "trj-tgh",
    "name": "Tarjetas de credito amex",
    "description": "Tarjeta de consumo bajo la modalidad de crédito",
    "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "date_release": new Date("2022-03-25"),
    "date_revision": new Date("2023-03-25")
}

const requestBodyDeleteProduct: Pick<Product,'id'> = {
    "id": "trj-tgh"
}

describe('ProductService', () => {

    let service: ProductService;
    let httpMock : HttpTestingController;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProductService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach( ()=> {
        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterAll( () => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('getProductsFinancial return a list of products and does a get method', () => {

        service.getProductsFinancial().subscribe((resp:Product[])=>{
            expect(resp).toEqual(listProducts);
        });

        const req = httpMock.expectOne(environment.baseUrlProducts + `/bp/products`);
        expect(req.request.method).toBe('GET');
        const httpRequest = req.request;
        expect(httpRequest.headers.get('authorId')).toBe('1');
        req.flush(listProducts);

    });

    it('deleteProduct verify response and delete method', () => {

        service.deleteProduct(requestBodyDeleteProduct).subscribe(resp=>{
            expect(resp).toEqual('Product successfully removed');
        });

        const req = httpMock.expectOne(environment.baseUrlProducts + `/bp/products?id=trj-tgh`);
        expect(req.request.method).toBe('DELETE');
        const httpRequest = req.request;
        expect(httpRequest.headers.get('authorId')).toBe('1');

        req.flush('Product successfully removed');

    });

    it('createUpdateProducto verify create and post method', () => {

        service.createUpdateProducto(requestBodyProduct, TipoAccion.Create ).subscribe(resp=>{
            expect(resp).toEqual(requestBodyProduct);
        });

        const req = httpMock.expectOne(environment.baseUrlProducts + `/bp/products`);
        expect(req.request.method).toBe('POST');
        const httpRequest = req.request;
        expect(httpRequest.headers.get('authorId')).toBe('1');

        req.flush(requestBodyProduct);

    });

    it('createUpdateProducto verify update, requestBody and put method', () => {

        service.createUpdateProducto(requestBodyProduct, TipoAccion.Update ).subscribe(resp=>{
            expect(resp).toEqual(requestBodyProduct);
        });

        const req = httpMock.expectOne(environment.baseUrlProducts + `/bp/products`);
        expect(req.request.method).toBe('PUT');
        const httpRequest = req.request;
        expect(httpRequest.headers.get('authorId')).toBe('1');

        expect(httpRequest.body).toEqual(requestBodyProduct);

        req.flush(requestBodyProduct);
    });

})