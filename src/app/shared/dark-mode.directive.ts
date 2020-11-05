import {Directive, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Directive({
    selector:'[appDarkMode]'
})
export class DarkModeDirective implements OnInit{
    @HostBinding('class.dark-mode') onDarkMode = false;

   ngOnInit() {
    this.onDarkMode = JSON.parse(localStorage.getItem('darkMode'));
   }
}