<template>
  <div>
    <div class="Steps">
      <ul class="StepsUl clearfix">
        <li
          class="StepsItem fl"
          v-for="(item, i) in list"
          :class="index === i && 'active'"
          :key="i"
        >
          <span class="StepsItemNum">{{ i + 1 }}</span>
          <span class="StepsItemText">{{ item }}</span>
          <span class="StepsItemArrow" style="margin-top:-3px;">
            <i class="iconfont iconyou"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      required: true,
      type: Array
    },
    index: {
      required: true,
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.Steps {
  text-align: center;
  background: $table-header-color;
  .StepsUl {
    font-size: 14px;
    display: inline-block;
    color: #999;
    padding: 15px 32px;
    margin: 0 auto;
    .StepsItem {
      position: relative;
      padding-right: 32px;
      margin-right: 12px;
      &::after {
        content: '';
        position: absolute;
      }
      &:last-child {
        padding-right: 0;
        margin-right: 0;
        &::after {
          width: 0;
        }
        .StepsItemArrow {
          display: none;
        }
      }
      &.active {
        color: #3771D7;
        .StepsItemNum {
          border-color: #3771D7;
        }
      }
      .StepsItemNum {
        display: inline-block;
        border: 1px solid #999999;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
      }
      .StepsItemText {
        margin-left: 16px;
      }
      .StepsItemArrow {
        color: #d9d9d9 !important;
        font-size: 22px;
        display: inline-block;
        width: 22px;
        height: 22px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }
    }
  }
}
</style>
