<template>
  <a-table :columns="columns" :dataSource="data" @change="onChange"/>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe'
  }, {
    text: 'Jim',
    value: 'Jim'
  }, {
    text: 'cer',
    value: 'cer'
  }],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length
}, {
  title: 'Sort',
  dataIndex: 'sort',
  filters: [{
    text: 'cer',
    value: 'cer'
  }, {
    text: 'other',
    value: 'other'
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.sort.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length
}, {
  title: 'Age',
  dataIndex: 'age',
  sorter: (a, b) => a.age - b.age
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London'
  }, {
    text: 'New York',
    value: 'New York'
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.address.indexOf(value) === 0,
  sorter: (a, b) => a.address.length - b.address.length
}]

const data = [{
  key: '1',
  name: 'John Brown',
  sort: 'cer',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'cer Green',
  sort: '证件',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Joe Black',
  sort: 'cer id',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Jim Red',
  sort: '证件',
  age: 32,
  address: 'London No. 2 Lake Park'
}]

function onChange (pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter)
}

export default {
  data () {
    return {
      data,
      columns
    }
  },
  methods: {
    onChange
  }
}
</script>
