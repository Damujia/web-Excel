<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <!-- 这里用v-for动态生成 -->
        <el-menu
          :collapse="show"
          default-active="2"
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#2f2f2f"
          text-color="#fff"
          active-text-color="#fff"
        >
          <el-submenu
            :index="value.id + ''"
            class="app2"
            v-for="value in Menurouting"
            :key="value.id"
          >
            <!-- 主菜单 -->
            <template slot="title">
              <i
                :class="'iconfont ' + value.icon"
                style="margin-right: 10px;"
              ></i>
              <span>{{ value.authName }}</span>
            </template>
            <!-- 子菜单 -->
            <el-menu-item
              :index="'/home/' + getval.path"
              v-for="getval in value.children"
              :key="getval.id"
            >
              <template slot="title">
                <i
                  :class="'iconfont ' + getval.icon"
                  style="margin-right: 10px;"
                ></i>
                <span>{{ getval.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button
            type="info"
            plain
            @click="show = !show"
            :icon="!show ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            style="font-size: 20px;padding: 5px;"
          ></el-button>
          <div style="display: flex;">
            <div class="flush">
              <el-button
                type="info"
                size="small"
                :loading="flushdemo"
                @click="flushbtn"
                plain
                >{{ flushText }}</el-button
              >
            </div>
            <div
              class="usernaem"
              style="display:flex;align-items: center;color: #fff;"
            >
              <i style="margin-right:5px;" class="iconfont icon-yonghu"></i>
              <span>{{ userNamelog }}</span>
            </div>
            <div class="drop_out" @click="dorp">退出</div>
          </div>
        </el-header>
        <el-main style="background-color: #f3f3f3;">
          <router-view v-if="isRouter"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  provide () {
    return { reloads: this.reloads }
  },
  data () {
    return {
      isRouter: true,
      flushdemo: false,
      flushText: '刷新',
      show: false,
      userNamelog: '',
      Menurouting: []
    }
  },
  methods: {
    flushbtn () {
      this.reload()
    },
    reload () {
      this.flushdemo = true
      this.flushText = '加载中'
      this.isRouter = false // 先关闭，
      // DOM更新
      this.$nextTick(function () {
        this.isRouter = true // 再打开
        this.flushdemo = false
        this.flushText = '刷新'
      })
    },
    dorp () {
    },
    reloads () {
      this.isRouter = false
      this.$nextTick(function () {
        this.isRouter = true
      })
    }
  },
  mounted () {
    // 权限判断
  }
}
</script>

<style lang="less" scoped>
.home {
  .flush {
    // height: 65px;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  height: 100%;
  .drop_out {
    color: #fff;
    cursor: pointer;
    height: 100%;
    padding: 0 20px;
    line-height: 60px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .el-submenu .el-menu-item {
    background-color: #666 !important;
  }
  .el-menu {
    width: auto;
  }
  .el-menu-item.is-active {
    background-color: #4298f5 !important;
  }
  // 如果是展开状态,那么宽度就是200px,如果是合并状态,宽度:auto
  .el-menu:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
    overflow-x: hidden;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #2f2f2f;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2f2f2f;
  }
  .logo {
    height: 60px;
    background: url(../assets/login/ser.png) 50% no-repeat;
    background-size: cover;
    background-color: #2f2f2f;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    height: 60px;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
