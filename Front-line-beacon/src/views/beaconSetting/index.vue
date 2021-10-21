<template>
  <div>
    <div>
      <theNav />
    </div>
    <beaconSettingInput />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import beaconSettingInput from "./beaconSettingInput.vue";
import theNav from "../../components/BeaconTitle.vue";
export default defineComponent({
  name: "Home",
  components: {
    beaconSettingInput,
    theNav,
  },
});
</script>
