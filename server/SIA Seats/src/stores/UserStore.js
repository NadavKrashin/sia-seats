import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const updateUsername = (newUsername) => {
    username.value = newUsername;
  };

  const connectedUsers = ref([]);
  const updateConnectedUsers = (users) => (connectedUsers.value = users);
  const removeConnectedUser = (username) =>
    (connectedUsers.value = connectedUsers.value.filter(
      (currUsername) => currUsername !== username
    ));

  const hasGameStarted = computed(() => connectedUsers.value.length === 10);

  return {
    username,
    updateUsername,
    connectedUsers,
    updateConnectedUsers,
    removeConnectedUser,
    hasGameStarted,
  };
});
