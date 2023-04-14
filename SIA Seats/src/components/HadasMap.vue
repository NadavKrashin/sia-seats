<template>
  <div class="w-100 ml-5 mt-3">
    <div class="d-flex flex-column justify-space-between">
      <v-row>
        <one-seat :cols="3" width="20vw" height="20vw" class="seat" :id="1" />
        <one-seat :cols="2" width="12vw" height="6vw" class="seat" :id="2" />
        <one-seat :cols="2" width="12vw" height="6vw" class="seat" :id="3" />
        <one-seat :cols="2" width="12vw" height="6vw" class="seat" :id="4" />
      </v-row>

      <v-row>
        <one-seat width="7vw" height="15vh" class="seat mt-5" :id="5" />
      </v-row>
      <v-row>
        <one-seat width="7vw" height="15vh" class="seat mt-5" :id="6" />
      </v-row>

      <v-row class="d-flex align-end">
        <one-seat
          :cols="3"
          width="7vw"
          height="15vh"
          class="seat mt-5"
          :id="7"
        />
        <one-seat :cols="2" width="12vw" height="6vw" class="seat" :id="8" />
        <one-seat :cols="2" width="12vw" height="6vw" class="seat" :id="9" />
        <one-seat :cols="2" width="12vw" height="6vw" class="seat" :id="10" />
      </v-row>
    </div>
  </div>
</template>

<script setup>
import OneSeat from "@/components/OneSeat.vue";
</script>

<style scoped></style>
