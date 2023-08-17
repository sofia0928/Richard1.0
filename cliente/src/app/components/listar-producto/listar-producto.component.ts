import { Component, OnInit } from '@angular/core';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { producto } from 'src/app/models/producto'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  
  listProductos: producto[] = [];

  constructor(private _productoService: ProductoServiceService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos(); 
  }
  
  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }
  eliminarProducto(id: any){
    this._productoService.eliminarProducto(id).subscribe(data =>{
     this.toastr.error('El producto fue eliminado con éxito', 'Producto Eliminado');
     this.obtenerProductos();
    },error =>{
     console.log('Error');
    })
  }
}
