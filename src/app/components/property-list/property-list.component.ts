import { Component, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Property } from '../../model/property';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { Permission } from '../../model/permission';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  db: DbService = inject(DbService);
  utils: UtilsService = inject(UtilsService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  isAdmin: boolean = this.authService.checkUserPermission() == Permission.ADMIN;
  properties?: Property[];

  constructor() {
    this.db.fetchProperties().subscribe((p) => {
      this.properties = p;
      this.utils.attachPhotos(this.properties);
      this.utils.formatPrices(this.properties);
    });
  }

  navigate(id: number) {
    this.router.navigate(['dashboard', 'details', id]);
  }
}
