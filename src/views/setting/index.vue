<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{user.id}}</el-form-item>
            <el-form-item label="手机：">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="user.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="updateUserPhoto"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      // 提交的用户信息
      user: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 修改个人头像  ({file:'文件对象'}) ==> ({file}) 解构传参对象
    async updateUserPhoto ({ file }) {
      try {
        // 自定义上传图片
        // 选择了图片后 触发
        // 得到 文件对象
        const formdata = new FormData()
        // 追加文件对象  对象的key必须和接口需求一样
        formdata.append('photo', file)
        // 通过axios提交数据
        const { data: { data } } = await this.$http.patch('user/photo', formdata)
        this.$message.success('修改头像成功')
        // 预览
        this.user.photo = data.photo
        // 把头像地址传递到home组件
        eventBus.$emit('updateUserPhoto', data.photo)
      } catch (e) {
        this.$message.error('修改头像失败')
      }
    },
    // 获取个人资料
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.user = data
    },
    // 修改个人资料
    async updateUserInfo () {
      try {
        // 后台接口接收 三个数据 不能是 user 包含更多数据
        const { name, intro, email } = this.user
        await this.$http.patch('user/profile', { name, intro, email })
        this.$message.success('保存个人信息成功')
        // 更新HOME组件的用户名称
        eventBus.$emit('updateUserName', name)
      } catch (e) {
        this.$message.erro('保存个人信息失败')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
