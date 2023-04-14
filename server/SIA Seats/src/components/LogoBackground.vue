<template>
  <div
    id="logo-bg"
    class="d-flex flex-column justify-center align-center"
    ref="main"
  >
    <game-status v-if="hasGameStarted" />
    <v-sheet
      id="logo-container"
      width="20vw"
      height="20vw"
      elevation="10"
      rounded="circle"
      class="d-flex justify-center align-center"
      @click="party.confetti($event.target)"
    >
      <img id="logo" src="@/assets/letters3d-nohorns.png" />
    </v-sheet>
    <p v-if="username" id="username" dir="rtl" class="mt-5">
      היידהההה {{ username }}{{ username[username.length - 1].repeat(5) }}
    </p>
  </div>
</template>

<script setup>
import party from "party-js";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useSeatStore } from "../stores/SeatStore";
import { useUserStore } from "../stores/UserStore";
import GameStatus from "./GameStatus.vue";

const { username, hasGameStarted } = storeToRefs(useUserStore());
const { isGameDisabled, isGameOver } = storeToRefs(useSeatStore());

const main = ref(null);

watch(isGameDisabled, () => {
  if (isGameDisabled.value && isGameOver.value) {
    party.confetti(main.value, { count: party.variation.range(200, 300) });
  }
});
</script>

<style scoped>
#username {
  color: white;
  font-family: "Karantina", cursive;
  font-size: 3rem;
  text-shadow: 3px 3px #ff0000;
}
#logo-bg {
  z-index: -10;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

#logo {
  position: fixed;
  width: 10vw;
}

#logo-container:hover {
  z-index: 10;
  opacity: 80%;
  cursor: pointer;
}
</style>
