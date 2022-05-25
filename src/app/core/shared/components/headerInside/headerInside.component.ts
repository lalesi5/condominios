import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../../services/auth.service";
import {DialogService} from "../../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-headerInside',
  templateUrl: './headerInside.component.html',
  styleUrls: ['./headerInside.component.css']
})

export class HeaderInsideComponent implements OnInit {

  private subscription: Subscription = new Subscription;

  constructor(
    private _authService: AuthService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.subscription.add(
      this._dialogService.confirmDialog({
        title: 'Cerrar Sesión',
        message: '¿Está seguro de salir del Sistema?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this._authService.logout();
          this.toastr.info('Gracias por usar el sistema', 'Ha cerrado Sesión', {
            positionClass: 'toast-bottom-right'
          });
        }
      })
    )
  }
}
