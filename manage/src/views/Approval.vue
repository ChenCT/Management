<template>
	<section>
		<el-table
    :data="approvalData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    border
    stripe
    size="medium"
    style="width: 100%;margin-top:20px"
    v-loading="loading">
   	 	<el-table-column type="expand">
	      <template slot-scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
	        	<el-form-item label="申请物资">
	            <span>{{ props.row.materialName }}</span>
	          </el-form-item>
	        	<el-form-item label="规格">
	            <span>{{ props.row.specification }}</span>
	          </el-form-item>
	        	<el-form-item label="类别">
	            <span>{{ props.row.category }}</span>
	          </el-form-item>
	        	<el-form-item label="是否危险品">
	            <span>{{ props.row.dangerous }}</span>
	          </el-form-item>
	        	<el-form-item label="借用者">
	            <span>{{ props.row.borrower }}</span>
	          </el-form-item>
	        	<el-form-item label="责任人">
	            <span>{{ props.row.responsible }}</span>
	          </el-form-item>
	        	<el-form-item label="借用数量">
	            <span>{{ props.row.amount }}</span>
	          </el-form-item>
	        	<el-form-item label="借用日期">
	            <span>{{ props.row.date }}</span>
	          </el-form-item>
	        	<el-form-item label="状态">
	            <span v-if="props.row.status==0">待审核</span>
			    		<span v-else-if="props.row.status==1">已申请</span>
			    		<span v-else-if="props.row.status==3">已拒绝</span>
			    		<span v-else="props.row.status==2">已归还</span>
	          </el-form-item>
	        	<el-form-item label="借用说明">
	            <span>{{ props.row.instructions }}</span>
	          </el-form-item>
	        </el-form>
	      </template>
	    </el-table-column>
	    <el-table-column label="申请物资" prop="materialName">
	    </el-table-column>
	    <el-table-column label="规格" prop="specification">
	    </el-table-column>    
	    <el-table-column label="数量" prop="amount">
	    </el-table-column>
	    <el-table-column label="申请时间" prop="date">
	    </el-table-column>
	    <el-table-column label="申请人"  prop="borrower">
	    </el-table-column>
	    <el-table-column label="操作">
	    	<template slot-scope="scope">
	    		<el-button @click="handleAccept(scope.row)" type="text" >同意</el-button>
	    		<el-button style="color:#e6a23c;" @click="handleRefuse(scope.row)" type="text" >拒绝</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[5, 10, 15, 20]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="this.approvalData.length">
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
			approvalData: [],
			activeAccept:'',
			currentPage: 1,
			pageSize: 10,
			loading: false
		}
	},
	computed: {
		...mapState(['nickName','authority',',laboratory'])
	},
	methods: {
		getApproval() {
			this.loading = true
			// if(this.nickName) {
				axios.get('/material/approval',{ params:{ name: this.nickName}}).then((response)=>{
					let res = response.data;
					for(let i=0;i<res.result.length;i++){
						res.result[i].date = new Date(res.result[i].date).toLocaleDateString()
					}
					this.approvalData = res.result
					this.loading = false
				}).catch((err) =>{
					console.log(err);
				})
			// }
		},
		handleAccept(row) {
			this.activeAccept = row;
      axios.post('/material/accept',{Id: this.activeAccept.recordId}).then((response)=>{
				let res = response.data;
				if (res.status==='0'){
					this.$message({ message: '已通过该申请！',type: 'success',center: true });
					this.getApproval()			
				} else {
					this.$message({ message: '出错，请稍后再试！',type: 'warning',center: true });
				}
			})			
		},
		handleRefuse(row) {
			this.activeAccept = row;
      axios.post('/material/refuse',{Id: this.activeAccept.recordId}).then((response)=>{
				let res = response.data;
				if (res.status==='0'){
					this.$message({ message: '已拒绝该申请！',type: 'success',center: true });
					this.getApproval()			
				} else {
					this.$message({ message: '出错，请稍后再试！',type: 'warning',center: true });
				}
			})			
		},
		handleSizeChange(val) {
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			this.currentPage = val;
		}
	},
	mounted() {
		this.getApproval()
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
  .el-pagination {
		margin: 30px;
	}
</style>
