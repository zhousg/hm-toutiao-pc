<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件预留位置 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="editArticle()">修改</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="addArticle(false)">发表</el-button>
          <el-button @click="addArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本相关资源
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 收集文章数据
      articleForm: {
        // 标题
        title: null,
        // 封面
        cover: {
          type: 1,
          images: []
        },
        // 频道ID
        channel_id: null,
        // 内容
        content: null
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    this.resetData()
  },
  watch: {
    // 监听到 地址栏ID 数据的变化
    '$route.query.id' () {
      this.resetData()
    }
  },
  methods: {
    // 重置数据(根据是否有ID来给表单赋值数据)
    resetData () {
      if (this.$route.query.id) {
        // 编辑  获取当前文章数据
        this.getArticle()
      } else {
        // 发布
        this.articleForm = {
        // 标题
          title: null,
          // 封面
          cover: {
            type: 1,
            images: []
          },
          // 频道ID
          channel_id: null,
          // 内容
          content: null
        }
      }
    },
    // 获取 文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.$route.query.id}`)
      this.articleForm = data
    },
    // 添加 draft 值为true是草稿false是发表
    async addArticle (draft) {
      try {
        await this.$http.post(`articles?draft=${draft}`, this.articleForm)
        this.$message.success(draft ? '存入草稿成功' : '发表成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 修改
    async editArticle () {
      try {
        await this.$http.put(`articles/${this.$route.query.id}?draft=false`, this.articleForm)
        this.$message.success('修改成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
