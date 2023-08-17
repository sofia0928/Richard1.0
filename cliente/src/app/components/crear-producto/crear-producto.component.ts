import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { producto } from 'src/app/models/producto';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

   productoForm: FormGroup;
   titulo = 'Crear Producto';
   id: string | null;

   constructor(private fb: FormBuilder,
               private _productoService: ProductoServiceService,
               private router: Router,
               private toastr: ToastrService,
               private aRoute: ActivatedRoute) {
      this.productoForm = this.fb.group({
        producto: ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio: ['', Validators.required],
      });
      this.id = this.aRoute.snapshot.paramMap.get('id');
   }

   ngOnInit(): void {
    this.esEditar();
   }

   agregarProducto() {
    console.log(this.productoForm);

    const PRODUCTO: producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (this.id !== null) {
      // editar
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(
        data => {
          this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error al actualizar el producto', error);
          this.productoForm.reset();
        }
      );
    } else {
      // crear
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(
        data => {
          this.toastr.success('El producto fue resgistrado con exito!', 'Producto Registrado!')
          this.router.navigate(['/']);
        },
        error => {
          console.log('Error');
          this.productoForm.reset();
        }
      );
    }
   }

   esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        });
      });
    }
   }
}