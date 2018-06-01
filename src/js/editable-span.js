Vue.component('editable-span', {
	props: ['value','disabled'],
	template: `
		<span class="editable-span">
			<span v-show="!editing" @click="$emit('open')">{{ value }}</span>
			<input type="text" v-show="editing" v-bind:value="value" v-on:input="triggerEdit" />
			<button v-if="!disabled" type="button" v-on:click="editEnd">{{buttonTxt}}</button>
		</span>
	`,
	data() {
		return {
			editing: false,
			buttonTxt: 'edit'
		}
	},
	methods: {
		triggerEdit(e) {
			this.$emit('edit', e.target.value)
		},
		editEnd(){
			this.editing = !this.editing
			if(this.editing){
				this.buttonTxt = 'done'
			}else{
				this.buttonTxt = 'edit'
			}
		},
		enterDone(e){
			e.preventDefault()
			if(e.key === 'Enter'){
				this.editEnd()
			}
		}
	}

})