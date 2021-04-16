import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent implements OnInit {

  listComentarios: Comentario[] = [];
  constructor(private _comentarioService: ComentarioService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getComentarios();
  }

  getComentarios(){
    this._comentarioService.getListComentarios().subscribe(data =>{
      //console.log(data)
      this.listComentarios = data;
    }, error =>{
      this.toastr.error('Oops, Ocurrió un error', 'Error de sistema');
      console.log(error);
    });
  }

  eliminarComentario(id: any){
    //console.log(id);
    this._comentarioService.deleteComentario(id).subscribe(data =>{
      this.getComentarios();
      this.toastr.error('Comentario Eliminado con éxito!', 'Comentario eliminado');
    }, error=>{
      this.toastr.error('Oops, Ocurrió un error', 'Error de sistema');
      console.log(error);
    });
  }
}



