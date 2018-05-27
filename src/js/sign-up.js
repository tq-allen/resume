Vue.component('signUp',{
	template: `
		<div class="signUp">
			<form class="form" @submit.prevent="onSignUp">
				<h2>注册</h2>
				<div class="row">
					<lable>邮箱</lable>
					<input type="text" v-model="signUp.email" />
				</div>
				<div class="row">
					<lable>密码</lable>
					<input type="password" v-model="signUp.password" />
				</div>
				<button type="submit">提交</button>
				<div class="alreadyBtn">已有账号，<a href="#" @click="$emit('go-to-login')">去登录</a></div>
			</form>	
			<span class="close" @click="$emit('close')">
				<svg class="icon">
					<use xlink:href="#icon-close-empty"></use>
				</svg>
			</span>
		</div>
	`,
	data(){
		return {
			signUp: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		onSignUp() { //注册
			// 新建 AVUser 对象实例
			var user = new AV.User()
			// 设置用户名
			user.setUsername(this.signUp.email)
			// 设置密码
			user.setPassword(this.signUp.password)
			// 设置邮箱
			user.setEmail(this.signUp.email)
			user.signUp().then((user) => {
				user = user.toJSON()
				this.$emit('sign-up', user)
			}, function(error) {
				if(error.code === 203){
					alert(error.rawMessage)
				}
			});
		}
	}
	
})