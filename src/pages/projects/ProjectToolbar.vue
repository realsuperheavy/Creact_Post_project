<template>
  <div class="maintoolbar-top">
    <div class="d-flex justify-content-between w-100 pad-30 bg-white">
      <!-- <div class="bread-crumbs">
        <router-link
          class="bread-crumb-item"
          :to="{ name: $routerItems.EXPLORER_PROJECTS }"
          >PROJECTS</router-link
        >
        <div class="bread-crumb-item">
          {{ projectName }}
        </div>
      </div> -->
      <div class="searchbar-top">
        <input type="text" placeholder="Search Projects" @keyup="filterProject()" v-model="keyword">
      </div>
      <!-- <b-button
        pill
        variant="primary"
        @click="showCreateProjectModal"
        class="createpro-btn"
        >New Project</b-button
      > -->
    </div>
    
  </div>
</template>
<script>

export default {
  data() {
    return {
      keyword: ''
    }
  },
  components: {  },
  name: 'ProjectToolbar',
  methods: {
    
    filterProject() {
      this.$root.$emit('filterProject', this.keyword);
    }
  },
  computed: {
    projectName() {
      return this.$store.state.currentProjectName;
    },
  },
};
</script>
<style lang="scss" scoped>
.bread-crumbs {
  display: flex;
  align-items: center;
  .bread-crumb-item {
    font-weight: 500;
    text-transform: uppercase;
    padding: 3px 20px 3px 0;
    border-right: solid 2px var(--gray-light);
    margin-right: 20px;
    &:last-child {
      border-right: none;
    }
  }
}
</style>
