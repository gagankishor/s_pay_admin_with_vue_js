<template>
  <b-card>
    <b-card-body>
      <div :class="`dashboard-card ${variant}`">
        <div class="icon">
          <BootstrapIcon :icon="icon" />
        </div>
        <div class="card-content">
          <h5>{{ heading }}</h5>
          <div>{{ subheading }}</div>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

export default {
  props: ["icon", "heading", "subheading", "variant"],
  name: "DashboardCard",
  components: {
    BootstrapIcon,
  },
};
</script>

<style lang="scss">
.dashboard-card {
  display: flex;
  align-items: center;

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }

  &.warning {
    .icon {
      color: #ff9e43;
      background-color: rgba($color: #ff9e43, $alpha: 0.12);
    }
  }

  &.success {
    .icon {
      color: #29c770;
      background-color: rgba($color: #29c770, $alpha: 0.12);
    }
  }

  &.info {
    .icon {
      color: #04cfe8;
      background-color: rgba($color: #04cfe8, $alpha: 0.12);
    }
  }

  &.danger {
    .icon {
      color: #ea5355;
      background-color: rgba($color: #ea5355, $alpha: 0.12);
    }
  }

  .card-content {
    flex-grow: 1;
    font-size: 14px;

    h5 {
      margin: 0;
    }
  }
}
</style>
