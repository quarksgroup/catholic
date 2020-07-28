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
    ActiveLocation() {
      return this.$store.getters.ActiveLocation;
    },
    showCountry() {
      if (this.ActiveLocation.country)
        this.country = this.ActiveLocation.country;
      return this.ActiveLocation.country ? false : true;
    },
    showProvince() {
      if (this.ActiveLocation.province)
        this.province = this.ActiveLocation.province;
      return this.ActiveLocation.province ? false : true;
    },
    showSector() {
      if (this.ActiveLocation.sector) this.sector = this.ActiveLocation.sector;
      return this.ActiveLocation.sector ? false : true;
    },
    showGroup() {
      if (this.ActiveLocation.group) this.group = this.ActiveLocation.group;
      return this.ActiveLocation.group ? false : true;
    },
  },
  watch: {
    country() {
      handler: {
        this.$set(this, "province", this.default);
      }
    },
    province() {
      handler: {
        this.$set(this, "sector", this.default);
      }
    },
    sector() {
      handler: {
        this.$set(this, "group", this.default);
      }
    },
  },
};
</script>

<style>
</style>