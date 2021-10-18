<template>
  <!-- <a :href="url" class="test">123</a> -->
  <div v-for="k in data" :key="k.name">
    <span v-if="k.name === '3'">座號: {{ k.name }}</span>
  </div>
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <br />
  <span>Picked: {{ picked }}</span>

  <div>
    <el-radio v-model="radio4" label="1" size="mini">Option 1</el-radio>
    <el-radio v-model="radio4" label="2" size="mini">Option 2</el-radio>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const data = [
      {
        name: "1",
      },
      {
        name: "2",
      },
      {
        name: "3",
      },
      {
        name: "4",
      },
      {
        name: "5",
      },
    ];
    return {
      data,
      picked: ref(),
      radio4: ref("1"),
    };
  },
});
</script>
