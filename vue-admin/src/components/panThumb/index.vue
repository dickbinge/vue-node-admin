<template>
  <div class="pan-thumb" :style="panObj">
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <img :src="image" class="pan-img" />
  </div>
</template>
<script>
export default {
  name: 'panThumb',
  props: {
    image: String,
    width: {
      type: [Array, Number],
    },
  },
  computed: {
    panObj() {
      const obj = {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.width === 'number' ? `${this.width}px` : this.width,
      };
      return obj;
    },
  },
};
</script>
<style lang="scss" scoped>
.pan-thumb {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba($color: #000000, $alpha: 0.1);
  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
  }
  .pan-info-roles-container {
    padding: 20px;
    text-align: center;
  }
  .pan-img {
    width: 100%;
    height: 100%;
    background-size: 100%;
    border-radius: 50%;
    overflow: hidden;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
  &:hover{
    .pan-img {
      transform: rotate(-100deg);
    }
  }
}
</style>
