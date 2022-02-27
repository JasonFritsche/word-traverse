import { MatIcon } from "@angular/material/icon";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { MockComponent } from "ng-mocks";

import { MaterialModule } from "src/material/material.module";

import { OpenCloseComponent } from "./open-close.component";

describe("OpenCloseComponent", () => {
  let spectator: Spectator<OpenCloseComponent>;
  const createComponent = createComponentFactory({
    component: OpenCloseComponent,
    imports: [MaterialModule],
    declarations: [MockComponent(MatIcon)],
    detectChanges: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it("should have open-close-container class", () => {
    expect(spectator.query("div")).toHaveClass("open-close-container");
  });

  fit("should show pencil-outline svg if show is false", () => {
    spectator.component.show = false;
    spectator.detectChanges();
    expect(spectator.query("mat-icon")).toHaveId("pencil-outline");
  });

  fit("should show pencil-off-outline svg if show is true", () => {
    spectator.component.show = true;
    spectator.detectChanges();
    expect(spectator.query("mat-icon")).toHaveId("pencil-off-outline");
  });
});
