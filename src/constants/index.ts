import { Account } from "~/types";

export const getDefaultAccount = (): Account => {
  return {
    id: Math.round(Math.random() * 1000),
    mark: [],
    type: "",
    login: "",
    password: "",
  };
};
