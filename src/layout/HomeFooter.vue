<template> </template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#footer {
  .appFooter {
    width: 100%;
    height: 304px;
    background: #000b26;
    position: relative;
    color: #ffffff;
  }
  .copyright {
    opacity: 0.3;
    font-size: $fz12;
    position: absolute;
    bottom: 20px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-top: 20px;
    color: #cdcccc;
  }
  .tips > ul > li,
  .about > ul > li {
    margin-bottom: 24px;
    font-size: 14px;
  }
  .tips > ul > li:last-child,
  .about > ul > li:last-child {
    margin-bottom: 0;
  }
  .tips > ul > li > router-link,
  .about > ul > li > router-link {
    text-decoration: none;
  }
  .footerMain {
    padding-top: 15px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  .footerMain > .ones {
    // margin-right: 90px;
    width: 33.3%;
    display: flex;
    justify-content: space-between;
  }
  .footerMain > li:last-child {
    margin-right: 0;
  }
  .QRcode > div {
    margin-top: 10px;
  }
  .QRcode p {
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
}
.mt40 {
  margin-top: 40px;
}
</style>
