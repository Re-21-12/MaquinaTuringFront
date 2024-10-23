import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navlist',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './navlist.component.html',
  styleUrl: './navlist.component.scss',
})
export class NavlistComponent {
  // Variable que controla la visibilidad del submenú
  isFormMenuOpen: boolean = false;

  // Función que alterna el estado del submenú
  toggleFormMenu(): void {
    this.isFormMenuOpen = !this.isFormMenuOpen;
  }
}
