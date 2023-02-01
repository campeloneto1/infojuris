import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanMatch,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../shared/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {
  constructor(private sessionService: SessionService,
    private router: Router){
     }

    administrador = [
      '/Cidades',
      '/Comarcas',
      '/Escritorios',
      '/Estados',
      '/Estados-Civis',
      '/Naturezas',
      '/Ocupacoes',
      '/Paises',
      '/Perfis',      
      '/Status',
      '/Sexos',
      '/Tribunais',
      '/Varas',
    ]

    perfil = this.sessionService.retornaPerfil();

    
    canMatch(
      route: Route,
      segments: UrlSegment[]
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree 
    {

      if (!this.sessionService.check()) {
        this.router.navigate(['auth']);
        return false;
      }
      
      return true;
    }

    
  
}
