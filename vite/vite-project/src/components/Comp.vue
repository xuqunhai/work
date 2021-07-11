<script lang="jsx">
export default {
    data() {
        return {
            counter: 0
        }
    },
    render() {
        return (
            <div>
                <div>jsx comp hha</div>
                <p onClick={this.onclick}>{this.counter}</p>
            </div>
        )
    },
    methods: {
        onclick() {
            this.counter++
        }
    }
}
</script>

<style>

</style>