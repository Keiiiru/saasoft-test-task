<template>
  <form class="app-account-list__form" @keydown="formHandler">
    <v-text-field
      :rules="[rules.markMax]"
      label="Mark"
      v-model="account.mark"
    ></v-text-field>
    <v-select
      label="Account type"
      :items="['LDAP', 'Локальная']"
      v-model="account.type"
    ></v-select>
    <v-text-field
      :rules="[rules.required, rules.max]"
      label="Login"
      :validate-on="'eager'"
      v-model="account.login"
    ></v-text-field>
    <v-text-field
      :rules="[rules.max, rules.required]"
      :validate-on="'eager'"
      type="password"
      label="Password"
      v-model="account.password"
      v-if="account.type !== 'LDAP'"
    ></v-text-field>
    <button
      class="app-account-list__delete-btn"
      @click="() => accountStore.deleteAccount(account.id)"
    >
      delete
    </button>
  </form>
</template>

<script setup lang="ts">
import { VTextField } from "vuetify/lib/components/index.mjs";
import { ref, type PropType } from "vue";
import { useAccountStore } from "../store/accounts";
import { Account } from "~/types";

const accountStore = useAccountStore();

const props = defineProps({
  account: { type: Object as PropType<Account>, required: true },
  handleCreate: { type: Function },
  isEditing: { type: Boolean },
});

const account = ref({ ...props.account });

const submitForm = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();

    if (!isPasswordValid()) return alert("Password is empty");
    accountStore.addAccount(account.value);
    props.handleCreate();
  }
  return null;
};

const editForm = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();

    if (!isPasswordValid()) return alert("Password is empty");
    accountStore.editAccount(account.value);
  }
};

const formHandler = (event: KeyboardEvent) =>
  props.isEditing ? editForm(event) : submitForm(event);

const rules = {
  required: (value: string) => !!value || "Field is required",
  max: (value: string) => value.length <= 100 || "Max length 100char",
  markMax: (value: any) => value.length <= 50 || "Max length 50char",
};

function isPasswordValid(): boolean {
  if (account.value.type !== "LDAP" && !account.value.password) {
    return false;
  }
  return true;
}
</script>

<style scoped lang="sass">
.app-account-list__form
  display: flex
  flex-direction: row

  gap: 10px
  margin-top: 10px
</style>
