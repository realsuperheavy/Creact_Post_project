<template>
  <section class="login">
    <div v-if="notConfirmed">
      <b-alert show dismissible variant="warning">
        <strong>Heads up!</strong>
        Check your email for a link to confirm your email address.
        <router-link to="" v-on:click.native="init">Click here</router-link>
        if you still can't find it
      </b-alert>
    </div>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto custom-loginview">
              <div class="auth-form-light text-left p-5 rounded">
                <div class="brand-logo">
                  <router-link :to="{ name: $routerItems.LOGIN }">
                    <img src="@/assets/login-logo.png" />
                    <h4>Login</h4>
                  </router-link>
                </div>
                <div class="googlesignup">
                  <a
                    class="btn btn-outline-primary d-block mt-3"
                    :href="$config.appUrl + '/api/google-login'"
                  >
                    <img src="@/assets/images/icons/googles.png" alt="" />
                    Sign in with Google
                  </a>
                  
                </div>
                <!-- <div class="googlesignup">
                  <a  
                    class="btn btn-outline-primary d-block mt-3"
                    :href="$config.appUrl + '/api/facebook-login'"
                  >
                    <img src="@/assets/images/icons/facebook.png" alt="" />
                    Log in with Facebook
                  </a>
                  <div class="mt-3" v-if="googleErrorMessage">
                    <b-alert show dismissible variant="warning">
                      <strong>Heads up!</strong>
                      {{ googleErrorMessage }}
                    </b-alert>
                  </div>
                </div> -->
                <div class="orsepration">
                  <span>or</span>
                </div>            
                <form v-on:submit.prevent="handleSubmit">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      v-model="email"
                      type="email"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      autocomplete="true"
                    />
                  </div>
                  <span v-if="this.errorMessage" class="text-danger">{{
                    errorMessage
                  }}</span>
                  <div class="forgotlogin text-right">
                    <!-- Use keep me logged in -->
                    <!-- <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input" />
                        Keep me logged in
                        <i class="input-helper"></i>
                      </label>
                    </div> -->
                    <router-link
                      :to="{ name: $routerItems.FORGOT_PASSWORD }"
                      class="auth-link"
                      >Forgot password?</router-link
                    >
                  </div>
                  <div class="form-group mt-3">
                    <button
                      type="submit"
                      class="btn auth-form-btn custommain-btn"
                    >
                      Log in
                    </button>
                  </div>
                  <!-- Google Btn -->
                  <!-- <div class="mb-2">
                    <button
                      type="button"
                      class="btn btn-block btn-google auth-form-btn"
                    >
                      <i class=" icon-social-google mr-2"></i>Connect using
                      google
                    </button>
                  </div> -->
                  <div class="text-center mt-4 notamember">
                    Not a member yet?
                    <router-link
                      :to="{ name: $routerItems.REGISTER }"
                      class="text-HelloScribe"
                      >Register now</router-link
                    >
                  </div>
                </form>                
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
import routerItems from "../../../constants/routerItems";
import * as auth from "../../../services/AuthService";
import { http } from "../../../services/HttpService";
export default {
  name: "login",
  data: function () {
    return {
      email: "",
      password: "",
      errorMessage: null,
      notConfirmed: false,
      googleErrorMessage: "",
      googleEmail: "",
    };
  },
  methods: {
    async handleSubmit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      if (this.$route.params.invitation) {
        this.loginByInvitation(this.$route.params.invitation, user);
      } else {
        this.onLogin(user);
      }
    },
    ///Mail NOtif confirmation
    init() {
      http()
        .post("/auth/email/confirm/sent", { email: this.googleEmail?this.googleEmail:this.email })
        .then(
          function (response) {
            if (response) {
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            if (error) {
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }.bind(this)
        );
    },
    onLogin: async function (user) {
      this.notConfirmed = false;
      this.googleErrorMessage = "";
      await auth
        .login(user)
        .then(() =>
          this.$router.push(
            this.$route.query.redirect || {
              name: routerItems.EXPLORER_PROJECTS,
            }
          )
        )
        //this.$router.push({ name: this.$routerItems.DASHBOARD });
        .catch(
          function (error) {
            if (error.response) {
              this.errorMessage = error.response.data.message;
              if (this.errorMessage.includes("not confirmed")) {
                this.notConfirmed = true;
              }
            }
          }.bind(this)
        );
    },
    loginByInvitation: function (token, user) {
      this.googleErrorMessage = "";
      http()
        .post(`/login-invitation/${token}`, user)
        .then(
          function (response) {
            if (response) {
              auth.setSession(response.data.user);
              this.$router.push(
                this.$route.query.redirect || {
                  name: routerItems.EXPLORER_PROJECTS,
                }
              );
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    if (this.$route.query.error) {
      this.googleErrorMessage = this.$route.query.error;
      if (this.googleErrorMessage.includes("not confirmed")) {
        this.notConfirmed = true;
        if (this.$route.query.email) this.googleEmail = this.$route.query.email;
      }
    }
    if (this.$route.query.user) {
      auth.setSession(JSON.parse(this.$route.query.user));
      this.$router.push({ name: this.$routerItems.EXPLORER_PROJECTS });
    }
  },
};
</script>
<style scoped>
  .googlesignup {
    margin-bottom: 5px;
  }
</style>
