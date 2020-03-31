<template>
    <div class="about">
        <h1>Hello {{ their_name }}, This is an about page</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
</template>

<script>
    export default {
        name: 'About',
        props: {},
        data() {
            return {
                their_name: this.$route.params.name
            }
        },
        watch: {
            '$route.params.name': function (name) {
                this.their_name = name;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>