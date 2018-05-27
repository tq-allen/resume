Vue.component('login',{
	props: [],
	template: `
		<div class="login">
			<form class="form" @submit.prevent="onLogin">
				<h2>登录</h2>
				<div class="row">
					<lable>邮箱</lable>
					<input type="text" v-model="login.email" />
				</div>
				<div class="row">
					<lable>密码</lable>
					<input type="password" v-model="login.password" />
				</div>
				<button type="submit">提交</button>
				<div class="alreadyBtn"><a href="#" @click="$emit('go-to-sign-up')">去注册</a></div>
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
			login: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		onLogin() { //登录
			AV.User.logIn(this.login.email, this.login.password).then((user) => {
				user = user.toJSON()
				console.log(user)
				this.$emit('login', user)
			}, function(error) {
				if(error.code === 211) {
					alert('用戶不存在')
				} else if(error.code === 210) {
					alert('邮箱密码不匹配')
				}
			});
		}
	}
})