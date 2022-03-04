import { animate, state, style, transition, trigger, AnimationEvent } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";

export type OpenCloseState = "open" | "closed";

@Component({
  selector: "app-open-close",
  templateUrl: "./open-close.component.html",
  styleUrls: ["./open-close.component.scss"],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          opacity: 1,
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
        })
      ),
      transition("open => *", [animate("300ms ease-out")]),
      transition("* => open", [animate("350ms ease-in")]),
    ]),
  ],
})
export class OpenCloseComponent implements OnInit {
  constructor() {}

  @Input() openText!: string;
  @Input() closeText!: string;

  isOpen = false;
  state!: OpenCloseState;
  show = false;

  ngOnInit(): void {}

  toggleShow() {
    this.state = !this.show ? "open" : "closed";
    this.show = !this.show;
  }

  animationDone(event: AnimationEvent) {
    if (event.toState === "closed") {
      this.show = false;
    }
  }
}
