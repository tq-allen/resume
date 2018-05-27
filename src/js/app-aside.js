Vue.component('app-aside',{
	props: ['logoutVisible'],
	template: `
		<aside>
			<ul>
				<li>
					<button type="button" @click="$emit('save')">
						<svg class="icon">
						    <use xlink:href="#icon-save"></use>
						</svg>保存
					</button>
				</li>
				<li>
					<button type="button" @click="$emit('share')">
						<svg class="icon">
						    <use xlink:href="#icon-share"></use>
						</svg>分享
					</button>
				</li>
				<li>
					<button type="button" @click="$emit('print')">
						<svg class="icon">
						    <use xlink:href="#icon-print"></use>
						</svg>打印
					</button>
				</li>
				<li>
					<button type="button" @click="$emit('change-theme')">
						<svg class="icon">
						    <use xlink:href="#icon-changeskin"></use>
						</svg>换肤
					</button>
				</li>
			</ul>
			<ul>		
				<li>
					<button type="button" @click="$emit('login')" v-show="!logoutVisible">
						<svg class="icon">
						    <use xlink:href="#icon-login"></use>
						</svg>登录
					</button>
					<button type="button" @click="$emit('signup')" v-show="!logoutVisible">
						<svg class="icon">
						    <use xlink:href="#icon-signup"></use>
						</svg>注册
					</button>
					<button type="button" @click="$emit('logout')" v-show="logoutVisible">
						<svg class="icon">
						    <use xlink:href="#icon-logout"></use>
						</svg>登出
					</button>
				</li>
			</ul>
		</aside>
	`
})
