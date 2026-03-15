// Obsidian API mock — populated as UI/core tests require specific API shapes
export class Plugin {
  app: App = new App();
  manifest = { id: 'harness-studio', name: 'Harness Studio', version: '0.1.0' };

  onload(): Promise<void> {
    return Promise.resolve();
  }
  onunload(): void {}
  addCommand(_: unknown): void {}
  addRibbonIcon(_: string, __: string, ___: (evt: MouseEvent) => unknown): HTMLElement {
    return document.createElement('div');
  }
  registerView(_: string, __: unknown): void {}
}

export class App {
  workspace = new Workspace();
  vault = new Vault();
}

export class Workspace {
  onLayoutReady(cb: () => void): void {
    cb();
  }
  getActiveFile(): null {
    return null;
  }
}

export class Vault {}

export class Modal {
  app: App;
  constructor(app: App) {
    this.app = app;
  }
  open(): void {}
  close(): void {}
  onOpen(): void {}
  onClose(): void {}
}

export class Notice {
  constructor(_message: string, _timeout?: number) {}
}

export class PluginSettingTab {
  app: App;
  constructor(app: App, _plugin: unknown) {
    this.app = app;
  }
  display(): void {}
  hide(): void {}
}

export class Setting {
  constructor(_containerEl: HTMLElement) {}
  setName(_: string): this {
    return this;
  }
  setDesc(_: string): this {
    return this;
  }
  addText(_: (text: unknown) => unknown): this {
    return this;
  }
  addToggle(_: (toggle: unknown) => unknown): this {
    return this;
  }
  addDropdown(_: (dropdown: unknown) => unknown): this {
    return this;
  }
  addButton(_: (button: unknown) => unknown): this {
    return this;
  }
}

export class ItemView {
  app: App = new App();
  containerEl = document.createElement('div');
  getViewType(): string {
    return '';
  }
  getDisplayText(): string {
    return '';
  }
  async onOpen(): Promise<void> {}
  async onClose(): Promise<void> {}
}

export class TFile {
  path = '';
  name = '';
  basename = '';
  extension = '';
}

export const Platform = {
  isDesktop: true,
  isMobile: false,
};

export const requestUrl = vi.fn();
