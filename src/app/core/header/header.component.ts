import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public darkMode: boolean | undefined;

  ngOnInit(): void {
    this.setTheme();
  }

  public onColorThemeChange(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-theme');

    this.darkMode
      ? localStorage.setItem('darkMode', 'darkMode')
      : localStorage.removeItem('darkMode');
  }

  public setTheme(): void {
    const isDarkMode = !!localStorage.getItem('darkMode');
    this.darkMode = isDarkMode;

    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    }
  }
}
