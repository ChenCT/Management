<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input size="small" v-model="filters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" icon="el-icon-search" v-on:click="getHistory">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table
	    :data="history.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
	          <el-form-item label="规格">
	            <span>{{ props.row.specification }}</span>
	          </el-form-item>
	          <el-form-item label="数量">
	            <span>{{ props.row.quantity }}</span>
	          </el-form-item>
	          <el-form-item label="价格">
	            <span>{{ props.row.price }}</span>
	          </el-form-item>
	          <el-form-item label="类别">
	            <span>{{ props.row.Category }}</span>
	          </el-form-item>
	          <el-form-item label="二级类别">
	            <span>{{ props.row.secCategory }}</span>
	          </el-form-item>  
	          <el-form-item label="实验室">
	            <span>{{ props.row.laboratory }}</span>
	          </el-form-item>   
	          <el-form-item label="输入日期">
	            <span>{{ props.row.inDate }}</span>
	          </el-form-item>          
	        </el-form>
	      </template>
	    </el-table-column>
	   <!--  <el-table-column type="index" width="50">
    	</el-table-column> -->
	    <el-table-column prop="name" label="名称">
	    </el-table-column>
	    <el-table-column prop="specification" label="规格">
	    </el-table-column>
	    <el-table-column prop="quantity" label="数量">
	    </el-table-column>
	    <el-table-column prop="price" label="价格">
	    </el-table-column>
	    <el-table-column prop="secCategory" label="二级类别">
	    </el-table-column>
	    <el-table-column prop="laboratory" label="实验室">
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
	      :total="this.history.length">
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
			history: [],
			loading: false,
			currentPage: 1,
			pageSize: 10
		}
	},
	computed: {
		...mapState(['nickName'])
	},
	methods: {
		getHistory() {
			this.loading = true
			console.log(this.filters.name)
			let para = {
				name: this.filters.name
			}
			axios.get("/history",{ params: para }).then((response)=>{
				let res = response.data;
				for(let i=0;i<res.result.length;i++){
						res.result[i].inDate = new Date(res.result[i].inDate).toLocaleDateString()
				}
				this.history = res.result;
				this.loading = false
			}).catch((err)=>{
				console.log(err);
			});	
		},
		handleSizeChange(val) {
			this.pageSize = val;
			// this.getHistory();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			// this.getHistory();
		}
		
	},
	mounted() {
		this.getHistory();
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