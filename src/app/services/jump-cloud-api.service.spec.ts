import { TestBed } from "@angular/core/testing";

import { JumpCloudApiService } from "./jump-cloud-api.service";

describe("JumpCloudApiService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: JumpCloudApiService = TestBed.get(JumpCloudApiService);
    expect(service).toBeTruthy();
  });
});
