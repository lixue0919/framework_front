<template>
  <div id="roleList">
    <div id="tableView" v-loading="this.loading" element-loading-text="加载中">
			<el-row>
        <el-form label-width="75px" :inline="true" class="el-form demo-form-inline" v-model="searchForm">
          <el-row>
            <el-col :span="8" class="searchInline">
              <label class="el-form-item__label searchLabel">角色名称</label>
              <el-input size="small" v-model="searchForm.rolename" placeholder="角色名称" clearable></el-input>
            </el-col>
            <el-col :span="8" class="searchInline">
              <label class="el-form-item__label searchLabel">角色描述</label>
              <el-input size="small" v-model="searchForm.roleinfo" placeholder="角色描述" clearable></el-input>
            </el-col>
            <el-col :span="8" class="searchInline">
              <label class="el-form-item__label searchLabel">创建时间</label>
              <el-date-picker type="daterange" format="yyyy/MM/dd" value-format="yyyy/MM/dd" size="small" v-model="searchForm.createTime"
                  range-separator="~" placeholder="创建时间" start-placeholder="开始日期" end-placeholder="结束日期"
                  class="searchDatePicker">
              </el-date-picker>
            </el-col>                               
          </el-row>
          <div>
            <el-form>
              <el-col :span="12" class="btnEditDelete">
                <el-form-item align="left">
                  <el-button v-if="hasPermission('system/role:add')" type="success" icon="el-icon-plus" size="small" @click="addClick">新增</el-button>
                  <el-button v-if="hasPermission('system/role:delete')" type="danger" icon="el-icon-delete" size="small" @click="removeSelection">删除</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12"></el-col>
              <el-col :span="12" class="btnSearchPlus">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" size="small" @click="searchClick">查询</el-button>
                  <el-button type="clear" icon="el-icon-refresh" size="small" @click="clearClick">重置</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-form>
      </el-row>
			<div class="table_container">
				<el-table class="tableStyle" border id="table" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" @selection-change="selectionChange"
          :height="tableheight" :row-style="rowStyle">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column type="index" show-overflow-tooltip label="序号" width="65" align="center"></el-table-column>
          <el-table-column prop="rolename" show-overflow-tooltip label="角色名称" min-width="14%" align="center"></el-table-column>
          <el-table-column prop="roleinfo" show-overflow-tooltip label="角色描述" min-width="12%" align="center"></el-table-column>
          <el-table-column prop="createName" show-overflow-tooltip label="创建人" min-width="11%" align="center"></el-table-column>
          <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" min-width="13%" align="center" :formatter="tableDateFormat"></el-table-column>
          <el-table-column prop="alterName" show-overflow-tooltip label="修改人" min-width="11%" align="center"></el-table-column>
          <el-table-column prop="alterTime" show-overflow-tooltip label="修改时间" min-width="13%" align="center" :formatter="tableDateFormat"></el-table-column>
          <el-table-column prop="resource" show-overflow-tooltip label="资源" min-width="10%" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="resourceDetails(scope.row.roleid)">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="65" align="center" v-if="hasPermission('system/role:edit')">
            <template slot-scope="scope">
              <el-button type="text" @click="editClick(scope.row, scope.$index)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--翻页组件-->
        <el-row type="flex" justify="end">
          <paginator></paginator>
        </el-row>
			</div>

			<!--资源详情界面-->
      <el-dialog title="角色资源列表" :visible.sync="resourceVisible" @close="closeResourceDialog()" :close-on-click-modal="false">
        <el-tree :data="resourceList" node-key="resourceid" :props="defaultProps"></el-tree>
      </el-dialog>
      
      <!-- 编辑-->
      <el-dialog :title="dialogTitle" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <div v-show="false" v-once v-model="rolenameOld"></div>
          <el-row>
            <el-col :span="11">
              <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="editForm.rolename" auto-complete="off" placeholder="角色名称" size="small" maxlength="20" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="角色描述" prop="roleinfo">
                <el-input v-model="editForm.roleinfo" auto-complete="off" placeholder="角色描述" size="small" maxlength="100" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="资源列表">
                <el-tree :props="defaultProps" :data="allResourceList" node-key="resourceid" ref="tree" highlight-current :default-expanded-keys="defaultKeys"
                    :default-checked-keys="defaultCheckKeys" show-checkbox size="small" style="margin-top: 5px;">
                </el-tree>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>
          <el-row class="buttonSubmit">
            <el-button type="clear" icon="el-icon-close" size="small" class="btn_submit" @click="closeDialog(editForm)"> 取消</el-button>
            <el-button type="success" icon="el-icon-check" size="small" class="btn_save" @click="editSubmit(editForm)">保存</el-button>
          </el-row>
        </el-form>
      </el-dialog>
		</div>
  </div>
</template>
<script>
//引入翻页 paginator
import paginator from '@/components/paginator'
export default {
  components: {
    paginator
  },
  data() {
    return {
      //当前登陆用户
      currentUser: this.CONSTANT.currentUser,
      //搜索表单
      searchForm: {
        rolename: '',
        roleinfo: '',
        createTime: new Array()
      },
      //表数据
      tableData: [],
      //table高度
      tableheight: this.CONSTANT.tableheight10,
      
      //后台返回全部资源列表
      allResourceList: [],
      defaultKeys: ['17'],
      //显示加载中样
      loading: false,
      labelPosition: "right",
      //多选值
      multipleSelection: [],
      //当前页
      currentPage: 1,
      //分页大小
      pageSize: 10,
      //总记录数
      total: 0,
      //资源列表是否显示
      resourceVisible: false,
      //修改界面是否显示
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { pattern: /^[0-9A-Za-z-_]{2,30}$/, message: '角色名应为2-30位字母、数字、字符-_', trigger: 'blur' },
        ],
        roleinfo: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
      },
      //修改界面数据
      editForm: {
        rolename: "",
        roleinfo: "",
        resource: []
      },
      //树状选中状态
      defaultCheckKeys: [],

      //树结构配置
      defaultProps: {
        children: 'children',
        label: 'resourceinfo'
      },

      //角色对应资源
      resourceList: [],

      //新修改页面的复选树
      checkprops: {
        label: 'name',
        children: 'zones'
      },
      //登陆用户名-旧
      rolenameOld: "",
      //Dialog Title
      dialogTitle: "角色编辑",
      //选中的序号
      editIndex: -1,
    };
  },
  created: function() {
    this.searchClick("click");
  },
  methods: {
    //表格查询事件
    searchClick: function(type) {
      let vm = this;
      //按钮事件的选择
      if(type == 'page'){
        this.tableData = [];
      }else{
        this.currentPage = 1;
      }
      this.loading = true;//表格重新加载
      var params = {
        rolename: this.searchForm.rolename.replace(/%/g,"\\%"),
        roleinfo: this.searchForm.roleinfo.replace(/%/g,"\\%"),
        createTimeBegin: this.searchForm.createTime[0],
        createTimeEnd: this.searchForm.createTime[1],
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      vm.$axios.post('/role/findByVO', params).then(function (res) {
        this.tableData = res.data.result;
        this.total = res.data.result.length;
        this.loading = false;
      }.bind(this), function (error) {
          console.log(error)
      })
    },

    //获取所有资源列表
    getAllResources: function () {
      let vm = this;
      vm.$axios.get('/resource/getAll').then(function (res) {
        vm.allResourceList = res.data.result;
      }.bind(this), function (error) {
        console.log(error);
      })
    },
    
    //资源详情
    resourceDetails: function (id) {
      var vm = this;
      vm.resourceVisible = true;
      vm.$axios.get('/resource/getResource/' + id).then(function (res) {
        vm.resourceList = res.data.result;
      }.bind(this), function (error) {
          console.log(error)
      })
    },

    //清空查询条件
    clearClick: function() {
      this.searchForm.rolename = "",
      this.searchForm.roleinfo = "",
      this.searchForm.createTime = new Array(),
      this.searchClick('reset');
    },

    //表格勾选事件
    selectionChange: function(val) {
      this.multipleSelection = val;
    },
   
    //新增事件
    addClick: function() {
      this.dialogTitle = "角色新增";
      this.getAllResources();
      //清空edit表单
      this.defaultCheckKeys = [];
      if (this.$refs["editForm"] !== undefined) {
        this.$refs["editForm"].resetFields();
      }
      this.editFormVisible = true;
    },

    //表格修改事件
    editClick: function(val, index) {
      let vm = this;
      vm.editIndex = index;
      vm.dialogTitle = "角色编辑";
      var roleid = val.roleid;
      vm.$axios.get('/resource/getChildren/' + roleid).then(function (res) {
          vm.defaultCheckKeys = res.data.result;
          vm.getAllResources();
          var params = {
            roleid: roleid
          };
          vm.$axios.post('/role/findByVO', params).then(function (res) {
            vm.editForm = res.data.result[0];
            //保存当前用户名rolename
            vm.rolenameOld = this.editForm.rolename;
          }.bind(this), function (error) {
            console.log(error)
          })
          vm.editFormVisible = true;
      }.bind(this), function (error) {
        console.log(error)
      })
    },

    //编辑提交点击事件
    editSubmit: function(val) {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          let vm = this;
          val.resource = vm.$refs.tree.getCheckedNodes();
          var params = {
            rolename: val.rolename,
            roleinfo: val.roleinfo,
            resources: val.resource
          };
          if (vm.dialogTitle == "角色新增") {
            params.createId = vm.currentUser.userid;
            params.createName = vm.currentUser.username;
            vm.$axios.get('/role/getNum/' + vm.editForm.rolename).then(function(res){
            if(res.data.result != 0){
              vm.$message({
                message: "角色名已存在",
                type: "error"
              });
            }else{
              vm.$axios.post('/role/insertByVO', params).then(function (res) {
                res.data.result.createTime = new Date();
                vm.tableData.unshift(res.data.result);
                vm.total = this.tableData.length;
              }.bind(this), function (error) {
                  console.log(error)
              })
              vm.editFormVisible = false;
            }
            }.bind(this),function(error){
              console.log(error)
            })
          } else if(this.dialogTitle == "角色编辑") {
            params.roleid = val.roleid;
            params.alterId = this.currentUser.userid;
            params.alterName = this.currentUser.username;
            if (vm.editForm.rolename == this.rolenameOld) {
              vm.editSubmitUpdateDB(params);
            } else {
              vm.$axios.get('/role/getNum/' + this.editForm.rolename).then(function(res){
                if(res.data.result != 0){
                  vm.$message({
                    message: "角色名已存在",
                    type: "error"
                  });
                }else{
                  vm.editSubmitUpdateDB(params);
                }
              }.bind(this),function(error){
                console.log(error)
              })
            }
          }
        } else {
          console.log('error save!!');
          return false;
        }
      });
    },

    //修改方法-update数据库  by li.xue 2018/11/22 15:46
    editSubmitUpdateDB: function(params) {
      let vm = this;
      vm.$axios.post('/role/updateByVO', params).then(function (res) {
        var result = res.data.result;
        this.tableData[vm.editIndex].rolename = result.rolename;
        this.tableData[vm.editIndex].roleinfo = result.roleinfo;
        this.tableData[vm.editIndex].alterName = result.alterName;
        this.tableData[vm.editIndex].alterTime = new Date();
        this.tableData[vm.editIndex].resources = result.resource;
        this.editFormVisible = false;
      }.bind(this), function (error) {
        console.log(error)
      })
    },

    //删除所选，批量删除
    removeSelection: function() {
      let vm = this;
      if (vm.multipleSelection.length < 1) {
        vm.$message({
          message: "请至少选中一条记录",
          type: "warning"
        });
        return;
      }
      vm.$confirm('确认删除选中信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$axios.post('/role/deleteByList', vm.multipleSelection).then(function (res) {
          vm.$message({
            message: "成功删除" + res.data.result + "条用户信息",
            showClose: true,
            onClose: vm.searchClick('delete')
          });
        }.bind(this), function (error) {
            console.log(error)
        })
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //关闭Dialog
    closeDialog: function(val) {
      this.editFormVisible = false;
      this.defaultCheckKeys = [];
      if (this.$refs["editForm"] !== undefined) {
        this.$refs["editForm"].resetFields();
      }
    },

    //关闭资源详情Dialog
    closeResourceDialog: function () {
      this.resourceVisible = false;
    }
  }
};
</script>

