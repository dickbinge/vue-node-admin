<template>
  <div class="md-input-content"
  :class="{
    'md-input--active' :focus,
    'md-input--disabled': disabled,
    'md-input--raised': Boolean(focus  || currentValue)
  }">
    <div :class="{iconClass: icon}">
      <i v-if="icon"
        :class="[
        'el-icon-' + icon,
        'el-input__icon',
        'md-input__icon'
        ]"/>
      <input
        v-if="type === 'email'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        type="email"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-else-if="type === 'url'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :required="required"
        type="url"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-else-if="type === 'number'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :step="step"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :max="max"
        :min="min"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="number"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-else-if="type === 'password'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :max="max"
        :min="min"
        :required="required"
        type="password"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-else-if="type === 'tel'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :required="required"
        type="tel"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-else-if="type === 'text'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="text"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <span class="material-input-bar"/>
      <label class="material-label">
        <slot />
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mdInput',
  props: {
    icon: String,
    name: String,
    type: {
      type: String,
      default: 'text',
    },
    value: [String, Number],
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    min: String,
    max: String,
    step: String,
    minlength: Number,
    maxlength: Number,
    required: {
      type: Boolean,
      default: true,
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
      focus: false,
      fillPlaceHolder: null,
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  methods: {
    handleModelInput(event) {
      const value = event.target.value;
      this.$emit('input', value);
      if (this.$parent.$options.componentName === 'ElFormItem') {
        if (this.validateEvent) {
          this.$parent.$emit('el.form.change', [value]);
        }
      }
      this.$emit('change', value);
    },
    handleMdFocus(event) {
      this.focus = true;
      this.$emit('focus', event);
      if (this.placeholder && this.placeholder !== '') {
        this.fillPlaceHolder = this.placeholder;
      }
    },
    handleMdBlur(event) {
      this.focus = false;
      this.$emit('blur', event);
      this.fillPlaceHolder = null;
      if (this.$parent.$options.componentName === 'ElFormItem') {
        if (this.validateEvent) {
          this.$parent.$emit('el.form.blur', [this.currentValue]);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$font-size-base: 16px;
$font-size-small: 18px;
$font-size-mini: 12px;
$font-weight-normal: normal;
$font-weight-bold: bold;
$apixel: 1px;

$spacer: 12px;
$transition: 0.2s ease all;
$index: 0px;
$index-has-icon: 30px;

// color
$white: white;
$grey: #9e9e9e;
$grey-light: #e0e0e0;
$blue: #2196f3;
$red: #f44336;
$black: black;

%base-bar-pseudo {
  content: '';
  height: 1px;
  width: 0;
  bottom: 0;
  position: absolute;
  transition: $transition;
}

// mixins
@mixin slided-top() {
  top: -($font-size-base + $spacer);
  left: 0;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
}

.md-input-content {
  margin-top: 36px;
  position: relative;
  background-color: $white;
  * {
    box-sizing: border-box; // 定义元素宽高计算方法， border-box 最终的宽高是 100 - 10 - 10 -2 = 78
  }
  .iconClass {
    .md-input__icon {
      position: absolute;
      left: 0;
      line-height: $font-size-base;
      color: $blue;
      top: $spacer;
      width: $index-has-icon;
      height: $font-size-base;
      font-size: $font-size-base;
      font-weight: $font-weight-normal;
      pointer-events: none;
    }
    .material-label {
      left: $index-has-icon;
    }
    .material-input {
      text-indent: $index-has-icon;
    }
  }
  .material-input {
    font-size: $font-size-base;
    padding: $spacer $spacer $spacer - $apixel * 10 $spacer / 2;
    display: block;
    width: 100%;
    border: none;
    line-height: 1;
    border-radius: 0;
    background: none;
    color: $black;
    text-indent: $index;
    border-bottom: 1px solid $grey-light;
    &:focus {
      // border 可应用于所有有形的html元素，而outline是针对链接，表单元素等元素设计。 outline随着元素focus 而自动出现，blur自动消失。这些都是浏览器的默认行为，不需要js来进行控制
      // outline不会影响元素的尺寸
      outline: none;
      border: none;
      border-bottom: 1px solid transparent;
    }
  }
  .material-label {
    font-weight: $font-weight-normal;
    position: absolute;
    left: $index;
    top: 0;
    transition: $transition;
    font-size: $font-size-small;
    &:after,
    &:before {
      background-color: $blue;
    }
  }
  .material-input-bar {
    position: relative;
    display: block;
    width: 100%;
    &:before {
      @extend %base-bar-pseudo;
      left: 50%;
    }
    &:after {
      @extend %base-bar-pseudo;
      right: 50%;
    }
  }
  &.md-input--disabled {
    .material-input {
      border-bottom-style: dashed;
    }
  }
  &.md-input--raised {
    // 点击获取焦点后移动到上方
    .material-label {
      @include slided-top();
      color: $blue;
    }
  }
  &.md-input--active {
    .material-input-bar {
      &:before,
      &:after {
        width: 50%;
        background-color: $blue;
      }
    }
  }
}
</style>
