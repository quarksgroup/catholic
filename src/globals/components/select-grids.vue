<template>
  <div class="select-grids">
    <b-field label="Country:" v-if="showCountry">
      <b-select
        placeholder="select country..."
        class="br-1"
        v-model="country"
        validation-message=" "
        :disabled="countryOptions.length < 2"
      >
        <option
          :value="country"
          v-for="country in countryOptions"
          :key="country.id"
        >{{country.name}}</option>
      </b-select>
    </b-field>

    <b-field label="Province:" v-if="showProvince">
      <b-select
        placeholder="select province..."
        class="br-1"
        v-model="province"
        validation-message=" "
        :disabled="provinceOptions.length < 2"
      >
        <option
          :value="province"
          v-for="province in provinceOptions"
          :key="province.id"
        >{{province.name}}</option>
      </b-select>
    </b-field>

    <b-field label="Sector:" v-if="showSector">
      <b-select
        placeholder="select sector..."
        class="br-1"
        v-model="sector"
        validation-message=" "
        :disabled="sectorOptions.length < 2"
      >
        <option :value="sector" v-for="sector in sectorOptions" :key="sector.id">{{sector.name}}</option>
      </b-select>
    </b-field>

    <b-field label="Groupe de priere:" v-if="showGroup">
      <b-select
        placeholder="select Gr.Priere..."
        class="br-1"
        v-model="group"
        validation-message=" "
        :disabled="groupOptions.length < 2"
      >
        <option :value="group" v-for="group in groupOptions" :key="group.id">{{group.name}}</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "select-grids-component",
  data() {
    return {
      country: { name: "all", id: null },
      province: { name: "all", id: null },
      sector: { name: "all", id: null },
      group: { name: "all", id: null },
      default: { name: "all", id: null },
    };
  },
  computed: {
    location() {
      return this.$store.getters.location;
    },
    ActiveLocation() {
      return this.$store.getters.ActiveLocation;
    },
    countryOptions() {
      return [this.default, this.$countryOptions()].flat();
    },
    provinceOptions() {
      return [this.default, this.$provinceOptions(this.country)].flat();
    },
    sectorOptions() {
      return [this.default, this.$sectorOptions(this.province)].flat();
    },
    groupOptions() {
      return [this.default, this.$groupOptions(this.sector)].flat();
    },
    showCountry() {
      return this.ActiveLocation.country ? false : true;
    },
    showProvince() {
      return this.ActiveLocation.province ? false : true;
    },
    showSector() {
      return this.ActiveLocation.sector ? false : true;
    },
    showGroup() {
      return this.ActiveLocation.group ? false : true;
    },
  },
  watch: {
    country() {
      handler: {
        this.initialize();
        this.$set(this, "province", this.default);
        this.$emit("setcountry", this.country);
        console.log(this.country);
      }
    },
    province() {
      handler: {
        this.initialize();
        this.$emit("setprovince", this.province);
        this.$set(this, "sector", this.default);
      }
    },
    sector() {
      handler: {
        this.initialize();
        this.$emit("setsector", this.sector);
        this.$set(this, "group", this.default);
      }
    },
    group() {
      handler: {
        this.initialize();
        this.$emit("setgroup", this.group);
      }
    },
  },
  created() {
    this.$parent.$on("clear-select", this.clear);
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    initialize() {
      if (this.ActiveLocation.country)
        this.$set(this, "country", this.ActiveLocation.country);
      if (this.ActiveLocation.province)
        this.$set(this, "province", this.ActiveLocation.province);
      if (this.ActiveLocation.sector)
        this.$set(this, "sector", this.ActiveLocation.sector);
      if (this.ActiveLocation.group)
        this.$set(this, "group", this.ActiveLocation.group);
    },
    clear() {
      if (this.showCountry == false) this.$set(this, "country", this.default);
      if (this.showProvince == false) this.$set(this, "province", this.default);
      if (this.showSector == false) this.$set(this, "sector", this.default);
      if (this.showGroup == false) this.$set(this, "group", this.default);
    },
  },
};
</script>

<style lang="scss">
.select-grids {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  align-items: start;
  justify-content: center;
  margin-bottom: 1.5rem;
  width: 100%;

  .field {
    margin-bottom: 0;
    .select {
      &::after {
        border-color: #868484 !important;
      }
    }
    select {
      width: 100%;
      &:disabled {
        border-color: #dbdbdb;
      }
    }
  }
  .select {
    width: 100%;
  }
}
</style>