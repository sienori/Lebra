import { BrowserWindow } from 'electron';

export const BookStore = {
  kindle: 'kindle',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
type Store = typeof BookStore[keyof typeof BookStore];

export const startSync = (store: Store) => {
  console.log('startSync', store);
};
