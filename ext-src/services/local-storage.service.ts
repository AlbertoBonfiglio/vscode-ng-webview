"use strict";

import { Memento } from "vscode";

export default class LocalStorageService {
  constructor(private storage: Memento) {}

  public getValue<T>(key: string): T | null {
    return this.storage.get<T>(key, null as any);
  }

  public setValue<T>(key: string, value: T) {
    this.storage.update(key, value);
  }
}
