import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar bg-base-100">
      <p class="normal-case text-2xl">Word Traverse</p>
    </div>
  `,
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
