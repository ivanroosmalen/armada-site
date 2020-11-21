<template>
  <div class='account'>
    <div class="account-container">
      <h1>{{translate('updatePassword')}}</h1>

      <form v-on:submit="submit" v-on:submit.prevent>
        <div >
          <div class="input">
            <input v-model="data.oldPassword" type="password" :placeholder="translate('oldPassword')">
          </div>
          <div class="input">
            <input v-model="data.newPassword" type="password" :placeholder="translate('newPassword')">
          </div>

          <div class="button-container">
            <div class="message">{{message}}</div>
            <div class="error">{{error}}</div>
            <button>{{translate('submit')}}</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Account',
  data() {
    return {
      data: {
        oldPassword: '',
        newPassword: ''
      },
      error: '',
      message: ''
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    async submit() {
      try {
        if(!this.data.oldPassword) {
          this.error = this.translate('provideOldPassword')
          return;
        }
        if(!this.data.newPassword) {
          this.error = this.translate('provideNewPassword')
          return;
        }

        this.$store.commit('isLoading', true);
        await this.$store.dispatch('updatePassword', { id: this.user._id, data: this.data })
        this.message = this.translate('passwordUpdated')
      } catch(e) {
        this.error = this.translate('unableUpdatePassword')
      }

      this.$store.commit('isLoading', false);
    }
  }
}
</script>

<style lang="scss" scoped>

.account-container {
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  margin: auto;
  padding-bottom: 20px;

  @include sm {
      width: 500px;
  }
}

.button-container {
    margin-top: 20px;
}

.error {
  color: red;
  font-size: 20px;
}

.input {
  margin-top: 10px
}

.message {
  font-size: 20px
}

input {
  width: 200px;
  height: 25px;
  color: #2e2d2d;
  background-color: #f5f5f5;
  border-width: 1px;
}

button {
  min-width: 150px;
  background-color: rgb(10,42,84);
  color: #efefef;
  border: none;
  border-radius: 15px;
  height: 25px;
}

</style>
