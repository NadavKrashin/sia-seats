<template>
  <v-col :cols="cols"
    ><v-sheet
      :width="width"
      :height="height"
      :color="currentSeat.color"
      @click="chooseSeat"
      :class="[props.class, 'd-flex justify-center align-center']"
      elevation="3"
      >{{ currentSeat.clickedName }}</v-sheet
    ></v-col
  >
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/UserStore";
import { useSeatStore } from "../stores/SeatStore";
import { storeToRefs } from "pinia";
import { socket } from "@/socket.js";

const props = defineProps({
  cols: Number,
  width: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  class: String,
  id: {
    type: Number,
    required: true,
  },
});

const { username } = storeToRefs(useUserStore());
const seatStore = useSeatStore();
const { seats, isGameDisabled } = storeToRefs(seatStore);
const { updateSeat } = seatStore;

const currentSeat = computed(() =>
  seats.value.find(({ id }) => id === props.id)
);

const chooseSeat = () => {
  if (
    (!isGameDisabled.value && currentSeat.value.clickedName === "") ||
    currentSeat.value.clickedName === username.value
  ) {
    updateSeat(currentSeat.value.id, username.value);
    socket.emit("choose-seat", {
      seatId: currentSeat.value.id,
      username: username.value,
    });
  }
};
</script>

<style scoped>
.seat {
  font-family: "Karantina", cursive;
  font-size: 6vw;
  z-index: 10;
}
.seat:hover {
  opacity: 80%;
  cursor: pointer;
}
</style>
