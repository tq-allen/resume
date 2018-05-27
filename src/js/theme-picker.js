Vue.component('themePicker',{
	props: ['theme'],
	create(){
		console.log(this.theme)
	},
	template: `
		<div class="theme-picker" v-cloak>
			<ul>
				<li><span :class="{active: this.theme==='default'}" @click="chooseTheme('default',$event)">默认</span></li>
				<li><span :class="{active: this.theme==='black'}" @click="chooseTheme('black',$event)">暗黑</span></li>
				<li><span :class="{active: this.theme==='pink'}" @click="chooseTheme('pink',$event)">粉红</span></li>
			</ul>
			<span class="close" @click="$emit('close')">
				<svg class="icon">
					<use xlink:href="#icon-close-empty"></use>
				</svg>
			</span>
		</div>
	`,
	methods: {
		chooseTheme(themeName,e){
			document.body.className = themeName
//			this.resume.theme = themeName
			let themePickerItems = document.querySelectorAll('.theme-picker li span')
			themePickerItems.forEach((item)=>{
				item.classList.remove('active')
			})
			let span = e.target
			span.classList.add('active')
			this.$emit('save-theme', themeName)
		}
	}
})
