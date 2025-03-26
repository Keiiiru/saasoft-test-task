import { defineStore } from "pinia";

export type Account = {
  id: number;
  mark: string[];
  type: string;
  login: string;
  password?: string | null;
};

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: [] as Account[],
  }),
  getters: {
    getAccountList() {
      return this.accounts;
    },
  },
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account);
    },
    editAccount(account: Account) {
      this.accounts = this.accounts.map((acc) =>
        acc.id === account.id ? account : acc
      );
    },
    deleteAccount(id: number) {
      this.accounts = this.accounts.filter((acc: Account) => acc.id !== id);
    },
  },
  persist: true,
});
