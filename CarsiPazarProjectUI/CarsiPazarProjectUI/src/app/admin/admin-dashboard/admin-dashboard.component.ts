import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  stats: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe(res => {
      this.stats = res;
    });
  }
}
