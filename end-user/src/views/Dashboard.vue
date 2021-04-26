<template>
  <v-container app>
    <div>
      <AppBar @toMiniVariant="changeMiniVariant" />
      <SideBar :navItems="dashboardNavItems" :miniVariant="miniVariant" />
      <v-main app>
        <router-view></router-view>
      </v-main>
    </div>
    <Footer />
  </v-container>
</template>

<script>
import SideBar from "@/components/SideBar";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";

export default {
  name: "Dashboard",
  methods: {
    changeMiniVariant() {
      this.miniVariant = !this.miniVariant;
    },
  },
  components: {
    SideBar,
    AppBar,
    Footer,
  },
  data() {
    return {
      miniVariant: false,
      dashboardNavItems: [
        {
          title: "Home",
          icon: "fa-home",
          route: { name: "Home" },
        },
        {
          title: "Create Tender",
          icon: "fa-address-card",
          route: { name: "CreateTender" },
        },
        {
          title: "Billing Status",
          icon: "fas fa-coins",
          route: { name: "BillingStatus" },
        }
      ],
    };
  },
  mounted () {
    if (this.$session === undefined )
    {
      this.$router.push('/login');
    }
  },
};
</script>
