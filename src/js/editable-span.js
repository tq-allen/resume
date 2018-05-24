Vue.component('editable-span', {
	props: ['value','disabled'],
	template: `
		<span class="editable-span">
			<span v-show="!editing">{{ value }}</span>
			<input type="text" v-show="editing" v-bind:value="value" v-on:input="triggerEdit" v-on:blur="editing = !editing"/>
			<button v-if="!disabled" type="button" v-on:click="editing = !editing">edit</button>
		</span>
	`,
	data() {
		return {
			editing: false
		}
	},
	methods: {
		triggerEdit(e) {
			this.$emit('edit', e.target.value)
		}
	}

})