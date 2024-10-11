import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NavlistComponent } from './shared/components/navlist/navlist.component.js';
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone';
import { FooterComponent } from "./shared/components/footer/footer.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDivider,
    MatListModule,
    NavlistComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front';
  showFiller = false;
}
