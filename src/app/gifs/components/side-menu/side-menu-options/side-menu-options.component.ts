import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


interface MenuOption{
  label: string,
  subLabel: string,
  route: string,
  icon: string
}

@Component({
  selector: 'side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styles: ``
})
export class GifsSideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line'
    },
    {
      label: 'Buscador',
      subLabel: 'Buscar Gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass'
    }
  ]

}
