<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="form.content" :height="400" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        content: `<p style="text-align: center;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&amp;fm=26&amp;gp=0.jpg" alt="" width="400" height="476" /><strong>dgodjojoj</strong></p>
<p style="text-align: center;"><span style="color: #00ff00;">规范化的</span></p>
<p style="text-align: center;"><span style="color: #00ff00;">风格化风格化</span></p>
<p style="text-align: center;"><span style="color: #00ff00;">风格化风格化<img src="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/plugins/emoticons/img/smiley-embarassed.gif" alt="embarassed" /><span style="color: #00ff00;"><img src="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/plugins/emoticons/img/smiley-smile.gif" alt="smile" /></span></span></p>
<p style="text-align: center;"><span style="color: #00ff00;">符合规范规划</span></p>
<p style="text-align: center;">&nbsp;</p> `
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form.content, 9999);
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
