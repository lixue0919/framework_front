<template>
  <div id="codelistDetail">
    <div id="tableView" v-loading="this.loading" element-loading-text="加载中">
			<el-row>
        <el-form label-width="75px" :inline="true" class="el-form demo-form-inline">
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="9" class="searchInline">
              <label class="el-form-item__label searchLabel">代码值</label>
              <el-input size="small" v-model="searchForm.codeValue" placeholder="代码值" prefix-icon="el-icon-search" clearable></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9" class="searchInline">
              <label class="el-form-item__label searchLabel">代码名称</label>
              <el-input size="small" v-model="searchForm.codeName" placeholder="代码名称" prefix-icon="el-icon-search" clearable></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
          </el-row>
          <div>
            <el-form>
              <el-col :span="12" class="btnEditDelete">
                <el-form-item align="left">
                  <el-button v-if="hasPermission('system/codelist:add')" type="success" icon="el-icon-plus" size="small" @click="addClick">新增</el-button>
                  <el-button v-if="hasPermission('system/codelist:delete')" type="danger" icon="el-icon-delete" size="small" @click="removeSelection">删除</el-button>
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
			<el-table class="table-formal" border id="table" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" @selection-change="selectionChange"
          :height="tableheight" :row-style="rowStyle">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column type="index" show-overflow-tooltip label="序号" align="center" width="65"></el-table-column>
          <el-table-column prop="codeValue" show-overflow-tooltip label="代码值" min-width="10%" align="center"></el-table-column>
          <el-table-column prop="codeName" show-overflow-tooltip label="代码名称" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="createName" show-overflow-tooltip label="创建人" min-width="11%" align="center"></el-table-column>
          <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" min-width="13%" align="center" :formatter="tableDateFormat"></el-table-column>
          <el-table-column prop="alterName" show-overflow-tooltip label="修改人" min-width="11%" align="center"></el-table-column>
          <el-table-column prop="alterTime" show-overflow-tooltip label="修改时间" min-width="13%" align="center" :formatter="tableDateFormat"></el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip label="备注" min-width="12%" align="center"></el-table-column>
          <el-table-column label="操作" width="65" align="center" v-if="hasPermission('system/codelist:edit')">
              <template slot-scope="scope">
                  <el-button type="text" @click="editClick(scope.row,scope.$index)">编辑</el-button>
              </template>
          </el-table-column>
        </el-table>
        <!--翻页组件-->
        <el-row type="flex" justify="end">
          <paginator></paginator>
        </el-row>
			</div>

      <!-- 编辑-->
      <el-dialog :title="dialogTitle" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
          <div v-show="false" v-once v-model="codeValueOld"></div>
          <el-row>
            <el-col :span="23">
              <el-form-item label="代码值" prop="codeValue">
                <el-input v-model="editForm.codeValue" size="small" auto-complete="off" placeholder="代码值" maxlength="30" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="代码名称" prop="codeName">
                <el-input v-model="editForm.codeName" size="small" auto-complete="off" placeholder="代码名称" maxlength="64" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="editForm.remark" size="small" auto-complete="off" placeholder="备注" maxlength="128" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>
          <el-row class="buttonSubmit">
            <el-button type="clear" icon="el-icon-close" size="small" class="btn_submit" @click="closeDialog"> 取消</el-button>
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
      codeid: null,
      //搜索表单
      searchForm: {
        codeValue: '',
        codeName: ''
      },
      tableData: [],
      //table高度
      tableheight: this.CONSTANT.tableheight10,
      //显示加载中样
      loading: false,
      //多选值
      multipleSelection: [],
      //当前页
      currentPage: 1,
      //分页大小
      pageSize: 10,
      //总记录数
      total: 0,
      //修改界面是否显示
      editFormVisible: false,
      editFormRules: {
        codeValue: [
          { required: true, message: "请输入代码值", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_-]{1,30}$/, message: '长度为1-30个字母、数字、_-符号',trigger: 'blur'},
        ],
        codeName: [{ required: true, message: "请输入代码名称", trigger: "blur" }]
      },
      //修改界面数据
      editForm: {
          codetype: "",
          codetypeName: ""
      },
      //代码值名称-旧
      codeValueOld: "",
      //Dialog Title
      dialogTitle: "代码集详情编辑",
      //选中的序号
      editIndex: -1
    };
  },
  created: function() {
    this.codeid = this.$route.query.codeid;
    var params = {
        codeid: this.codeid,
        pageSize: this.pageSize,
        pageNum: this.currentPage
    };
    this.$axios.post('/codelist/detail/doFindByCodeid', params).then(function (res) {
        var tableTemp = new Array((this.currentPage-1)*this.pageSize);
        this.tableData = tableTemp.concat(res.data.result.list);
        this.total = res.data.result.total;
        this.loading = false;
    }.bind(this), function (error) {
        console.log(error)
    })
  },
  methods: {
    //表格查询事件
    searchClick: function(type) {
      let vm = this;
      //按钮事件的选择
      if(type == 'page'){
        vm.tableData = [];    
      }else{
        vm.currentPage = 1;
      }
      vm.loading = true;//表格重新加载
      var params = {
        codeid: vm.codeid,
        codeValue: vm.searchForm.codeValue.replace(/%/g,"\\%"),
        codeName: vm.searchForm.codeName.replace(/%/g,"\\%"),
        pageSize: vm.pageSize,
        pageNum: vm.currentPage
      };

      vm.$axios.post('/codelist/detail/findByVO', params).then(function (res) {
        var tableTemp = new Array((vm.currentPage-1)*vm.pageSize);
        vm.tableData = tableTemp.concat(res.data.result.list);
        vm.total = res.data.result.total;
        vm.loading = false;
      }.bind(this), function (error) {
        console.log(error)
      })
    },

    //清空查询条件
    clearClick: function() {
      this.searchForm.codeValue = "",
      this.searchForm.codeName = "",
      this.searchClick('reset');
    },

    //表格勾选事件
    selectionChange: function(val) {
      this.multipleSelection = val;
    },
   
    //新增事件
    addClick: function() {
      this.dialogTitle = "代码集详情新增";
      //清空edit表单
      if (this.$refs["editForm"] !== undefined) {
          this.$refs["editForm"].resetFields();
      }
      this.editFormVisible = true;
    },

    //表格修改事件
    editClick: function(val, index) {
      let vm = this;
      vm.editIndex = index;
      vm.dialogTitle = "代码集详情编辑";
      var params = {
        codeid: this.codeid,
        pkid: val.pkid
      };
      vm.$axios.post('/codelist/detail/findByVO', params).then(function (res) {
        vm.editForm = res.data.result.list[0];
        //保存当前用户名codevalue
        vm.codeValueOld = this.editForm.codeValue;
      }.bind(this), function (error) {
        console.log(error)
      })
      vm.editFormVisible = true;
    },

    //编辑提交点击事件
    editSubmit: function(val) {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          let vm = this;
          var params = {
            codeid: this.codeid,
            codeValue: val.codeValue,
            codeName: val.codeName,
            remark: val.remark
          };
          if(vm.dialogTitle == "代码集详情新增"){
            vm.$axios.get('/codelist/detail/getNum/' + vm.codeid + '/' + vm.editForm.codeValue).then(function(res){
              if(res.data.result != 0){
                vm.$message({
                  message: "代码值已存在",
                  type: "error"
                });
              }else{
                params.createId = vm.currentUser.userid;
                params.createName = vm.currentUser.username;
                vm.$axios.post('/codelist/detail/insertByVO', params).then(function (res) {
                  var addData = res.data.result;
                  addData.createTime = new Date();
                  vm.tableData.unshift(addData);
                  vm.total = this.tableData.length;
                  vm.$message({
                    message: "代码集详情新增成功",
                    type: "success"
                  });
                }.bind(this), function (error) {
                  console.log(error)
                })
                vm.editFormVisible = false;
              }
            }.bind(this),function(error){
                console.log(error)
            })
          }else if(vm.dialogTitle == "代码集详情编辑"){
            params.pkid = val.pkid;
            params.alterId = vm.currentUser.userid;
            params.alterName = vm.currentUser.username;
            if(vm.editForm.codeValue == vm.codeValueOld){
                vm.editSubmitUpdateDB(params);
            }else{
              vm.$axios.get('/codelist/detail/getNum/' + vm.codeid + '/' + vm.editForm.codeValue).then(function(res){
                if(res.data.result != 0){
                  vm.$message({
                    message: "代码值已存在",
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
      vm.$axios.post('/codelist/detail/updateByVO', params).then(function (res) {
        var result = res.data.result;
        vm.tableData[vm.editIndex].codeValue = result.codeValue;
        vm.tableData[vm.editIndex].codeName = result.codeName;
        vm.tableData[vm.editIndex].remark = result.remark;
        vm.tableData[vm.editIndex].alterName = result.alterName;
        vm.tableData[vm.editIndex].alterTime = new Date();
        vm.editFormVisible = false;
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
        vm.$axios.post('/codelist/detail/deleteByList', vm.multipleSelection).then(function (res) {
          vm.$message({
            message: "成功删除" + res.data.result + "条代码集信息",
            showClose: true,
            onClose: this.searchClick('delete')
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
      val.permissionname = "";
      val.permissioninfo = "";
      this.$refs["editForm"].resetFields();
    }
  }
};
</script>

