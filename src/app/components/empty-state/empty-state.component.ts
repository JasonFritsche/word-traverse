import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: ` <div class="flex flex-col items-center">
    <img src="assets/images/empty-state-monster.png" alt="cute monster image" />
    <ng-content></ng-content>
  </div>`,
})
export class EmptyStateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
