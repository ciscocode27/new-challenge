import { Component, HostListener, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { Product, TipoAccion } from '../../../interfaces/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

    nameFilter:string;
    activeForm:boolean = false;
    showAlert:boolean = false;
    messageAlert:string = '';
    codeMsg:number = 200;
    listEnumTypes = TipoAccion;
    noData:boolean = false;
    products:Product[] = [];
    auxProducts:Product[] = [];
    startPaginacion:number = 0;
    perPage:number = 5;
    dataPagination:number[];
    auxDataFilterSearch:Product[] = [];
    titleDescription:string = 'Descripción del Producto.';
    titleDataRelease:string = 'Fecha a liberar el producto para los clientes en General.';
    titleDataRevision:string = 'Fecha de revisión del producto para cambiar Términos y Condiciones.';


    @HostListener("document:click")
    clicked() {
      this.closeMenuOpts();
    }

  constructor(
    private prudctService: ProductService,
    private router: Router
    ) { }

  ngOnInit():void {
    this.prudctService.typeForm = this.listEnumTypes.Create;
    this.getAllProducts();
  }

  

  getAllProducts():void{
    this.prudctService.getProductsFinancial()
        .pipe(take(1))
        .subscribe( resp =>{
            this.products = resp;
            this.products = this.products.map(pr=>{
                pr.altLogo = pr.logo;
                return pr;
            });
            this.auxProducts = JSON.parse(JSON.stringify(this.products));
            this.auxDataFilterSearch = JSON.parse(JSON.stringify(this.auxProducts));
            this.startPaginacion = 0;
            if( this.products.length !== 0 ){

              this.setInitialPagination();
              
            }else{
              this.noData = true;
            }
            
        },()=>{
          this.prudctService.eventoFormulario.emit({title: 'Ocurrió un error inesperado!' , code:400});
        })
  }

  setInitialPagination(){
    this.products = this.auxProducts.filter( (elm,i)=> (i >= this.startPaginacion) && i < ( this.startPaginacion + this.perPage ) );
    this.startPaginacion += this.perPage;
    let cantidadProductos = this.auxProducts.length;
    let cantidadPaginas = Math.ceil( cantidadProductos / this.perPage );
    this.dataPagination = Array.from({length:  cantidadPaginas }, (v, i) => i) ;
  }



  searchByName(search:string){
      this.startPaginacion = 0;
      if( search.trim() === '' ){
        this.auxProducts = JSON.parse(JSON.stringify(this.auxDataFilterSearch));
        this.products = JSON.parse(JSON.stringify(this.auxProducts));
      }else{
        this.auxProducts = this.auxDataFilterSearch.filter(prd => prd.name.toLowerCase().includes(search.toLowerCase().trim()) );
        this.products = JSON.parse(JSON.stringify(this.auxProducts));
      }
      
      if( this.products.length !== 0 ){ 
        this.noData = false;
        this.setInitialPagination();
      }else{
        this.noData = true;
      }
  }

  changePage(page:string){
    this.startPaginacion = (Number(page) * this.perPage ) - this.perPage;
    this.products = this.auxProducts;
    this.products = this.auxProducts.filter( (elm,i)=> (i >= this.startPaginacion) && i < ( this.startPaginacion + this.perPage ) );
    this.startPaginacion += this.perPage;
  }


  deleteProduct(product:Product){
    if(  confirm(`¿Estás seguro que deseas eliminar el producto ${product.name} ?`) ){
      let params = {
        id: product.id
      };
      this.prudctService.deleteProduct(params)
          .pipe(take(1))
          .subscribe( resp=>{
            console.log('resppppp',resp);
              this.prudctService.eventoFormulario.emit({title: 'Producto eliminado exitosamente!' , code:200});
              this.getAllProducts();
          },error=>{
            if( error.status !== 200 ){
              this.prudctService.eventoFormulario.emit({title: 'Ocurrió un error inesperado!' , code:400});
            }else{
              this.prudctService.eventoFormulario.emit({title: 'Producto eliminado exitosamente!' , code:200});
              this.getAllProducts();
            }
            
          })
    }
    
  }

  redirectForm(){
    this.router.navigate(['main/form']);
  }

  updateProduct(product:Product){
    this.prudctService.typeForm = this.listEnumTypes.Update;
    this.prudctService.infoProductsEdit = product;
    this.router.navigate(['main/form']);
  }



onErrorImage(product:Product){
  product.altLogo = 'assets/image-not-found.png';
}

openOptionsMenu(indexProduct){
  setTimeout(() => {
    this.products = this.products.map((pr,ix) =>{
      if( ix === indexProduct ){
        pr.openMenu = true;
      }else{
        pr.openMenu = false;
      }
      return pr;
    })
  }, 150);

}


closeMenuOpts(){
  this.products = this.products.map(pr => {
    pr.openMenu = false;
    return pr;
  } );
}



}


