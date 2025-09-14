import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-solicitations',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatPaginatorModule, RouterLink],
  templateUrl: './solicitations.component.html',
  styleUrls: ['./solicitations.component.scss'],
})
export default class SolicitationsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  solicitations: any[] = [];
  page = 1;
  limit = 10;
  status = 'Todos';
  tabs = [
    { title: 'Todas', key: 'Todos', selected: true },
    { title: 'Em Análise ', key: 'Em Analise pela mobAir', selected: false },
    { title: 'Aceitas', key: 'Aceito', selected: false },
    { title: 'Aguardando pagamento', key: 'Aguardando cliente', selected: false },
    { title: 'Canceladas', key: 'Cancelado', selected: false },
  ];

  constructor(private service: UserAuthService) {}

  ngOnInit(): void {
    this.findAllSolicitations();
  }

  findAllSolicitations() {
    this.service.findAllSolicitations(this.page, this.limit, this.status).subscribe({
      next: (result) => {
        this.solicitations = result.solicitations;
        this.paginator.length = result.countSolicitations;
      },
    });
  }

  tabFilter(filter: string) {
    this.status = filter;
    this.findAllSolicitations();
    const filterTab = this.tabs.find((t) => t.key === filter) as any;
    filterTab.selected = true;
    this.tabs
      .filter((t) => t.key !== filterTab.key)
      .map((t) => (t.selected = false));
  }

  pagination(event: PageEvent) {
    this.page = ++event.pageIndex;
    this.limit = event.pageSize;
    this.findAllSolicitations();
  }
}
