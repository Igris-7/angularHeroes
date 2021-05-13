import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _auth : Auth | undefined;

  constructor(private http : HttpClient) { }

  verificaAuntenticacion():Observable<boolean>
  {
    if( !localStorage.getItem('token'))
    {
        //return of(false);
        return of(false);
    }

   // return of(true);
    
   return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
          .pipe(
            map( auth => 
              {
                //console.log('map', auth);
                this._auth = auth;//recargar informacion
                return true;
              })
          );
  }


  get auth(): Auth
  {
    return {...this._auth!};
  }

  login()
  {

  return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  .pipe(
    tap( auth => this._auth = auth),
    tap( auth => localStorage.setItem('token',auth.id)
    ) // recibe el producto de la operador anterior
  );

  }

  logout()
  {
    this._auth = undefined;
  }


}
