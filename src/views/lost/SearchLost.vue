<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-row :gutter="16">
      <a-col :span="7">
        <label for="lostplace"><b>丢失地点: </b></label>
        <a-select id="lostplace" defaultValue="华山区" style="width: 100px" @change="placeChange">
          <a-select-option value="泰山区">泰山区</a-select-option>
          <a-select-option value="华山区">华山区</a-select-option>
          <a-select-option value="启林区">启林区</a-select-option>
          <a-select-option value="其他">其他</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <label for="lsotsort"><b>失物类别: </b></label>
        <a-select id="lostsort" defaultValue="证件" style="width: 100px" @change="sortChange">
          <a-select-option value="证件">证件</a-select-option>
          <a-select-option value="财物">财物</a-select-option>
          <a-select-option value="书本">书本</a-select-option>
          <a-select-option value="其他">其他</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <label for="lostplace"><b>当前状态: </b></label>
        <a-select id="loststatus" defaultValue="寻找中" style="width: 100px" @change="statusChange">
          <a-select-option value="寻找中">寻找中</a-select-option>
          <a-select-option value="已找到">已找到</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="handleSearch">查询</a-button>
      </a-col>
    </a-row>
    <div>______________________________________________________________________________________________________________________________________________________________</div>
    <a-list
      itemLayout="vertical"
      size="small"
      :pagination="pagination"
      :dataSource="listData"
    >
      <a-list-item slot="renderItem" slot-scope="item" key="item.lostformid">
        <img slot="extra" width="150" alt="logo" :src="item.picture"/>
        <a-list-item-meta
          :description="item.status"
          :title="item.title"
        >
        </a-list-item-meta>
        <div>
          <div>
            <span>发布时间：{{ item.publictime }}</span>
          </div>
          <b>{{ item.description }}</b>
          <div>丢失时间：{{ item.losttime }}</div>
          <div>丢失地点：{{ item.place }}</div>
          <div>失物类别：{{ item.sort }}</div>
          <div>编号：{{ item.lostformid }}</div>
        </div>
        <template slot="actions"><a-popconfirm
          title="确定留言?"
          @confirm="() => onSendMsg(item.lostformid)">
          <a href="#">留言</a>
        </a-popconfirm>
        </template>
        <div v-if="item.visible">
          <a-textarea
            v-model="item.textareaMsg"
            placeholder="请留下你的手机号码等信息，已便发布者联系你！"
            :rows="4">
          </a-textarea>
          <a-popconfirm
            title="确定留言?"
            @confirm="() => handleSure (item.lostformid)">
            <a-button>确定</a-button>
          </a-popconfirm>
          <a-button @click="handleCancel(item.lostformid)">取消</a-button>
        </div>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script>
import store from '@/store'

export default {
  name: 'SearchFound',
  data () {
    return {
      listData: [],
      selectplace: '华山区',
      selectsort: '证件',
      selectstatus: '寻找中',
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 5
      }
    }
  },
  mounted: function () {
    console.log('拉取失物招领')
    const params = { type: 'alllostform' }
    this.axios.get('getlostform', { params }).then((res) => {
      const ld = res
      for (let i = 0; i < ld.length; i++) {
        ld[i].visible = false
        ld[i].textareaMsg = ''
      }
      this.listData = ld
      console.log(this.listData)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    deleteLostForm (e) {

    },
    placeChange (value) {
      this.selectplace = value
      console.log('拾取地点：' + this.selectplace)
    },
    sortChange (value) {
      this.selectsort = value
      console.log(`selected ${value}`)
      console.log('失物类别' + this.selectsort)
    },
    statusChange (value) {
      this.selectstatus = value
      console.log('current :当前状态-' + this.selectstatus)
    },
    handleSearch () {
      const params = {
        place: this.selectplace,
        sort: this.selectsort,
        status: this.selectstatus,
        type: 'search'
      }
      console.log(params)
      this.axios.get('getlostform', { params }).then((res) => {
        const ld = res
        for (let i = 0; i < ld.length; i++) {
          ld[i].visible = false
          ld[i].textareaMsg = ''
        }
        this.listData = ld
        console.log(this.listData)
      }).catch((err) => {
        console.log('searchlostform' + err)
      })
    },
    onSendMsg (id) {
      const oj = this.listData.find(oj => oj.lostformid === id)
      const idx = this.listData.indexOf(oj)
      this.listData[idx].visible = true
      console.log('数组下标' + idx)
      console.log(this.listData[idx])
    },
    handleSure (id, index) {
      const oj = this.listData.find(oj => oj.lostformid === id)
      const idx = this.listData.indexOf(oj)
      const value = {
        receiveid: this.listData[idx].publicid,
        sendid: store.getters.userID,
        msg: this.listData[idx].textareaMsg
      }
      console.log(value)
      this.axios.post('/sendMsg', value).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
      const title = '成功发送至：' + this.listData[idx].publicid
      const description = this.listData[idx].textareaMsg
      this.openNotification(title, description)
    },
    openNotification (title, description) {
      this.$notification.open({
        message: title,
        description: description,
        onClick: () => {
          console.log('Notification Clicked!')
        }
      })
    },
    handleCancel (id) {
      const oj = this.listData.find(oj => oj.lostformid === id)
      const idx = this.listData.indexOf(oj)
      this.listData[idx].textareaMsg = ''
      this.listData[idx].visible = false
    }
  }
}
</script>
<style>

</style>
