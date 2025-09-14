import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatPaginatorModule, RouterLink],
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export default class FlightsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  orders: any[] = []
  page = 1
  limit = 10
  status = 'Todos'
  tabs = [
    { title: 'Todas', key: 'Todos', selected: true },
    { title: 'Próximas', key: 'Novo', selected: false },
    { title: 'Finalizadas', key: 'Finalizado', selected: false },
  ]

  constructor(private service: UserAuthService) { }

  ngOnInit(): void {
    this.findOrders(this.status)
  }


  findOrders(status: string) {
    this.service.findOrders(this.page, this.limit, status, 'Pessoa').subscribe({
      next: (result) => {
        this.orders = result.orders
        this.paginator.length = result.countOrders
      }
    })
  }

  tabFilter(filter: string) {
    this.status = filter
    this.findOrders(filter)
    const filterTab = this.tabs.find(t => t.key === filter) as any
    filterTab.selected = true
    this.tabs.filter(t => t.key !== filterTab.key).map(t => t.selected = false)

  }

  pagination(event: PageEvent) {
    this.page = ++event.pageIndex
    this.limit = event.pageSize
    this.findOrders(this.status)
  }
}
