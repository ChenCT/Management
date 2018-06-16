<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input size="small" v-model="filters.name" placeholder="姓名" @keyup.enter="getUser"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="el-icon-search" v-on:click="getUser" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="el-icon-circle-plus-outline" v-on:click="dialogForm">新建</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table
    :data="userData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    border
    stripe
    size="medium"
    style="width: 100%;margin-top:20px"
    v-loading="loading">
	    <el-table-column label="学号" prop="Id">
	    </el-table-column>
	    <el-table-column label="姓名" prop="name">
	    </el-table-column>
	    <el-table-column label="入学时间" prop="enrollment">
	    </el-table-column>
	    <el-table-column label="毕业时间"  prop="graduation">
	    </el-table-column>
	    <el-table-column label="所属实验室"  prop="laboratory">
	    </el-table-column>
	    <el-table-column label="权限"  prop="authority">
	    </el-table-column>
	    <el-table-column label="操作">
	    	<template slot-scope="scope">
	        <el-button  @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>

	  <el-dialog title="新增人员信息" :visible.sync="newDialog" @close="resetForm('newForm')">
	  	<el-form style="width:48%;float:left" label-width="80px" :model="newForm" ref="newForm" :rules="rules">
		    <el-form-item  label="学号" prop="Id">
		      <el-input v-model="newForm.Id" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="入校时间" prop="enrollment">
		      <el-date-picker v-model="newForm.enrollment" type="date" value-format="yyyy-MM-dd" placeholder="入校时间"></el-date-picker>
		    </el-form-item> 
		    <el-form-item label="密码" prop="password">
		      <el-input v-model="newForm.password" type="password" auto-complete="off"></el-input>
		    </el-form-item>    
		  </el-form>
		
		  <el-form style="width:48%;float:left;margin-left:2%" label-width="80px" :model="newForm" ref="newForm" :rules="rules">	    
		    <el-form-item label="姓名" prop="name">
		      <el-input v-model="newForm.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="离校时间" prop="graduation">
		      <el-date-picker v-model="newForm.graduation" type="date" value-format="yyyy-MM-dd" placeholder="离校时间"></el-date-picker>
		    </el-form-item>	
		    <el-form-item label="权限" prop="authority">
					<el-select v-model="newForm.authority" placeholder="请选择">
			      <el-option label="学生" value="学生"></el-option>
			      <el-option label="管理员" value="管理员"></el-option>
			    </el-select>		   
			  </el-form-item>
		  </el-form> 

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('newForm')">取 消</el-button>
		    <el-button type="primary" @click="checkInformation">确 定</el-button>
		  </div>
		</el-dialog>

	  <div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[5, 10, 15, 20]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="this.userData.length">
	    </el-pagination>
	  </div>
	</section>
</template>


<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			filters: {
				name: ''
			},
			userData: [],
			newForm: {
				Id:'',
				name:'',
				password:'',
				authority:'',
				enrollment:'',
				graduation:''
			},
			newDialog:false,
			loading: false,
			rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'changed' }
        ],
        Id: [
          { required: true, message: '请填写学号', trigger: 'changed' }
        ],
        enrollment: [
          { required: true, message: '请填写入校时间', trigger: 'changed' }
        ],
        graduation: [
          { required: true, message: '请填写离校时间', trigger: 'changed' }
        ],
        authority: [
          { required: true, message: '请选择权限', trigger: 'changed' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'changed' }
        ]
      },
      checkOk:false,
      activeDelete:'',
			currentPage: 1,
			pageSize: 10
		}
	},
	computed: {
		...mapState(['nickName','authority',',laboratory'])
	},
	methods: {
		getUser() {
			this.loading = true
			// if(this.nickName) {
				axios.get('/users/viewp',{ params:{ laboratory: this.laboratory, name: this.filters.name}}).then((response)=>{
					let res = response.data;
					for(let i=0;i<res.result.length;i++){
						res.result[i].enrollment = new Date(res.result[i].enrollment).toLocaleDateString()
						res.result[i].graduation = new Date(res.result[i].graduation).toLocaleDateString()
					}
					this.userData = res.result  
					this.loading = false
				}).catch((err) =>{
					console.log(err);
				})
			// }
		},
		dialogForm() {
			this.newDialog = true
			this.newForm = {
        name: '',
        Id: '',
        password: '',
        authority: '',
        enrollment: '',
        graduation: ''
      }
		},
		resetForm(formName) {
      this.$refs[formName].resetFields();
      this.newDialog = false
    },
    checkInformation() {   //检验新建表单信息是否为空
    	this.checkOk = false;
    	for(let key in this.newForm) {
    		if(!this.newForm[key]) {
    			this.$message({ message: '请将人员信息填写完整',type: 'warning',center: true });
    			this.checkOk = false;
  			  break;	
    		} else {
    			this.checkOk = true;
    		}
    	}
    	if(this.checkOk) {
    		this.submitInformation();
    	}    	
    },
    submitInformation() {   //提交新建信息
    	axios.post('/users/newp',{
				name: this.newForm.name,
        Id: this.newForm.Id,
        password: this.newForm.password,
        authority: this.newForm.authority,
        enrollment: this.newForm.enrollment,
        graduation: this.newForm.graduation,
        laboratory: this.laboratory
			}).then((response)=>{
				let res = response.data;
				if (res.status==='0'){
					this.newDialog = false
					this.$message({ message: '新建人员信息成功！',type: 'success',center: true });
					this.getUser()			
				} else {
					this.$message({ message: '新建人员信息出错，请稍后再试！',type: 'warning',center: true });
				}
			})	
    },
		handleDelete(row) {
      this.activeDelete = row;

      if(this.activeDelete.authority==='管理员'){
      	this.$message({ message: '无权进行此操作',type: 'warning',center: true });
      } else{
      	this.$confirm('是否确定删除该人员?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        axios.post('/users/delete',{Id: this.activeDelete.Id}).then((response)=>{
						let res = response.data;
						if (res.status==='0'){
							this.$message({ message: '删除成功！',type: 'success',center: true });
							this.getUser()			
						} else {
							this.$message({ message: '出错，请稍后再试！',type: 'warning',center: true });
						}
					})	
	      })
      }  
    },
		handleSizeChange(val) {
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			this.currentPage = val;
		}
	},
	mounted() {
		this.getUser()
	}
}

</script>

<style lang="scss" scoped="" type="text/css"> 
	
	.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .toolbar {
	  background: #f2f2f2;
	  padding: 10px;
	  border:1px solid #dfe6ec;
	  margin: 10px 0px;
	  .el-form-item {
	    margin-bottom: 10px;
	  }
	}
  .el-pagination {
		margin: 30px;
	}
</style>