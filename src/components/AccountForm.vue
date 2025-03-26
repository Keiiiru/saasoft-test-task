<template>
  <form class="app-account-list__form" @keydown="formHandler">
    <v-text-field
      :rules="[rules.markMax]"
      label="Mark"
      @input="(event) => (newAccount.mark = event.target.value.split(';'))"
      v-model="mark"
    ></v-text-field>
    <v-select
      label="Account type"
      :items="['LDAP', 'Локальная']"
      @change="(event) => (newAccount.type = event.target.value)"
      v-model="type"
    ></v-select>
    <v-text-field
      :rules="[rules.required, rules.max]"
      label="Login"
      :validate-on="'eager'"
      @input="(event) => (newAccount.login = event.target.value)"
      v-model="login"
    ></v-text-field>
    <v-text-field
      :rules="[rules.max, rules.required]"
      :validate-on="'eager'"
      type="password"
      label="Password"
      @input="(event) => (newAccount.password = event.target.value)"
      v-model="password"
      v-if="newAccount?.type !== 'LDAP'"
    ></v-text-field>
    <button
      class="app-account-list__delete-btn"
      @click="() => deleteAccount(newAccount.id)"
    >
      delete
    </button>
  </form>
</template>

<script setup lang="ts">
import { VTextField } from "vuetify/lib/components/index.mjs";
import { computed, type PropType } from "vue";
import { useAccountStore } from "../store/accounts";

interface Account {
  id: number;
  mark?: string[] | null;
  type?: string;
  login?: string | null;
  password?: string | null;
}

const accountStore = useAccountStore();

const props = defineProps({
  newAccount: { type: Object as PropType<Account> },
  deleteAccount: { type: Function },
  isEditing: { type: Boolean },
});

const mark = computed({
  get: () => props.newAccount?.mark?.join(";") || "",
  set: (val) => {
    if (props.newAccount.mark) {
      props.newAccount.mark = val.split(";");
    }
  },
});

const type = computed({
  get: () => props.newAccount?.type || "Локальная",
  set: (val) => {
    if (props.newAccount) {
      props.newAccount.type = val;
    }
  },
});

const login = computed({
  get: () => props.newAccount?.login || "",
  set: (val) => {
    console.log(props);
    if (props.newAccount) {
      props.newAccount.login = val;
    }
  },
});

const password = computed({
  get: () => props.newAccount?.password || "",
  set: (val) => {
    if (props.newAccount) {
      props.newAccount.password = val;
    }
  },
});

const submitForm = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    if (!props.newAccount.password && props.newAccount.type === "LDAP") {
      props.newAccount.password = null;
      accountStore.addAccount(props.newAccount);
    } else if (props.newAccount.password) {
      accountStore.addAccount(props.newAccount);
    } else throw new Error("Password is required");
  }

  return null;
};

const editForm = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    if (!props.newAccount.password && props.newAccount.type === "LDAP") {
      props.newAccount.password = null;
      accountStore.editAccount(props.newAccount);
    } else if (props.newAccount.password) {
      accountStore.editAccount(props.newAccount);
    } else throw new Error("Password is required");
  }
};

const formHandler = (event: KeyboardEvent) =>
  props.isEditing ? editForm(event) : submitForm(event);

const rules = {
  required: (value: string) => !!value || "Field is required",
  max: (value: string) => value.length <= 100 || "Max length 100char",
  markMax: (value: any) => value.length <= 50 || "Max length 50char",
};
</script>

<style scoped lang="sass">
.app-account-list__form
  display: flex
  flex-direction: row

  gap: 10px
  margin-top: 10px
</style>
