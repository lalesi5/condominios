import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-ajustes-areas-comunales',
  templateUrl: './ajustes-areas-comunales.component.html',
  styleUrls: ['./ajustes-areas-comunales.component.css']
})
export class AjustesAreasComunalesComponent implements OnInit {

  idAdmin: string = '';
  idCondominio: string = ';'
  areasComunales: any[] = [];

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
  }

}
