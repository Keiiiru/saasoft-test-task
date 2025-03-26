<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useAccountStore } from "./store/accounts";
import AccountForm from "./components/AccountForm.vue";
import { Account } from "./types";
import { getDefaultAccount } from "./constants";

const accountStore = useAccountStore();
const accountsList = computed<Account[]>(() => accountStore.getAccountList);
const isCreating = ref(false);

function handleCreate() {
  isCreating.value = false;
}
</script>

<template>
  <div class="app-header">
    <h1 class="app-header__text">Учетные записи</h1>
    <button
      class="app-header__create-account-btn"
      @click="isCreating = !isCreating"
    >
      +
    </button>
  </div>
  <div class="app-help">
    Для указания нескольких меток для одной пары логин/пароль в качестве
    разделителя используйте ;
  </div>

  <template v-if="accountsList">
    <ul class="app-account-list">
      <li
        class="app-account-list__account"
        v-for="(account, index) in accountsList"
        :key="index"
      >
        <AccountForm :account="account" :isEditing="true"></AccountForm>
      </li>
    </ul>
  </template>

  <AccountForm
    :account="getDefaultAccount()"
    :handleCreate="handleCreate"
    :isEditing="false"
    v-if="isCreating"
  ></AccountForm>
</template>

<style scoped lang="sass">
.app-header
  display: flex
  flex-direction: row

  gap: 10px

.app-account-list
  list-style: none
</style>
