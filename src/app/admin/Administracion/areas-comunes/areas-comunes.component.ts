import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-comunes',
  templateUrl: './areas-comunes.component.html',
  styleUrls: ['./areas-comunes.component.css']
})
export class AreasComunesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onGoAjustesAreasComunales() {
    this.router.navigate(['/admin/administracion/areasComunes']);
  }


}
