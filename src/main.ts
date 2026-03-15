import { Plugin } from 'obsidian';

export default class HarnessStudioPlugin extends Plugin {
  onload(): void {
    this.app.workspace.onLayoutReady(() => {
      void this.onLayoutReady();
    });
  }

  onunload(): void {}

  private async onLayoutReady(): Promise<void> {
    // TODO: fetch contracts, check active snapshot
  }
}
