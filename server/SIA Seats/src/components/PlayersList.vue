<template>
  <v-list dir="rtl" width="25vw" id="players" bg-color="rgba(0,0,0,0)">
    <v-list-item
      v-for="({ username, isConnected }, i) in usersStatus"
      :key="i"
      :value="username"
    >
      <template v-slot:prepend>
        <v-icon
          class="ml-2"
          :icon="isConnected ? 'mdi-lan-connect' : 'mdi-lan-disconnect'"
          :color="isConnected ? 'green-darken-4' : 'red-darken-4'"
        ></v-icon>
      </template>

      <v-list-item-title
        id="player-name"
        :class="`text-${isConnected ? 'green-darken-2' : 'red-darken-2'}`"
        v-text="username"
      ></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useSeatStore } from "../stores/SeatStore";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const { connectedUsers } = storeToRefs(userStore);
const { seats } = useSeatStore();

const usersStatus = computed(() =>
  seats.map(({ seatName }) => ({
    username: seatName,
    isConnected: connectedUsers.value.includes(seatName),
  }))
);
</script>

<style scoped>
#players {
  margin-left: auto;
}

#player-name {
  color: white;
  font-family: "Karantina", cursive;
  font-size: 2vw;
}
</style>
