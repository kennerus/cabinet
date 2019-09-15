<template>
    <div>
        <NavBar />
        <div class="container-fluid">
            <b-row>
                <b-col cols="3">
                    <Sidebar />
                </b-col>
                <b-col cols="9">
                    <router-view></router-view>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/NavBar';
    import Sidebar from '../components/Sidebar';

    export default {
        name: "Cabinet",
        components: {NavBar, Sidebar}
    }
</script>

<style scoped>

</style>
