<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
      v-model="account"
      :rules="accountRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
            v-model="password"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="passwordShow ? 'text' : 'password'"
            name="password"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="login"
    >
      Login
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
  </v-form>
</template>

<script>
  import auth from '../auth'
  export default {
    data: () => ({
      valid: true,

      account: 'joe@example.com',
      accountRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      password: 'password',
      passwordShow: false,
      passwordRules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }),

    methods: {
      login () {
        this.$refs.form.validate()
        auth.login(this.account, this.password, loggedIn => {
          if (!loggedIn) {
            this.error = true
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
          }
        })
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
