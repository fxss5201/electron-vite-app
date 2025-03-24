import { RouteLocationRaw } from 'vue-router';

export type RouterType = 'push' | 'replace';

export interface RouterMessage {
  type: RouterType;
  router: RouteLocationRaw;
}
