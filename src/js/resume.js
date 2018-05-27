Vue.component('resume',{
	props: ['mode','displayResume'],
	data(){
		return {
		}
	},
	template: `
		<div class="resume">
			<section class="profile">
				<h1>	
					<editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.name" v-on:edit="$emit('edit', ['name', $event])"></editable-span>
				</h1>
				<p class="job">应聘职位 : <editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.job" v-on:edit="$emit('edit',['job', $event])"></editable-span></p>
				<p class="info">
					<editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.birthday" v-on:edit="$emit('edit',['birthday', $event])"></editable-span>
					|
					<editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.gender" v-on:edit="$emit('edit',['gender', $event])"></editable-span>
					|
					<editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.email" v-on:edit="$emit('edit',['email', $event])"></editable-span>
					|
					<editable-span :disabled="mode === 'preview'" v-bind:value="displayResume.phone" v-on:edit="$emit('edit',['phone', $event])"></editable-span>
				</p>
			</section>
			<section class="skills">
				<h2>技能</h2>
				<ul>
					<li v-for="skill,index in displayResume.skills">
						<editable-span :disabled="mode === 'preview'" v-bind:value="skill.name" v-on:edit="$emit('edit',['skills['+index+'].name', $event])"></editable-span>
						<p>
							<editable-span :disabled="mode === 'preview'" :value="skill.description" @edit="$emit('edit',['skills['+index+'].description', $event])"></editable-span>
						</p>
						<span class="del" v-if="index>3 && mode === 'edit'" @click="$emit('del',['skills',index])">
							<svg class="icon">
								<use xlink:href="#icon-close"></use>
							</svg>
						</span>
					</li>
				</ul>
				<div class="add" v-if="mode === 'edit'"><button type="button" @click="$emit('add','skills')">添加技能</button></div>
			</section>
			<section class="projects">
				<h2>项目介绍</h2>
				<ul>
					<li v-for="project,index in displayResume.projects">
						<header>
							<div>
								<h3 class="name">
									<editable-span :disabled="mode === 'preview'" :value="project.name" @edit="$emit('edit',['projects['+index+'].name', $event])"></editable-span>
								</h3>
								<a class="link" :href="project.link">
									<editable-span :disabled="mode === 'preview'" :value="project.link" @edit="$emit('edit',['projects['+index+'].link', $event])"></editable-span>
								</a>
							</div>	
							<span class="keywords">
								<editable-span :disabled="mode === 'preview'" :value="project.keywords" @edit="$emit('edit',['projects['+index+'].keywords', $event])"></editable-span>
							</span>
						</header>
						<p class="description">
							<editable-span :disabled="mode === 'preview'" :value="project.description" @edit="$emit('edit',['projects['+index+'].description', $event])"></editable-span>
						</p>
						<span class="del" @click="$emit('del',['projects',index])" v-if="index>1 && mode === 'edit'">
							<svg class="icon">
								<use xlink:href="#icon-close"></use>
							</svg>
						</span>
					</li>
				</ul>
				<div class="add" v-if="mode === 'edit'"><button @click="$emit('add','projects')">添加项目</button></div>
			</section>
		</div>
	`
})
