<template>
  <div class="success-page">
    <h3>Congratulations!</h3>
    <p class="text-info font-weight-bold">
      You have successfully upgraded your account.<br />
      Enjoy unlimited access and lifetime updates!
    </p>
    <b-button pill variant="danger" size="lg" @click="gotoDashboard()"
      >Return to Dashboard</b-button
    >
  </div>
</template>
<script>
export default {
  name: "SubscriptionSuccess",
  methods: {
    gotoDashboard() {
      this.$router.push({ name: this.$routerItems.DASHBOARD });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  color: #878686;
}
.success-page {
  min-height: calc(100vh - 170px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>