<template>
  <div>
    <beaconSettingInput />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import beaconSettingInput from "./beaconSettingInput.vue";
export default defineComponent({
  name: "Home",
  components: {
    beaconSettingInput,
  },
});
</script>
