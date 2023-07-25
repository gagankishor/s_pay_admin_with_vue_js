<template>
  <b-container fluid>
    <b-row>
      <b-col sm="3" class="mb-4 text-center">
        <dashboard-card :heading="galleries ? galleries.title : 0"  subheading="Company" icon="bag"
          variant="warning" />
        <!-- <p>{{ galleries }}</p> -->

      </b-col>

      <b-col sm="3" class="mb-4 text-center">
        <dashboard-card :heading="galleries ? galleries.title : 0" subheading="USER " icon="bag"
          variant="success" />
      </b-col>

      <b-col sm="3" class="mb-4 text-center">
        <dashboard-card :heading="galleries ? galleries.title : 0" subheading="Service" icon="bag"
          variant="info" />
      </b-col>

      <b-col sm="3" class="mb-4 text-center">
        <dashboard-card :heading="galleries ? galleries.title : 0" subheading="Total" icon="bag"
          variant="danger" />
      </b-col>
    </b-row>

    <!-- <b-row>
      <b-col sm="12" class="mb-4">
        <b-card title="Purchase & Sales">
          <BarChart v-bind="barChartProps" />
        </b-card>
      </b-col>
      <b-col sm="12" class="mb-4">
        <b-card title="Recently Added Invoice">
          <b-table hover :items="items" :fields="fields"></b-table>
        </b-card>
      </b-col>
    </b-row> -->
  </b-container>
</template>

<script>

import DashboardCard from "../components/DashboardCard.vue";
import ApiExecute from '@/api';
import moment from "moment"
// import { Chart, registerables } from "chart.js";
// import { BarChart, useBarChart } from "vue-chart-3";
// import { computed, ref } from "vue";

// Chart.register(...registerables);

export default {
  name: "AdminDashboard",
  components: { DashboardCard },
  data() {
    return {
      galleries: null,
      count: '',
      fields: [
        {
          key: "last_name",
          sortable: true,
        },
        {
          key: "first_name",
          sortable: false,
        },
        {
          key: "age",
          label: "Person age",
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          //   variant: "danger",
        },
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
  mounted() {
    this.fetchTypes()
  },

  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('DD-MMM-YYYY hh:mm:ss')
      }
    },
    async fetchTypes(page = 1) {
      this.loading = true;
      let apiResponse = await ApiExecute(
        `service/?page=${page}&limit=${this.limit}&search=${this.search}`
      );
      this.loading = false;
      if (apiResponse.status) this.galleries = apiResponse.data;
    },
  },
  watch: {
    search() {
      this.fetchTypes(1)
    },
    limit() {
      this.fetchTypes(1)
    }
  },
  // setup() {
  //   const data = ref([30, 40, 60, 70, 5]);

  //   const chartData = computed(() => ({
  //     labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  //     datasets: [
  //       {
  //         data: data.value,
  //         backgroundColor: [
  //           "#77CEFF",
  //           "#0079AF",
  //           "#123E6B",
  //           "#97B0C4",
  //           "#A5C8ED",
  //         ],
  //       },
  //     ],
  //   }));

  //   const { barChartProps, barChartRef } = useBarChart({
  //     chartData,
  //   });

  //   return { barChartProps, barChartRef };
  // },
};
</script>