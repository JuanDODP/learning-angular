import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../services/gifs.service';
interface MenuOptions {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}
@Component({
  selector: 'gifs-side-menu-options',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptions {
  // inyectar sevicio de menus
   gifService = inject(GifsService);

  //  ==============================================================================================

  menuOptions: MenuOptions[] = [
    {
      label: 'Trending',
      sublabel: 'Popular Gifs',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line'
    },
    {
      label: 'Buscar',
      sublabel: 'Buscar Gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    }
  ];

}
