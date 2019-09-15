<template>
    <b-row class="justify-content-center">
        <b-col cols="8">
            <b-card header="Login">
                <b-card-text>
                    <b-form @submit.prevent="submit">
                        <b-form-group
                                id="input-group-1"
                                label="Name:"
                                label-for="name"
                        >
                            <b-form-input
                                    :class="{'is-invalid': hasError('name')}"
                                    id="name"
                                    v-model="name"
                                    type="text"
                                    required
                                    placeholder="Enter name"
                            ></b-form-input>
                            <b-form-invalid-feedback v-for="(error, index) in errors['name']" :key="index">
                                {{ error }}
                            </b-form-invalid-feedback>
                        </b-form-group>

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

                        <b-form-group
                                id="input-group-2"
                                label="Confirm Password:"
                                label-for="password_confirmation"
                        >
                            <b-form-input
                                    :class="{'is-invalid': hasError('password_confirmation')}"
                                    id="password_confirmation"
                                    v-model="password_confirmation"
                                    type="password"
                                    required
                                    placeholder="Enter password confirmation"
                            ></b-form-input>
                            <b-form-invalid-feedback v-for="(error, index) in errors['password_confirmation']"
                                                     :key="index">
                                {{ error }}
                            </b-form-invalid-feedback>
                        </b-form-group>

                        <b-button type="submit" variant="primary">Sign up</b-button>
                    </b-form>
                </b-card-text>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import {AUTH_REGISTER} from "../../store/actions/auth";

    export default {
        name: "Registration",
        data: () => {
            return {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                errors: []
            }
        },
        methods: {
            submit() {
                const {name, email, password, password_confirmation} = this
                this.errors = []

                this.$store.dispatch(AUTH_REGISTER, {name, email, password, password_confirmation})
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
