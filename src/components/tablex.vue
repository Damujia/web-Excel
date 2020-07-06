<template>
  <div class="tablex">
    <table ref="table" class="tabledemo">
      <tr v-for="(val, index) in form" :key="index">
        <td v-for="(tdval) in val.child" :colspan="tdval.colspan" :rowspan="tdval.rowspan" v-show="tdval.show" :id="tdval.id" :key="tdval.id">{{tdval.name}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: [
        /* {
          id: 1,
          child: [
            {
              name: 'a',
              id: 1
            }
          ]
        } */
      ]
    }
  },
  mounted () {
    this.setform()
    this.mergedsdSpan()
  },
  methods: {
    setform () {
      for (let i = 0; i < 20; i++) {
        this.form.push(
          {
            id: i,
            child: []
          }
        )
        for (let j = 0; j < 30; j++) {
          this.form[i].child.push({
            name: i + '-' + j,
            id: 'row' + i + '-' + 'col' + j,
            row: i,
            col: j,
            show: true,
            colspan: '',
            rowspan: ''
          })
        }
      }
    },
    // 合并
    mergedsdSpan () {
      let tdspan = [{ row: 0, col: 2, rowspan: 3, colspan: 3 }, { row: 4, col: 7, rowspan: 2, colspan: 3 }]
      tdspan.forEach(t => {
        this.form.forEach(e => {
          if (e.id === t.row) {
            e.child.forEach(i => {
              if (i.id === 'row' + t.row + '-' + 'col' + t.col) {
                i.colspan = t.colspan
                i.rowspan = t.rowspan
              }
            })
          }
          e.child.forEach(r => {
            for (let a = 0; a < t.rowspan; a++) {
              if (a > 0) {
                for (let j = 0; j < t.colspan; j++) {
                  if (r.id === 'row' + (t.row + a) + '-' + 'col' + (t.col + j)) {
                    r.show = false
                  }
                }
              } else {
                for (let j = 1; j < t.colspan; j++) {
                  if (r.id === 'row' + (t.row + a) + '-' + 'col' + (t.col + j)) {
                    r.show = false
                  }
                }
              }
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tablex {
  table {
    td {
      border: 1px solid black;
      height: 30px;
      width: 100px;
      text-align: center;
      vertical-align: middle;
    }
  }
}
</style>
