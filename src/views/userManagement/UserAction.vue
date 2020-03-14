<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button
        type="primary"
        @click="start"
        :disabled="!hasSelected"
        :loading="loading"
      >
        注销
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" >
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="data.length"
          title="确定重置密码?"
          @confirm="() => onReset(record.key)">
          <a href="#"> 密码重置</a>
        </a-popconfirm>
      </template>
      <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class="custom-filter-dropdown">
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`输入${column.title}`"
          :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm)"
          style="width: 188px; margin-bottom: 8px; display: block;"
        />
        <a-button
          type="primary"
          @click="() => handleSearch(selectedKeys, confirm)"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
        >查找</a-button>
        <a-button
          @click="() => handleReset(clearFilters)"
          size="small"
          style="width: 90px"
        >重置</a-button>
      </div>
      <a-icon slot="filterIcon" slot-scope="filtered" type="search" :style="{ color: filtered ? '#108ee9' : undefined }" />
      <template slot="customRender" slot-scope="text">
        <span v-if="searchText">
          <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>{{ text }}</template>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  scopedSlots: {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'customRender'
  },
  onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => {
        this.searchInput.focus()
      }, 0)
    }
  }
}, {
  title: '账号（学号）',
  dataIndex: 'userID',
  key: 'userID',
  scopedSlots: {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'customRender'
  },
  onFilter: (value, record) => record.userID.toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => {
        this.searchInput.focus()
      }, 0)
    }
  }
}, {
  title: '专业班级',
  dataIndex: 'profession',
  key: 'profession',
  scopedSlots: {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'customRender'
  },
  onFilter: (value, record) => record.profession.toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => {
        this.searchInput.focus()
      }, 0)
    }
  }
}, {
  title: '联系电话',
  dataIndex: 'phone'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  data () {
    return {
      data: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      searchText: '',
      searchInput: null
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  mounted: function () {
    console.log('拉取学生用户列表')
    const params = { type: 'allstudent' }
    this.axios.get('/getstudent', { params }).then((res) => {
      const ld = res
      for (let i = 0; i < ld.length; i++) {
        ld[i].key = i
      }
      this.data = ld
      console.log(this.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    start () {
      this.loading = true
      // ajax request after empty completing
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        const key = this.selectedRowKeys[i]
        const oj = this.data.find(oj => oj.key === key)
        console.log(oj)
        const index = this.data.indexOf(oj)
        console.log(index)
        this.data.splice(index, 1)
        const value = {
          userID: oj.userID,
          type: 'delete'
        }
        this.axios.post('poststudent', value).then((res) => {
          console(res)
        }).catch((err) => {
          console.log(err)
        })
      }
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onReset (key) {
      const oj = this.data.find(oj => oj.key === key)
      const value = {
        userID: oj.userID,
        type: 'update'
      }
      this.axios.post('poststudent', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
      const title = '用户：' + oj.userID
      this.openNotification(title, '密码重置成功！')
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
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  }
}
</script>

<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
