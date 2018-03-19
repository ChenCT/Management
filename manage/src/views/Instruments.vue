<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input size="small" v-model="filters.name" placeholder="名称" @keyup.enter="getInstrument"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="el-icon-search" v-on:click="getInstrument" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="el-icon-circle-plus-outline" v-on:click="dialogForm">新建</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table
	    :data="instrument.slice((currentPage-1)*pageSize,currentPage*pageSize)"
	    border
	    stripe
	    size="medium"
	    style="width: 100%"
	    v-loading="loading">
	    <el-table-column type="expand">
	      <template slot-scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
	          <el-form-item label="名称">
	            <span>{{ props.row.name }}</span>
	          </el-form-item>
	          <el-form-item label="规格/ML">
	            <span>{{ props.row.specification }}</span>
	          </el-form-item>
	          <el-form-item label="数量">
	            <span>{{ props.row.quantity }}</span>
	          </el-form-item>
	          <el-form-item label="价格">
	            <span>{{ props.row.price }}</span>
	          </el-form-item>
	          <el-form-item label="位置">
	            <span>{{ props.row.location }}</span>
	          </el-form-item>
	          <el-form-item label="位置编号">
	            <span>{{ props.row.locationId }}</span>
	          </el-form-item>
	          <el-form-item label="房间">
	            <span>{{ props.row.room }}</span>
	          </el-form-item>	          
	          <el-form-item label="类别">
	            <span>{{ props.row.category }}</span>
	          </el-form-item>
	          <el-form-item label="是否空置">
	            <span>{{ props.row.vacant }}</span>
	          </el-form-item>
	          <el-form-item label="负责人">
	            <span>{{ props.row.responsible }}</span>
	          </el-form-item>
	        </el-form>
	      </template>
	    </el-table-column>
	   <!--  <el-table-column type="index" width="50">
    	</el-table-column> -->
	    <el-table-column prop="name" label="名称">
	    </el-table-column>
	    <el-table-column prop="specification" label="规格/ML">
	    </el-table-column>
	    <el-table-column prop="quantity" label="数量">
	    </el-table-column>
	    <el-table-column prop="category" label="类别">
	    </el-table-column>
	    <el-table-column prop="room" label="房间">
	    </el-table-column>
	    <el-table-column prop="responsible"  label="负责人">
	    </el-table-column>
	    <el-table-column label="操作">
	    	<template slot-scope="scope">
	        <el-button @click="handleApplication(scope.row)" size="small">借用申请</el-button>
	      </template>
	    </el-table-column>
	  </el-table>

	  <el-dialog title="新增仪器信息" :visible.sync="newDialog">
	  	<el-form style="width:48%;float:left" label-width="80px" :model="newForm" ref="newForm" :rules="rules">
		    <el-form-item  label="名称" prop="name">
		      <el-input v-model="newForm.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="数量" prop="quantity">
		      <el-input v-model="newForm.quantity" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="位置" prop="location">
		      <el-input v-model="newForm.location" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="房间" prop="room">
		      <el-input v-model="newForm.room" auto-complete="off"></el-input>
		    </el-form-item> 
		    <el-form-item label="类别" prop="category">
		      <el-select v-model="newForm.category" placeholder="请选择仪器类别">
			      <el-option label="玻璃仪器类-烧器类" value="玻璃仪器类-烧器类"></el-option>
			      <el-option label="玻璃仪器类-皿管类" value="玻璃仪器类-皿管类"></el-option>
			      <el-option label="玻璃仪器类-量器类" value="玻璃仪器类-量器类"></el-option>
			      <el-option label="玻璃仪器类-瓶斗类" value="玻璃仪器类-瓶斗类"></el-option>
			      <el-option label="设备类" value="设备类"></el-option>
			      <el-option label="用品类-实验用品类" value="用品类-实验用品类"></el-option>
			      <el-option label="用品类-生活用品类" value="用品类-生活用品类"></el-option>
			    </el-select>
		    </el-form-item>
		  </el-form>
		
		  <el-form style="width:48%;float:left;margin-left:2%" label-width="80px" :model="newForm" ref="newForm" :rules="rules">	    
		    <el-form-item label="规格/ML" prop="specification">
		      <el-input v-model="newForm.specification" auto-complete="off"></el-input>
		    </el-form-item>	
		    <el-form-item label="价格" prop="price">
		      <el-input v-model.number="newForm.price" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="位置编号" prop="locationId">
		      <el-input v-model="newForm.locationId" auto-complete="off"></el-input>
		    </el-form-item>    
		    <el-form-item label="负责人" prop="responsible">
		      <el-input v-model="newForm.responsible" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="是否空置" prop="vacant">
		      <el-radio-group v-model="newForm.vacant">
		      	<el-radio label="否"></el-radio>
		      	<el-radio label="是"></el-radio>
		      </el-radio-group>
		    </el-form-item>
		  </el-form> 

<!-- 		  <el-form :inline="true" :model="newForm" ref="newForm" :rules="rules">
		    <el-form-item  label="名称" prop="name">
		      <el-input v-model="newForm.name" auto-complete="off"></el-input>
		    </el-form-item>	    
		    <el-form-item  label="规格/ML" prop="specification">
		      <el-input v-model="newForm.specification" auto-complete="off"></el-input>
		    </el-form-item>	
		  </el-form>		
		  <el-form :inline="true" :model="newForm" ref="newForm" :rules="rules">  
		    <el-form-item label="数量" prop="quantity">
		      <el-input v-model="newForm.quantity" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="价格" prop="price">
		      <el-input v-model.number="newForm.price" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
	    <el-form :inline="true" :model="newForm" ref="newForm" :rules="rules"> 
		    <el-form-item label="位置" prop="location">
		      <el-input v-model="newForm.location" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="位置编号" prop="locationId">
		      <el-input v-model="newForm.locationId" auto-complete="off"></el-input>
		    </el-form-item>
	    </el-form>
	    <el-form :inline="true" :model="newForm" ref="newForm" :rules="rules"> 
		    <el-form-item label="房间" prop="room">
		      <el-input v-model="newForm.room" auto-complete="off"></el-input>
		    </el-form-item>    
		    <el-form-item label="负责人" prop="responsible">
		      <el-input v-model="newForm.responsible" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
	    <el-form :inline="true" :model="newForm" ref="newForm" :rules="rules">
		    <el-form-item label="类别" prop="category">
		      <el-select v-model="newForm.category" placeholder="请选择仪器类别">
			      <el-option label="玻璃仪器类-烧器类" value="玻璃仪器类-烧器类"></el-option>
			      <el-option label="玻璃仪器类-皿管类" value="玻璃仪器类-皿管类"></el-option>
			      <el-option label="玻璃仪器类-量器类" value="玻璃仪器类-量器类"></el-option>
			      <el-option label="玻璃仪器类-瓶斗类" value="玻璃仪器类-瓶斗类"></el-option>
			      <el-option label="设备类" value="设备类"></el-option>
			      <el-option label="用品类-实验用品类" value="用品类-实验用品类"></el-option>
			      <el-option label="用品类-生活用品类" value="用品类-生活用品类"></el-option>
			    </el-select>
		    </el-form-item>
		    <el-form-item label="是否空置" prop="vacant">
		      <el-radio-group v-model="newForm.vacant">
		      	<el-radio label="否"></el-radio>
		      	<el-radio label="是"></el-radio>
		      </el-radio-group>
		    </el-form-item>
		  </el-form> -->

		  <div slot="footer" class="dialog-footer">
		    <!-- <el-button @click="resetForm('newForm')">重 置</el-button> -->
		    <el-button @click="newDialog = false">取 消</el-button>
		    <el-button type="primary" @click="checkInformation">确 定</el-button>
		  </div>
		</el-dialog>

		<el-dialog title="借用申请" :visible.sync="newApplication"  width="40%">  
		  <el-form  :model="applicationForm" ref="applicationForm" :rules="rules2">
		  	<el-form-item  label="申请信息" >
		      <span style="margin-left:12px">{{activenewApplication.name}},</span>
		      <span style="margin-left:12px">规格：{{activenewApplication.specification}},</span>
		      <span style="margin-left:12px">申请人：{{nickName}}</span>
		    </el-form-item>	    
		  	<el-form-item  label="数量" label-width="100px" prop="quantity">
		      <el-input v-model="applicationForm.quantity" style="width: 60%;"></el-input>
		    </el-form-item>	    
		    <el-form-item  label="日期" label-width="100px" prop="date">
		      <el-date-picker type="date" placeholder="选择日期" v-model="applicationForm.date" style="width: 60%;"></el-date-picker>
		    </el-form-item>		    
		    <el-form-item  label="借用说明" label-width="100px" prop="explanation">
		      <el-input type="textarea" v-model="applicationForm.explanation" style="width: 80%;"></el-input>
		    </el-form-item>	
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <!-- <el-button @click="resetForm('applicationForm')">重 置</el-button> -->
		    <el-button @click="newApplication = false">取 消</el-button>
		    <el-button type="primary" >确 定</el-button>
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
	      :total="this.instrument.length">
	    </el-pagination>
	  </div>

	<!--   <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

	</section>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default{
	data(){
		return {
			filters: {
				name: ''
			},
			instrument: [],
			loading: false,
			newDialog: false,
			newApplication: false,
			checkOk: false,
			currentPage: 1,
			pageSize: 10,
			activenewApplication: '',
			newForm: {
        name: '',
        specification: '',
        quantity: '',
        price: '',
        locationId: '',
        location: '',
        category: '',
        room: '',
        vacant: '',
        responsible: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写仪器名称', trigger: 'changed' }
        ],
        specification: [
          { required: true, message: '请填写仪器规格', trigger: 'changed' }
        ],
        quantity: [
          { required: true, message: '请填写仪器数量', trigger: 'changed' }
        ],
        price: [
          { required: true, message: '请填写仪器价格'},
          { type: 'number', message: '请输入数字' }
        ],
        locationId: [
          { required: true, message: '请填写位置编号', trigger: 'changed' }
        ],
        location: [
          { required: true, message: '请填写位置', trigger: 'changed' }
        ],
        category: [
          { required: true, message: '请选择仪器分类', trigger: 'changed' }
        ],
        room: [
          { required: true, message: '请填写房间', trigger: 'changed' }
        ],
        vacant: [
          { required: true, message: '请选择是否空置', trigger: 'changed' }
        ],
        responsible: [
          { required: true, message: '请填写负责人', trigger: 'changed' }
        ]
      },
      applicationForm: {
      	quantity: '',
      	date: '',
      	explanation: ''
      },
      rules2: {
        quantity: [
          { required: true, message: '请填写数量', trigger: 'changed' }
        ],
        date: [
        	{ required: true, message: '请选择日期', trigger: 'changed' }
        ]
      }
		}
	},
	computed: {
		...mapState(['nickName'])
	},
	methods: {
		getInstrument() {
			this.loading = true
			// console.log(this.filters.name)
			let para = {
				name: this.filters.name
			}
			axios.get("/instrument",{ params: para }).then((response)=>{
				let res = response.data;
				this.instrument = res.result;
				this.loading = false
			}).catch((err)=>{
				console.log(err);
			});			
		},
		handleApplication(row) {
      console.log(row);
      this.activenewApplication = row;
      console.log(this.activenewApplication.name);

      if( this.nickName ) {
				this.newApplication = true
				
			} else {
				this.$message({
          message: '请先登录',
          type: 'warning',
          center: true
        });
			}
    },
    checkInformation() {   //检验新建表单信息是否为空
    	this.checkOk = false;
    	for(let key in this.newForm) {
    		if(!this.newForm[key]) {
    			this.$message({ message: '请将仪器信息填写完整',type: 'warning',center: true });
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
    	axios.post('/instrument/add',{
				name: this.newForm.name,
        specification: this.newForm.specification,
        quantity: this.newForm.quantity,
        price: this.newForm.price,
        locationId: this.newForm.locationId,
        location: this.newForm.location,
        category: this.newForm.category,
        room: this.newForm.room,
        vacant: this.newForm.vacant,
        responsible: this.newForm.responsible
			}).then((response)=>{
				let res = response.data;
				if (res.status==='0'){
					this.newDialog = false
					this.$message({ message: '新建仪器信息成功！',type: 'success',center: true });
					this.getInstrument()			
				} else {
					this.$message({ message: '新建仪器信息出错，请稍后再试！',type: 'warning',center: true });
				}
			})
    	
    },
		resetForm(formName) {
      this.$refs[formName].resetFields();
    },
		dialogForm() {
			if( this.nickName ) {
				this.newDialog = true
				this.newForm = {
	        name: '',
	        specification: '',
	        quantity: '',
	        price: '',
	        locationId: '',
	        location: '',
	        category: '',
	        room: '',
	        vacant: '',
	        responsible: ''
	      }
			} else {
				this.$message({
          message: '请先登录',
          type: 'warning',
          center: true
        });
			}
		},
		newInstrument() {
			this.newDialog = false
		},
		handleSizeChange(val) {
			this.pageSize = val;
			// this.getInstrument();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			// this.getInstrument();
		}
		
	},
	mounted() {
		this.getInstrument();
	}
}
</script>

<style lang="scss" scoped="" type="text/css">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    text-align: left;
    float: left;
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

	.input {
		width: 400px;
	}

	.el-pagination {
		margin: 30px;
	}



</style>