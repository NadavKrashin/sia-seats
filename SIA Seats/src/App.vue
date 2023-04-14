<script setup>
import LogoBackground from "@/components/LogoBackground.vue";
import NameInput from "./components/NameInput.vue";
import HadasMap from "./components/HadasMap.vue";
import PlayersList from "./components/PlayersList.vue";
import { socket } from "@/socket.js";
import { useUserStore } from "./stores/UserStore";
import { useSeatStore } from "./stores/SeatStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { updateConnectedUsers, removeConnectedUser } = userStore;
const { hasGameStarted } = storeToRefs(userStore);
const seatStore = useSeatStore();
const { seats } = storeToRefs(seatStore);
const { updateSeat, resetClickedSeats } = seatStore;

socket.on("user_join", (connectedUsers) => {
  updateConnectedUsers(connectedUsers);
});

socket.on("user_left", (username) => {
  const userChosenSeat = seats.value.find(
    ({ clickedName }) => clickedName === username
  );

  if (userChosenSeat) {
    userChosenSeat.color = "white";
    userChosenSeat.clickedName = "";
  }
  resetClickedSeats();
  removeConnectedUser(username);
});

socket.on("seat-chosen", ({ seatId, username }) => {
  updateSeat(seatId, username);
});
</script>

<template>
  <main>
    <logo-background />
    <name-input />
    <div v-if="hasGameStarted">
      <hadas-map />
    </div>
    <players-list v-else />
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Karantina&display=swap");
</style>
