import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent{
  collapseShow = "hidden";
  constructor() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
}
