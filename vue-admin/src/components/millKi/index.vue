<template>
  <a :class="className" class="link-mallki" :href="href">
    {{ text }}
    <span :data-letters="text"/>
    <span :data-letters="text"/>
  </a>
</template>

<script>
export default {
  name: 'millKi',
  props: {
    className: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: 'vue学习vuex学习',
    },
  },
};
</script>

<style lang="scss" scoped>
.link-mallki {
  font-weight: 800;
  color: #4dd9d5;
  font-family: 'Dosis', sans-serif;
  transition: color 0.5s 0.25s;
  -webkit-transition: color 0.5s 0.25s;
  overflow: hidden;
  position: relative;
  display: inline-block;
  line-height: 1;
  outline: none;
  text-decoration: none;
  &:hover {
    transition: none;
    -webkit-transition: none;
    color: transparent;
    &:before {
      transform: translate3d(100%, 0, 0);
      -webkit-transform: translate3d(100%, 0, 0);
    }
    span{
      &:before {
        -webkit-transition-delay: 0.3s;
        transition-delay: 0.3s;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      }
    }
  }
  &:before {
    content: '';
    width: 100%;
    height: 6px;
    margin: -3px 0 0 0;
    background: #3888fa;
    position: absolute;
    left: 0;
    top: 50%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    -webkit-transition: -webkit-transform 0.4s;
    transition: transform 0.4s;
    -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  }
  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50%;
    overflow: hidden;
    &:before {
      content: attr(data-letters);
      position: absolute;
      left: 0;
      width: 100%;
      color: #3888fa;
      -webkit-transition: -webkit-transform 0.5s;
      transition: transform 0.5s;
    }
    &:nth-child(2) {
      top: 50%;
      &:before {
        bottom: 0;
        transform: translate3d(0, -100%, 0); // 从右到左
        -webkit-transform: translate3d(0, -100%, 0);
      }
    }
    &:first-child::before {
      top: 0;
      transform: translate3d(0, 100%, 0);
      -webkit-transform: translate3d(0, 100%, 0);
    }
  }
}
</style>
