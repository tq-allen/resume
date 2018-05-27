Vue.component('share',{
	props: ['shareLink'],
	template: `
		<div class="share" v-cloak>
			<div class="share-con">	
				<h3>请将下面链接分享给面试官</h3>
				<textarea readonly>{{shareLink}}</textarea>
			</div>
			<span class="close" @click="$emit('close')">
				<svg class="icon">
					<use xlink:href="#icon-close-empty"></use>
				</svg>
			</span>
		</div>
	`,
})
