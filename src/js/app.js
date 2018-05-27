var app = new Vue({
	el: '#app',
	data: {
		editingName: false,
		loginVisible: false,
		signUpVisible: false,
		shareVisible: false,
		themePickerVisible: false,
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
			],
			theme: 'default'
		},
		currentUser: {
			objectId: undefined,
			email: undefined
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
			],
			theme: 'default'
		},
		previewUser: {
			objectId: undefined
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
				this.shareLink = location.origin + location.pathname + '?user_id=' + this.currentUser.objectId
				this.getResume(this.currentUser).then((resume)=>{
					if(resume){
						this.resume = resume
					}
				})
			}
		}
	},
	methods: {
		onEdit(items) {
			var key = items[0]
			var value = items[1]
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
				alert('请先登录')
			}
		},
		saveResume() { //保存简历
			// 第一个参数是 className，第二个参数是 objectId
			let {objectId} = AV.User.current().toJSON()
			let user = AV.Object.createWithoutData('User', objectId);
			// 修改属性
			user.set('resume', this.resume)
			console.log(this.resume)
			// 保存到云端
			user.save().then(()=>{
				alert('保存成功')
			},()=>{
				alert('保存失败')
			})
		},
		onLogin(user) { //登录
			this.currentUser.objectId = user.objectId
			this.currentUser.email = user.email
			this.loginVisible = false
		},
		onSignUp(user){
			this.signUpVisible = false
			this.currentUser.objectId = user.objectId
			this.currentUser.email = user.email
			alert('注册成功')
			console.log('signup successful')
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
		print(){
			if(this.currentUser.objectId){
				window.print()
			}else{
				alert('请先登录')
			}
		},
		themePicker(){
			if(this.currentUser.objectId){
				this.themePickerVisible = true
			}else{
				alert('请先登录')
			}
			
		},
		share(){
			if(this.currentUser.objectId){
				this.shareVisible = true
			}else{
				alert('请先登录')
			}
		},
		savaTheme(themeName){
			this.resume.theme = themeName
		},
		add(items){
			console.log(items)
			if(items === 'skills'){
				this.resume[items].push({name: '请填写技能名称', description: '请填写技能介绍'})
			}else if(items === 'projects'){
				this.resume[items].push(
					{name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'}
				)
			}
		},
		del(items){
			this.resume[items[0]].splice(items[1], 1)
		}
	}
})

//获取当前登录的user
let currentUser = AV.User.current()
if(currentUser) {
	app.currentUser = currentUser.toJSON()
	app.getResume(app.currentUser).then((resume)=>{
		console.log(resume)
		if(resume){	
			app.resume = resume
		}
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
//		console.log(resume)
		app.previewResume = resume
	})
}

