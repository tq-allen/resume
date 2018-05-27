Vue.component('themePicker',{
	template: `
		<div class="theme-picker" v-cloak>
			<ul>
				<li><span @click="chooseTheme('default',$event)">默认</span></li>
				<li><span @click="chooseTheme('black',$event)">暗黑</span></li>
				<li><span @click="chooseTheme('pink',$event)">粉红</span></li>
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
			this.$emit('save-theme', themeName)
			var themePickerItems = document.querySelectorAll('.theme-picker li span')
			themePickerItems.forEach((item)=>{
				item.classList.remove('active')
			})
			var span = e.target
			span.classList.add('active')
		}
	}
})
