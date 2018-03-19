<template>
	<el-row class="container">
	  <el-col :span="24" class="header">
	  	<el-col :span="12" class="logo">实验室物资智能管理系统</el-col>
	  	<el-col :span="12" class="log">
	  		<span v-text="nickName" v-if="nickName" style="margin-right: 20px;line-height:16px"></span>
	  		<el-button type="text" v-if="!nickName" @click="loginVisible = true">登录</el-button>
	  		<el-button type="text" v-if="nickName" @click="logout">退出</el-button>
	  	</el-col>	
		</el-col>
	  <el-col :span="24" class="main">
	    <el-col :span="5" class="aside">
	    	<el-menu 
	    	background-color="#eef1f6"
	    	text-color="#909399"
	    	unique-opened
	    	:default-active="$route.path.index"
	    	:default-openeds="['2']">
			      <el-menu-item index="1" @click="$router.push('/overview')">
			      	<i class="el-icon-menu"></i><span slot="title">主页</span>
			      </el-menu-item>
		      	<el-submenu index="2">
			        <template slot="title"><i class="el-icon-menu"></i>物资信息</template>
			        <el-menu-item-group class="menu-item-group">
			          <el-menu-item index="2-1" @click="$router.push('/instrument')">仪器</el-menu-item>
			          <el-menu-item index="2-2" @click="$router.push('/refractories')">耐火材料</el-menu-item>
			          <el-menu-item index="2-3" @click="$router.push('/chemical')">药品</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-menu-item index="3" @click="$router.push('/location')">
			      	<i class="el-icon-menu"></i><span slot="title">位置信息</span>
			      </el-menu-item>
			      <el-submenu index="4">
			        <template slot="title"><i class="el-icon-search"></i>导航4</template>
			        <el-menu-item-group class="menu-item-group">
			          <el-menu-item index="4-1">dcc</el-menu-item>
			          <el-menu-item index="4-2">4-2</el-menu-item>
			        </el-menu-item-group>
			      </el-submenu>
			  </el-menu>
	    </el-col>
	    <el-col :span="19"  class="content">
	      <section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="breadcrumb-container">
							<strong class="title">{{$route.name}}</strong>
							<el-breadcrumb separator="/" class="breadcrumb-inner">
								<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
			</el-col>
	  </el-col>
	  <el-dialog title="系统登录" :visible.sync="loginVisible" center width="450px">
			<el-form label-position="left"  label-width="80px" :model="loginForm" :rules="loginRules" ref="loginForm">
				<el-form-item label="账号" prop="id">
					<el-input v-model="loginForm.id"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginForm.password"></el-input>
				</el-form-item>
				<!-- <el-form-item label="" v-show="loginError" style="margin-bottom:0; color: #f56c6c;"> -->
					<span v-show="loginError" style="margin-bottom:0; margin-left: 80px; color: #f56c6c;"><i class="el-icon-warning"></i>用户名或密码错误</span>
				<!-- </el-form-item> -->		
			</el-form>
			<div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('loginForm')">取 消</el-button>
		    <el-button type="primary" @click="login">确 定</el-button>
		  </div>
		</el-dialog>
	<!-- 	<el-alert
	    title="消息提示的文案"
	    type="warning"
	    show-icon>
	  </el-alert> -->
	</el-row>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default{
	data(){
		return{
			loginVisible: false,
			loginError: false,
			loginForm: {
				id: '',
				password: ''
			},
			loginRules: {
				id: [
					{ required: true, message: '请输入登录账号', trigger: 'changed' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'changed' }
				]
			}
		}
	},
	computed: {
		...mapState(['nickName'])
	},
	methods: {
		checkLogin() {
			axios.get("/users/checkLogin").then((response)=>{
        let res = response.data;
        if(res.status==='0'){
          this.$store.commit("updateUserInfo",res.result.userName);
        }
      });
		},
		login() {
			axios.post('/users/login',{
				userId:this.loginForm.id,
        userPwd:this.loginForm.password
			}).then((response)=>{
				let res = response.data;
				if (res.status==='0'){
					this.$store.commit("updateUserInfo",res.result.userName);
					this.loginVisible = false
					this.loginError = false

					let nowDate = new Date().getTime()
					let graduation = new Date(res.result.graduation).getTime()
					let countdown = (graduation - nowDate)/(1000*3600*24)
					if( countdown < 150 ){
						this.$notify.info({
							title: '消息',
							message: '请于毕业前归还物资',
							duration: 0
						});
					}
				} else {
					this.loginError = true
				}
			})
		},
		logout() {
			axios.post("/users/logout").then((response)=>{
        let res = response.data;
        if(res.status==='0'){
          this.$store.commit("updateUserInfo","");
        }
      });
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.loginVisible = false;
			this.loginError = false;
		}
	},
	mounted() {
		if(this.$route.path =='/'){
			this.$router.push('/overview')
		}	
		this.checkLogin()
	}
}
</script>

<style lang="scss" scoped="" type="text/css">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		left: 0px;
		.header {
			text-align: center;
			background-color: #B3C0D1;
    	color: #fff;
    	height: 60px;
    	line-height: 60px;
    	.logo {
    		text-align: left;
    		padding-left: 50px;
    		font-size: 22px;
    	}
    	.log {
    		text-align: right;
    		padding-right: 10px;
    		.el-button {
    			margin-right: 20px;
    			color: #fff;
    		}
    	}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			.aside {  
			    flex:0 0 230px;
				width: 230px;
			    .el-menu {					
					height: 100%;
					.el-submenu {
						background-color: #e4e8f1;
					}
				}
		  	}
		    .content {
			    height: 100%;
			    padding: 20px 0 20px 20px;
			    flex:1;
			    .content-container {
					padding-right: 10px;
					height: 100%;
					flex:1;
					overflow-y: auto;
					.grid-content  {
						height: 100%;
						.breadcrumb-container {
							.title {
								line-height: normal;
								float: left;
							}
							.breadcrumb-inner {
								float: right;
							}
						}
					}
				}
			}
		}
		.el-dialog .el-form .el-form-item .el-input {
			width: 300px;
		}
	}
</style>
