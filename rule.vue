<template>
	<div class="rule">
		<v-header title="积分规则"></v-header>

		<div v-html="content" class="content has-header">

		</div>
	</div>
</template>


<script>
import userApi from '@/api/userApi'

// Here is some commets.
export default {
	data() {
		return {
			content: '' // Here is some commet.
    }
	},
  /**
   * This is multiple comment
   */
	created() {
		this.requestPointRule()
	},

	methods: {
		async requestPointRule() {
			try {
				const res = await userApi.pointRule()
				this.content = res.data.content
			} catch (error) {
			}
		}
	}
}
</script>