<template>
  <div class="demo" v-if="td">
    <div class="butt">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-button type="success" icon="el-icon-download" circle @click="uploadFile"></el-button>
            <el-button @click="savebtn" type="success" plain>保存</el-button>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple" style="display:flex;flex-direction: column;justify-content: center;">
            <el-row>
              <el-col :span="2">
                <div class="grid-content bg-purple fontSize">
                  <el-link class="iconfont icon-hebingdanyuange" @click="joinbtn"></el-link>
                  <el-link icon="iconfont icon-chaifen" @click="splitbtn"></el-link>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <!-- 撤销 -->
                  <el-link icon="iconfont icon-chexiao" @click="backout"></el-link>
                  <!-- 恢复 -->
                  <el-link icon="iconfont icon-shujuhuifu" @click="recover"></el-link>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <el-link icon="iconfont icon-icon--"></el-link>
                  <!-- 居中 -->
                  <el-link icon="iconfont icon-juzhong" @click="htCenter"></el-link>
                  <el-link icon="iconfont icon-youduiqi"></el-link>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <el-link icon="iconfont icon-zhongzhi" @click="clearbtn"></el-link>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple"></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div style="border-top: 1px solid black;" class="daofrom">
        <div style="display: flex;">
          <div class="dao_dmeo">
            <div @click="daobtns">
              <span class="el-icon-plus"></span>导入表格
            </div>
            <input id="file" type="file" accept=".xlsx, .xls" @change="onImportExcel" />
          </div>
          <el-button type="info" icon="el-icon-document-copy" circle @click="loradxlsx"></el-button>
        </div>
        <el-link icon="el-icon-edit" @click="updateData">编辑</el-link>
      </div>
    </div>
    <div class="demo_table" v-if="tabledemo">
      <hot-table id="toTable" ref="toHand" :settings="hotSettings"></hot-table>
    </div>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import '../../node_modules/handsontable/dist/handsontable.full.css'
import 'handsontable/languages/zh-CN'
import XLSX from 'xlsx'
// import axios from 'axios'
// import Handsontable from 'handsontable'
export default {
  name: 'index',
  inject: ['reloads'],
  data () {
    return {
      tabledemo: true,
      getExcel: [],
      td: true,
      // 选中单元格行列
      ranks: {
        startRow: '', startColumn: '', endRow: '', endColumn: ''
      },
      hot: '',
      // 存放的数据
      cacheFrom: {
        merge: [],
        data: [],
        size: {
          width: [],
          height: []
        }
      },
      hotSettings: {
        language: 'zh-CN',
        data:
          [
            []
          ],
        minRows: 30,
        minCols: 30,
        rowHeaders: true, // 行头
        colHeaders: true, // 列头
        autoColumnSize: true,
        colWidths: '70px', // 列宽
        rowHeights: '20px', // 行高
        manualColumnMove: true, // 拖动列
        manualRowMove: true, // 拖动行
        mergeCells: [], // 合并
        cell: [],
        customBorders: true, // 边框
        className: 'htCenter htMiddle', // 居中
        contextMenu: {
          items: {
            'attr': { // Own custom option
              name: '属性',
              submenu: {
                // Custom option with submenu of items
                items: [
                  {
                    // Key must be in the form "parent_key:child_key"
                    key: 'attr:title',
                    name: '表头',
                    callback: function (key, selection, clickEvent) {
                      console.log(selection)
                      setTimeout(function () {

                      }, 0)
                    }
                  },
                  { key: 'data', name: '数据' }
                ]
              }
            },
            'mergeCells': {
              name: '合并'
            },
            'alignment': {
              name: '对齐'
            },
            'row_above': {
              name: '上方插入一行'
            },
            'row_below': {
              name: '下方插入一行'
            },
            'col_left': {
              name: '左方插入一列'
            },
            'col_right': {
              name: '右方插入一列'
            },
            '---------': {},
            'remove_row': {
              name: '移除改行'
            },
            'rrmove_col': {
              name: '移除该列'
            },
            'make_read_only': {
              name: '只读'
            },
            'cut': {
              name: '剪切'
            },
            'copy': {
              name: '复制'
            },
            'borders': {
              name: '边框'
            }

          }
        }, // 右键菜单

        manualColumnResize: true,
        manualRowResize: true,
        comments: true,
        afterChange: (changes, source) => {
          // 单元格事件， 四个参数（行，列，oldvalue, newvalue）
        },
        afterMergeCells: (cellRange, mergeParent) => {
          // 合并单元格触发，返回mergeCells值，
          this.cacheFrom.merge.push(mergeParent)
        },
        // 取消合并触发
        beforeUnmergeCells: (cellRange) => {
          let callmerge = {
            row: cellRange.highlight.row,
            col: cellRange.highlight.col,
            rowspan: cellRange.to.row - cellRange.highlight.row + 1,
            colspan: cellRange.to.col - cellRange.highlight.col + 1
          }
          for (let i = 0; i < this.cacheFrom.merge.length; i++) {
            if (this.cacheFrom.merge[i].row === callmerge.row && this.cacheFrom.merge[i].col === callmerge.col && this.cacheFrom.merge[i].rowspan === callmerge.rowspan && this.cacheFrom.merge[i].colspan === callmerge.colspan) {
              this.cacheFrom.merge.splice(i, 1)
            }
          }
        },
        beforeMergeCells: (cellRange) => {
        },
        afterSelection: (row, column, row2, column2) => {
          if (row >= row2) {
            this.ranks.startRow = row2
            this.ranks.endRow = row
          } else if (row <= row2) {
            this.ranks.startRow = row
            this.ranks.endRow = row2
          }
          if (column >= column2) {
            this.ranks.startColumn = column2
            this.ranks.endColumn = column
          } else if (column <= column2) {
            this.ranks.startColumn = column
            this.ranks.endColumn = column2
          }
        }
      }
    }
  },
  components: {
    HotTable
  },
  mounted () {
    this.hot = this.$refs.toHand.hotInstance
    if (JSON.parse(localStorage.getItem('cacheFrom')) != null) {
      this.hotSettings.data = JSON.parse(localStorage.getItem('cacheFrom')).data
      this.hotSettings.mergeCells = JSON.parse(localStorage.getItem('cacheFrom')).merge
      this.hotSettings.colWidths = JSON.parse(localStorage.getItem('cacheFrom')).size.width
      this.hotSettings.rowHeights = JSON.parse(localStorage.getItem('cacheFrom')).size.height
    }
  },
  methods: {
    // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
    sheet2blob (sheet, sheetName) {
      sheetName = sheetName || 'sheet1'
      var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      }
      workbook.Sheets[sheetName] = sheet
      // 生成excel的配置项
      var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      }
      var wbout = XLSX.write(workbook, wopts)
      var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
      // 字符串转ArrayBuffer
      function s2ab (s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      }
      return blob
    },
    openDownloadDialog (url, saveName) {
      if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url) // 创建blob地址
      }
      var aLink = document.createElement('a')
      aLink.href = url
      aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event
      if (window.MouseEvent) event = new MouseEvent('click')
      else {
        event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      }
      aLink.dispatchEvent(event)
    },
    // 导出数据
    loradxlsx () {
      let tab = document.querySelector('.htCore')
      let wb = XLSX.utils.table_to_book(tab)
      console.log(this.sheet2blob(wb))
      console.log(wb)
      this.openDownloadDialog(this.sheet2blob(wb.Sheets.Sheet1), '单元格合并示例.xlsx')
    },
    updateData () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let this_ = this
      var url = 'http://192.168.1.106:20529/lj20200529web/downFile?dealFileName=电阻电感分析.xlsx'
      /* set up async GET request */
      var req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.responseType = 'arraybuffer'
      req.onload = function (e) {
        try {
          var data = new Uint8Array(req.response)
          var workbook = XLSX.read(data, { type: 'array' })
          console.log(workbook)
          // 处理第一页数据
          const wsname1 = workbook.SheetNames[4]
          const ws1 = workbook.Sheets[wsname1]
          let result1 = XLSX.utils.sheet_to_json(ws1, { header: 1 })
          console.log(XLSX.utils.sheet_to_json(ws1))
          console.log(result1)
          this_.hotSettings.data = result1
          // 单元格合并
          this_.getExcel = workbook.Sheets[wsname1]['!merges']
          console.log(this_.getExcel)
          this_.hotSettings.mergeCells = []
          this_.getExcel.forEach(e => {
            this_.hotSettings.mergeCells.push({
              col: e.s.c,
              row: e.s.r,
              colspan: (e.e.c - e.s.c) === 0 ? 1 : e.e.c - e.s.c + 1,
              rowspan: (e.e.r - e.s.r) === 0 ? 1 : e.e.r - e.s.r + 1
            })
          })
          // 边框
          /* this_.hotSettings.customBorders = []
          for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 32; j++) {
              this_.hotSettings.customBorders.push({
                row: j,
                col: i,
                left: {
                  width: 1,
                  color: 'black'
                },
                right: {
                  width: 1,
                  color: 'black'
                },
                top: {
                  width: 1,
                  color: 'black'
                },
                bottom: {
                  width: 1,
                  color: 'black'
                }
              })
            }
          } */

          loading.close()
          // 存储获取到的数据
          // let data = []
          // 遍历每张工作表进行读取（这里默认只读取第一张表）
          for (const sheet in workbook.Sheets) {
            // esline-disable-next-line
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              // 利用 sheet_to_json 方法将 excel 转成 json 数据
              data = data.concat(
                XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              )
              // break; // 如果只取第一张表，就取消注释这行
            }
          }
          // 最终获取到并且格式化后的 json 数据
          // this.addshebei = data.map((item, i) => {
          //   return this.importers
          // })
          // this.$poin('success', '导入成功')

          document.getElementById('file').value = ''
        } catch (e) {
          // 这里可以抛出文件类型错误不正确的相关提示
          // this.$poin('error', '导入失败，网络或服务器错误')
        }

        /* DO SOMETHING WITH workbook HERE */
      }
      req.send()
      // this.tabledemo = false
      // this.$nextTick(function () {
      //   this.tabledemo = true // 再打开
      // })
      // axios.get('http://192.168.1.106:20529/lj20200529web/getTestExcelData')
      //   .then(res => {
      //     res.data.values.forEach(e => {
      //       if (e.xindex.length < 2) {
      //         e.xindex = (e.xindex).charCodeAt() - 65
      //       } else if (e.xindex.length === 2) {
      //         e.xindex = (e.xindex[1].charCodeAt() - 65) + ((e.xindex[0] - 64) * 25)
      //       }
      //       e.yindex -= 1
      //       this.hotSettings.data[e.yindex][e.xindex] = e.value
      //     })
      //     this.tabledemo = false
      //     this.$nextTick(function () {
      //       this.tabledemo = true // 再打开
      //     })
      //   })
      //   .catch(() => {

      //   })
    },
    daobtns () {

    },
    // 居中对齐
    htCenter () {
      let pitchtab = []
      for (let i = 0; i < this.ranks.endRow - this.ranks.startRow + 1; i++) {
        for (let j = 0; j < this.ranks.endColumn - this.ranks.startColumn + 1; i++) {
          pitchtab.push(
            {
              row: this.ranks.startRow + i,
              col: this.ranks.startRow + j,
              className: 'htCenter'
            }
          )
        }
      }
      console.log(pitchtab)
    },
    // 清空数据
    clearbtn () {
      this.hot.clear()
    },
    // 合并
    joinbtn () {
      this.hot.getPlugin('MergeCells').unmerge(this.ranks.startRow, this.ranks.startColumn, this.ranks.endRow, this.ranks.endColumn)
      this.hot.getPlugin('MergeCells').merge(this.ranks.startRow, this.ranks.startColumn, this.ranks.endRow, this.ranks.endColumn)
    },
    // 拆分
    splitbtn () {
      this.hot.getPlugin('MergeCells').unmerge(this.ranks.startRow, this.ranks.startColumn, this.ranks.endRow, this.ranks.endColumn)
    },
    // 撤回
    backout () {
      this.hot.undo()
    },
    // 恢复
    recover () {
      this.hot.redo()
    },

    // 导出文件
    uploadFile () {
      console.log(this.hotSettings.data)
      const container = this.$refs.toHand.hotInstance
      const hot = Object.assign(container, {
        data: this.datas, // 导出数据
        colHeaders: false,
        rowHeaders: false
      })

      const exportPlugin = hot.getPlugin('exportFile')
      console.log('exportPlugin', exportPlugin)
      exportPlugin.downloadFile('csv', {
        bom: 'UTF-8', // 允许您使用BOM签名导出数据。
        columnDelimiter: ',', // 允许您定义列分隔符。
        columnHeaders: false, // 允许使用列标题导出数据。
        exportHiddenColumns: true, // 允许您从隐藏列导出数据。
        exportHiddenRows: true, // 允许您从隐藏行导出数据
        fileExtension: 'csv', // 允许您定义文件扩展名。
        filename: '周排班基础信息[YYYY]-[MM]-[DD]', // 允许您定义文件名。
        mimeType: 'text/csv', // 允许您定义MIME类型。
        rowDelimiter: '\r\n', // 允许您定义行分隔符。
        rowHeaders: true // 允许您使用行标题导出数据。
      })
    },
    // 保存数据
    savebtn () {
      // 保存每个单元格的尺寸
      // this.hotSettings.rowHeights = []
      // this.hotSettings.colWidths = []
      // for (let j = 0; j < this.hotSettings.data.length; j++) {
      //   this.hotSettings.rowHeights.push(this.hot.getRowHeight(j))
      // }
      // for (let i = 0; i < this.hotSettings.data[0].length; i++) {
      //   this.hotSettings.colWidths.push(this.hot.getColWidth(i))
      // }
      this.cacheFrom.size.width = this.hotSettings.colWidths
      this.cacheFrom.size.height = this.hotSettings.rowHeights
      this.cacheFrom.data = this.hotSettings.data
      console.log(this.hotSettings.data)
      localStorage.setItem('cacheFrom', JSON.stringify(this.cacheFrom))
      this.tabledemo = false
      this.$nextTick(function () {
        this.tabledemo = true // 再打开
      })
    },
    onImportExcel (file) {
      const loading1 = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 获取上传的文件对象
      const { files } = file.target
      // 通过FileReader对象读取文件
      const fileReader = new FileReader()
      fileReader.onload = event => {
        try {
          const { result } = event.target
          // 以二进制流方式读取得到整份excel表格对象
          const workbook = XLSX.read(result, { type: 'binary' })
          console.log(workbook)
          // 处理第一页数据
          const wsname = workbook.SheetNames[0]
          const ws = workbook.Sheets[wsname]
          let result1 = XLSX.utils.sheet_to_json(ws, { header: 1 })
          this.hotSettings.data = result1

          this.getExcel = workbook.Sheets.Sheet1['!merges']
          this.hotSettings.mergeCells = []
          this.getExcel.forEach(e => {
            this.hotSettings.mergeCells.push({
              col: e.s.c,
              row: e.s.r,
              colspan: (e.e.c - e.s.c) === 0 ? 1 : e.e.c - e.s.c + 1,
              rowspan: (e.e.r - e.s.r) === 0 ? 1 : e.e.r - e.s.r + 1
            })
          })
          // this.hotSettings.customBorders = []
          // for (let i = 0; i < 22; i++) {
          //   for (let j = 0; j < 9; j++) {
          //     this.hotSettings.customBorders.push({
          //       row: j,
          //       col: i,
          //       left: {
          //         width: 1,
          //         color: 'black'
          //       },
          //       right: {
          //         width: 1,
          //         color: 'black'
          //       },
          //       top: {
          //         width: 1,
          //         color: 'black'
          //       },
          //       bottom: {
          //         width: 1,
          //         color: 'black'
          //       }
          //     })
          //   }
          // }

          // 存储获取到的数据
          let data = []
          // 遍历每张工作表进行读取（这里默认只读取第一张表）
          for (const sheet in workbook.Sheets) {
            // esline-disable-next-line
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              // 利用 sheet_to_json 方法将 excel 转成 json 数据
              data = data.concat(
                XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              )
              // break; // 如果只取第一张表，就取消注释这行
            }
          }
          // 最终获取到并且格式化后的 json 数据
          // this.addshebei = data.map((item, i) => {
          //   return this.importers
          // })
          // this.$poin('success', '导入成功')

          document.getElementById('file').value = ''
        } catch (e) {
          // 这里可以抛出文件类型错误不正确的相关提示
          // this.$poin('error', '导入失败，网络或服务器错误')
        }
      }
      loading1.close()
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>
<style lang="less">
.demo {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  .daofrom {
    display: flex;
    justify-content: space-between;
  }
  .butt {
    background-color: #fff;
    padding: 3px;
    margin-bottom: 10px;
    .fontSize {
      font-size: 20px;
    }
  }
  .demo_table {
    width: 100%;
    height: 85%;
    padding-bottom: 20px;
    overflow: hidden;
    table {
      font-size: 12px;
      font-family: "SimSun";
      tbody {
        > tr {
          &:nth-child(1) {
            > td {
              &:nth-child(2) {
                font-size: 25px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
}
#hot-display-license-info {
  display: none;
}
.dao_dmeo {
  background-color: #409eff;
  border-radius: 4px;
  width: 104px;
  overflow: hidden;
  display: flex;
  position: relative;
  height: 32px;
  margin-right: 10px;
  > input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    cursor: pointer;
  }
  > div {
    color: #fff;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
  }
}
</style>
