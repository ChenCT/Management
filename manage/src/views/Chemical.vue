<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input size="small" v-model="filters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="el-icon-search" v-on:click="getChemical">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="el-icon-circle-plus-outline" v-on:click="dialogForm">新建</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table
	    :data="chemical.slice((currentPage-1)*pageSize,currentPage*pageSize)"
	    border
	    stripe
	    size="medium"
	    style="width: 100%;"
	    v-loading="loading">
	    <el-table-column type="expand">
	      <template slot-scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
	          <el-form-item label="名称">
	            <span>{{ props.row.name }}</span>
	          </el-form-item>
	          <el-form-item v-show="props.row.specification" label="规格">
	            <span>{{ props.row.specification }}</span>
	          </el-form-item>
	          <el-form-item label="数量">
	            <span>{{ props.row.quantity }}</span>
	          </el-form-item>
	          <el-form-item label="价格">
	            <span>{{ props.row.price }}</span>
	          </el-form-item>
	          <el-form-item label="二级类别">
	            <span>{{ props.row.secCategory }}</span>
	          </el-form-item>
	          <el-form-item label="编号">
	            <span>{{ props.row.number }}</span>
	          </el-form-item>
	          <el-form-item label="空置提醒">
	            <span>{{ props.row.vacant }}</span>
	          </el-form-item>
	          <el-form-item label="是否危险品">
	            <span>{{ props.row.dangerous }}</span>
	          </el-form-item>
	          <el-form-item label="分子式">
	            <span>{{ props.row.formula }}</span>
	          </el-form-item>	          
	          <el-form-item label="分子量">
	            <span>{{ props.row.molecularWeight}}</span>
	          </el-form-item>
	          <el-form-item label="负责人">
	            <span>{{ props.row.responsible }}</span>
	          </el-form-item>		          
	          <el-form-item label="位置">
	            <span>{{ props.row.location }}</span>
	          </el-form-item>
	          <el-form-item label="位置编号">
	            <span>{{ props.row.locationId }}</span>
	          </el-form-item>     
	          <el-form-itemv-show="props.row.laboratory"  label="实验室">
	            <span>{{ props.row.laboratory }}</span>
	          </el-form-item>   
	          <el-form-item label="输入日期">
	            <span>{{ props.row.inDate }}</span>
	          </el-form-item>          
	          <el-form-item v-show="props.row.locationDes" style="width:100%" class="long-item" label="位置描述">
	            <span>{{ props.row.locationDes }}</span>
	          </el-form-item>          
	          <el-form-item style="width:100%" class="long-item" label="储存">
	            <span>{{ props.row.store }}</span>
	          </el-form-item>
	          <el-form-item style="width:100%" class="long-item" label="性状">
	            <span>{{ props.row.traits }}</span>
	          </el-form-item>
	          <el-form-item style="width:100%" class="long-item" label="用途">
	            <span>{{ props.row.use }}</span>
	          </el-form-item>
	        </el-form>
	      </template>
	    </el-table-column>

	    <el-table-column prop="name" label="名称">
	    </el-table-column>
	    <el-table-column prop="quantity" label="数量">
	    </el-table-column>
	    <el-table-column prop="formula" label="分子式">
	    </el-table-column>
	    <el-table-column prop="number" label="编号">
	    </el-table-column>
	    <el-table-column prop="responsible"  label="负责人">
	    </el-table-column>
	    <el-table-column prop="dangerous" label="是否危险品">
	    </el-table-column>
	    <el-table-column label="操作">
	    	<template slot-scope="scope">
	        <el-button @click="handleApplication(scope.row)" type="text" size="small">借用申请</el-button>
	        <el-button style="color:#e6a23c;" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>

	  <el-dialog title="新增药品信息" :visible.sync="newDialog" @close="resetForm('newForm')">
		  <el-form style="display: flex;display: -webkit-flex;flex-wrap: wrap;" label-width="80px" :model="newForm" ref="newForm" :rules="rules">
		    <el-form-item  label="名称" prop="name">
		      <el-input v-model="newForm.name" auto-complete="off"></el-input>
		    </el-form-item>  
		    <el-form-item label="规格" prop="specification">
		      <el-input v-model="newForm.specification" auto-complete="off"></el-input>
		    </el-form-item>   
		    <el-form-item label="价格" prop="price">
		      <el-input v-model.number="newForm.price" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="数量" prop="quantity">
		      <el-input v-model="newForm.quantity" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="分子式" prop="formula">
		      <el-input v-model="newForm.formula" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="分子量" prop="molecularWeight">
		      <el-input v-model="newForm.molecularWeight" auto-complete="off"></el-input>
		    </el-form-item>  
		    <el-form-item label="位置" prop="location">
		      <el-input v-model="newForm.location" auto-complete="off"></el-input>
		    </el-form-item>   
		    <el-form-item label="编号" prop="number">
		      <el-input v-model="newForm.number" auto-complete="off"></el-input>
		    </el-form-item>  
		    <el-form-item label="负责人" prop="responsible">
		      <el-input v-model="newForm.responsible" auto-complete="off"></el-input>
		    </el-form-item>   
		    <el-form-item label="实验室" prop="laboratory">
		      <el-input v-model="newForm.laboratory" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="位置编号" prop="locationId">
		      <el-input v-model="newForm.locationId" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="空置提醒" prop="vacant">
		      <el-radio-group v-model="newForm.vacant">
		      	<el-radio label="否"></el-radio>
		      	<el-radio label="是"></el-radio>
		      </el-radio-group>
		    </el-form-item>
		    <el-form-item label="二级类别" prop="secCategory">
					<el-select v-model="newForm.secCategory" placeholder="请选择类别">
			      <el-option label="试剂" value="试剂"></el-option>
			      <el-option label="原料" value="原料"></el-option>
			    </el-select>		    
			  </el-form-item>
		    <el-form-item label="危险品" prop="dangerous">
		      <el-radio-group v-model="newForm.dangerous">
		      	<el-radio label="否"></el-radio>
		      	<el-radio label="是"></el-radio>
		      </el-radio-group>
		    </el-form-item>
		    <el-form-item label="输入日期" prop="inDate">
		      <el-date-picker v-model="newForm.inDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
		    </el-form-item>		  	
		    <el-form-item class="dialog-long-item" label="位置说明" prop="locationDes">
		      <el-input type="textarea" v-model="newForm.locationDes"  auto-complete="off"></el-input>
		    </el-form-item>
		  	<el-form-item class="dialog-long-item" label="存储" prop="store">
		      <el-input type="textarea" v-model="newForm.store"  auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item class="dialog-long-item" label="性状" prop="traits">
		      <el-input type="textarea" v-model="newForm.traits"  auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item class="dialog-long-item" label="用途" prop="use">
		      <el-input type="textarea" v-model="newForm.use" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('newForm')">取 消</el-button>
		    <el-button type="primary" @click="checkInformation">确 定</el-button>
		  </div>
		</el-dialog>

		<el-dialog title="借用申请" :visible.sync="newApplication"  width="40%" @close="resetForm('applicationForm')">  
		  <el-form  :model="applicationForm" ref="applicationForm" :rules="rules2">
		  	<el-form-item  label="申请信息" >
		      <span style="margin-left:12px">{{activenewApplication.name}},</span>
		      <span style="margin-left:12px">规格：{{activenewApplication.specification}},</span>
		      <span style="margin-left:12px">申请人：{{nickName}}</span>
		    </el-form-item>	    
		  	<el-form-item  label="数量" label-width="100px" prop="amount">
		      <el-input v-model="applicationForm.amount" style="width: 60%;"></el-input>
		    </el-form-item>	    
		    <el-form-item  label="日期" label-width="100px" prop="date">
		      <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="applicationForm.date" style="width: 60%;"></el-date-picker>
		    </el-form-item>		    
		    <el-form-item  label="借用说明" label-width="100px" prop="explanation">
		      <el-input type="textarea" v-model="applicationForm.explanation" style="width: 80%;"></el-input>
		    </el-form-item>	
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('applicationForm')">取 消</el-button>
		    <el-button type="primary" @click="checkBorrow">确 定</el-button>
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
	      :total="this.chemical.length">
	    </el-pagination>
	  </div>


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
			chemical: [],
			loading: false,
			newDialog: false,			
			checkOk: false,			
			checkOk2: false,			
			newApplication: false,
			activenewApplication: '',
			activeDelete: '',
			currentPage: 1,
			pageSize: 10,
			newForm: {
        name: '',
        specification:'',
        dangerous: '',
        quantity: '',
        laboratory: '',
        price: '',
        locationId: '',
        location: '',
        locationDes: '',
        inDate: '',
        vacant: '',
        responsible: '',
        secCategory: '',
        formula: '',
        molecularWeight: '',
        number: '',
        traits: '',
        store: '',
        use: ''
      },
      applicationForm: {
      	amount: '',
      	date: '',
      	instructions: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写药品名称', trigger: 'changed' }
        ],
        quantity: [
          { required: true, message: '请填写药品数量', trigger: 'changed' }
        ],
        price: [
          { required: true, message: '请填写药品价格', trigger: 'changed' },
          { type: 'number', message: '请输入数字' }
        ],
        locationId: [
          { required: true, message: '请填写位置编号', trigger: 'changed' }
        ],
        location: [
          { required: true, message: '请填写位置', trigger: 'changed' }
        ],
        secCategory: [
          { required: true, message: '请选择类别', trigger: 'changed' }
        ],
        room: [
          { required: true, message: '请填写房间', trigger: 'changed' }
        ],
        vacant: [
          { required: true, message: '请选择空置提醒', trigger: 'changed' }
        ],
        inDate: [
          { required: true, message: '请选择日期', trigger: 'changed' }
        ],
        dangerous: [
          { required: true, message: '请选择是否危险品', trigger: 'changed' }
        ],
        responsible: [
          { required: true, message: '请填写负责人', trigger: 'changed' }
        ],
        laboratory: [
          { required: true, message: '请填写实验室', trigger: 'changed' }
        ]
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
		getChemical() {
			this.loading = true
			let para = {
				name: this.filters.name
			}
			axios.get("/chemical",{ params: para }).then((response)=>{
				let res = response.data;
				let nowDate = new Date().getTime()
				for(let i=0;i<res.result.length;i++){
					res.result[i].inDate = new Date(res.result[i].inDate).toLocaleDateString()
					if(res.result[i].vacant=='是'){
						let updatetime = new Date(res.result[i].updatetime).getTime()
						let interval = (nowDate - updatetime )/(1000*3600*24)
						if( interval > 30 ){
							res.result[i].name = '(空置)'+res.result[i].name
						}
					}
				}
				this.chemical = res.result;
				this.loading = false
			}).catch((err)=>{
				console.log(err);
			});	
		},
		handleApplication(row) {
      this.activenewApplication = row;

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
    checkBorrow() {   //检验借用信息是否为空
    	this.checkOk2 = false;
  		if(this.applicationForm.amount && this.applicationForm.date) {	
  			this.checkOk2 = true;
  		} else {
  			this.$message({ message: '请将借用信息填写完整',type: 'warning',center: true });
  			this.checkOk2 = false;  			
  		}
    	
    	if(this.checkOk2) {
    		this.submitBorrow();
    	}    	
    },
    submitBorrow() {
    	var aname=this.activenewApplication.name
    	if(aname.indexOf('(空置)')===0){
    		this.activenewApplication.name = aname.substring(4);
    	}
    	axios.post('/material/borrow',{
				Id:            this.activenewApplication.Id,
				name:          this.activenewApplication.name,
        specification: this.activenewApplication.specification,
        amount:        this.applicationForm.amount,
        borrower:      this.nickName,
        date:          this.applicationForm.date,
        responsible:   this.activenewApplication.responsible,
        instructions:  this.applicationForm.instructions,
        category:      '药品试剂原料',
        dangerous:     this.activenewApplication.dangerous 
			}).then((response)=>{
				let res = response.data;
				if (res.status==='0'){
					this.newApplication = false
					this.$message({ message: '借用申请提交成功！',type: 'success',center: true });
					this.getChemical();			
				} else {
					this.$message({ message: '申请提交出错，请稍后再试！',type: 'warning',center: true });
				}
			})
    },
    handleDelete(row) {
      console.log(row);
      this.activeDelete = row;

      if( this.nickName ) {
				this.$confirm('是否确定该物资?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        axios.post('/chemical/delete',{Id: this.activeDelete.Id}).then((response)=>{
						let res = response.data;
						if (res.status==='0'){
							this.$message({ message: '删除成功！',type: 'success',center: true });
							this.getChemical()			
						} else {
							this.$message({ message: '出错，请稍后再试！',type: 'warning',center: true });
						}
					})	
	      })			
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
    		if(key!='specification'&&key!='locationDes'&&key!='formula'&&key!='molecularWeight'&&key!='number'&&key!='traits'&&key!='store'&&key!='use'){
					if(!this.newForm[key]) {
	    			this.$message({ message: '请将药品信息填写完整',type: 'warning',center: true });
	    			this.checkOk = false;
	  			  break;	
	    		} else {
	    			this.checkOk = true;
	    		}
    		}
    	}
    	if(this.checkOk) {
    		this.submitInformation();
    	}    	
    },
    submitInformation() {   //提交新建信息
    	axios.post('/chemical/add',{
				name: this.newForm.name,
        specification: this.newForm.specification,
        locationDes: this.newForm.locationDes,
        locationId: this.newForm.locationId,
        location: this.newForm.location,
        responsible: this.newForm.responsible,
        inDate: this.newForm.inDate,
        dangerous: this.newForm.dangerous,
        vacant: this.newForm.vacant,
        secCategory: this.newForm.secCategory,
        quantity: this.newForm.quantity,
        price: this.newForm.price,
        formula: this.newForm.formula,
        molecularWeight: this.newForm.molecularWeight,
        number: this.newForm.number,
        laboratory: this.newForm.laboratory,
        traits: this.newForm.traits,
        store: this.newForm.store,
        use: this.newForm.use
			}).then((response)=>{
				let res = response.data;
				if (res.status==='0'){
					this.newDialog = false
					this.$message({ message: '新建药品信息成功！',type: 'success',center: true });
					this.getChemical()			
				} else {
					this.$message({ message: '新建药品信息出错，请稍后再试！',type: 'warning',center: true });
				}
			})   	
    },
		resetForm(formName) {
      this.$refs[formName].resetFields();
      this.newDialog = false
      this.newApplication = false
    },
		dialogForm() {
			if( this.nickName ) {
				this.newDialog = true
				this.newForm = {
	        name: '',
	        specification:'',
	        dangerous: '',
	        quantity: '',
	        laboratory: '',
	        price: '',
	        locationId: '',
	        location: '',
	        locationDes: '',
	        inDate: '',
	        vacant: '',
	        responsible: '',
	        secCategory: '',
	        formula: '',
	        molecularWeight: '',
	        number: '',
	        traits: '',
	        store: '',
	        use: ''
	      }
			} else {
				this.$message({
          message: '请先登录',
          type: 'warning',
          center: true
        });
			}	
		},
		newChemical() {
			this.newDialog = false
		},
		handleSizeChange(val) {
			this.pageSize = val;
			// this.getChemical();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			// this.getChemical();
		}
		
	},
	mounted() {
		this.getChemical();
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