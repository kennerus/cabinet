<template>
    <div class="flex-row align-items-center" :style="{minHeight: '100vh'}">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col cols="8">
                    <b-card header="Login">
                        <b-card-text>
                            <b-form @submit.prevent="submit">
                                <b-form-group
                                        id="input-group-1"
                                        label="Email address:"
                                        label-for="email"
                                >
                                    <b-form-input
                                            :class="{'is-invalid': hasError('email')}"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            required
                                            placeholder="Enter email"
                                    ></b-form-input>
                                    <b-form-invalid-feedback v-for="(error, index) in errors['email']" :key="index">
                                        {{ error }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                        id="input-group-2"
                                        label="Password:"
                                        label-for="password"
                                >
                                    <b-form-input
                                            :class="{'is-invalid': hasError('password')}"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required
                                            placeholder="Enter password"
                                    ></b-form-input>
                                    <b-form-invalid-feedback v-for="(error, index) in errors['password']" :key="index">
                                        {{ error }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary">Login</b-button>
                            </b-form>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import {AUTH_REQUEST} from "../../store/actions/auth";

    export default {
        name: "Login",
        data: () => {
            return {
                email: '',
                password: '',
                errors: []
            }
        },
        methods: {
            submit() {
                const {email, password} = this
                this.errors = []

                this.$store.dispatch(AUTH_REQUEST, {email, password})
                    .then(() => {
                        this.$router.push('/cabinet')
                    })
                    .catch((err) => {
                        if (err.response.status === 422) {
                            this.errors = err.response.data.errors
                        }
                    })
            },
            hasError(field) {
                return !!this.errors[field]
            }
        },
    }
</script>

<style scoped>

</style>
