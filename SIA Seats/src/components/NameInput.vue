<template>
  <v-dialog v-model="dialog" max-width="50vw" persistent>
    <v-card>
      <v-card-title dir="rtl" class="headline"
        >איך קוראים לךךךך???</v-card-title
      >
      <v-select
        :items="names"
        v-model="selectedUser"
        filled
        label="הסגל החזק בהסטוריה"
        @update:modelValue="errorMsg = ''"
      ></v-select>
      <p v-if="errorMsg" dir="rtl" class="text-center pt-0">{{ errorMsg }}</p>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          variant="tonal"
          color="red"
          size="large"
          width="10vw"
          @click="selectUser"
          >יאללה סע</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { socket } from "@/socket.js";

const { updateUsername, updateConnectedUsers } = useUserStore();
const dialog = ref(true);
const names = ref([
  "ירדן",
  "יוגב",
  "אמיר",
  "סויסה",
  "בר",
  "שלי",
  "נבו",
  "קרשנוס",
  "ערן",
  "נועה",
]);

const errorMsg = ref("");
const selectedUser = ref(null);

const selectUser = () => {
  if (!selectedUser.value) {
    errorMsg.value = "מה עם לבחור שם?";
  } else {
    updateUsername(selectedUser.value);
    socket.connect();

    socket.emit("user_join", selectedUser.value, (connectedUsers) => {
      updateConnectedUsers([...connectedUsers]);
    });
    dialog.value = false;
    errorMsg.value = "";
  }
};
</script>

<style scoped></style>
