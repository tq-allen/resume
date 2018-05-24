var app = new Vue({
	el: '#app',
	data: {
		editingName: false,
		loginVisible: false,
		signUpVisible: false,
		shareVisible: false,
		shareLink: '',
		resume: {
			name: '姓名',
			gender: '女',
			email: 'XXX@xxx.com',
			birthday: '1990年2月',
			phone: '13212345678',
			job: '前端工程师',
			skills: [
				{name: '请填写技能名称', description: '请填写技能介绍'},
				{name: '请填写技能名称', description: '请填写技能介绍'},
				{name: '请填写技能名称', description: '请填写技能介绍'},
				{name: '请填写技能名称', description: '请填写技能介绍'},
			],
			projects: [
				{name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
				{name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'}
			]
		},
		signUp: {
			email: '',
			password: ''
		},
		login: {
			email: '',
			password: ''
		},
		currentUser: {
			objectId: undefined,
			email: undefined
		},
		previewUser: {
			objectId: undefined
		},
		previewResume: {
			name: '姓名',
			gender: '女',
			email: 'XXX@xxx.com',
			birthday: '1990年2月',
			phone: '13212345678',
			job: '前端工程师',
			skills: [
				{name: '请填写技能名称', description: '请填写技能介绍'},
				{name: '请填写技能名称', description: '请填写技能介绍'},
				{name: '请填写技能名称', description: '请填写技能介绍'},
				{name: '请填写技能名称', description: '请填写技能介绍'},
			],
			projects: [
				{name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
				{name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'}
			]
		},
		mode: 'edit' //preview
	},
	computed: {
		displayResume(){
			return this.mode === 'preview' ? this.previewResume : this.resume
		}
	},
	watch: {//监听currentUser.objectId的变化，一旦变化就执行对应的函数
		'currentUser.objectId': function(newValue,oldValue){
			if(newValue){
				this.getResume(this.currentUser).then((resume)=>{
					this.resume = resume
				})
			}
		}
	},
	methods: {
		onEdit(key, value) {
			let reg = /\[(\d+)\]/
			key = key.replace(reg, (match, number)=> `.${number}`)
			keys = key.split('.')
			let result = this.resume
			for(let i=0; i<keys.length; i++){
				if(i === keys.length - 1){
					result[keys[i]] = value					
				}else{
					result = result[keys[i]]
				}
			}
		},
		onClickSave() {
			var currentUser = AV.User.current()
			if(currentUser) { //判断是否登录
				//保存简历
				this.saveResume()
			} else {
				//去登陆
				this.loginVisible = true
			}
		},
		saveResume() { //保存简历
			// 第一个参数是 className，第二个参数是 objectId
			let {objectId} = AV.User.current().toJSON()
			let user = AV.Object.createWithoutData('User', objectId);
			// 修改属性
			user.set('resume', this.resume)
			// 保存到云端
			user.save().then(()=>{
				alert('保存成功')
			},()=>{
				alert('保存失败')
			})
		},
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
				this.signUpVisible = false
				user = user.toJSON()
				this.currentUser.objectId = user.objectId
				this.currentUser.email = user.email
				alert('注册成功')
			}, function(error) {
				if(error.code === 203){
					alert(error.rawMessage)
				}
			});
		},
		onLogin() { //登录
			AV.User.logIn(this.login.email, this.login.password).then((user) => {
				user = user.toJSON()
				this.currentUser.objectId = user.objectId
				this.currentUser.email = user.email
				this.loginVisible = false
			}, function(error) {
				if(error.code === 211) {
					alert('用戶不存在')
				} else if(error.code === 210) {
					alert('邮箱密码不匹配')
				}
			});
		},
		logOut() {
			AV.User.logOut()
			alert('注销成功')
			window.location.reload()
		},
		getResume(user) {
			var query = new AV.Query('User');
			return query.get(user.objectId).then((user) => {
				// 成功获得实例
				// todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
//				console.log(user.toJSON())
//				Object.assign(this.resume, user.toJSON().resume)
				let resume = user.toJSON().resume
				return resume
			}, function(error) {
				// 异常处理
			});
		},
		addSkill(){
			this.resume.skills.push({name: '请填写技能名称', description: '请填写技能介绍'})
		},
		delSkill(index){
			this.resume.skills.splice(index,1)
		},
		addProject(){
			this.resume.projects.push(
				{name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'}
			)
		},
		delProject(index){
			this.resume.projects.splice(index,1)
		}
	}
})

//获取当前登录的user
let currentUser = AV.User.current()
if(currentUser) {
	app.currentUser = currentUser.toJSON()
	console.log(location)
	app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
	app.getResume(app.currentUser).then((resume)=>{
		console.log(resume)
		app.resume = resume
	})
}

//获取预览的用户id
let search = location.search
let reg = /user_id=(\w+)/
let matchs = search.match(reg)
if(matchs){
	app.mode = 'preview'
	app.previewUser.objectId = matchs[1]
	app.getResume(app.previewUser).then((resume)=>{
		console.log(resume)
		app.previewResume = resume
	})
}

