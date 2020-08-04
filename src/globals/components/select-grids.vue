<template>
  <div class="select-grids">
    <b-field label="Country:" v-if="showCountry">
      <b-select
              placeholder="select country..."
              class="br-1"
              v-model="countryID"
              validation-message=" "
              :disabled="countryOptions.length < 1"
      >
          <!--        <option :value="null" selected="selected">All</option>-->
          <option
                  :value="country.id"
                  v-for="country in countryOptions"
                  :key="country.id"
          >{{country.name}}
          </option>
      </b-select>
    </b-field>

    <b-field label="Province:" v-if="showProvince">
      <b-select
              placeholder="select province..."
              class="br-1"
              v-model="provinceID"
              validation-message=" "
              :disabled="provinceOptions.length < 1"
              :required="!showCountry"
      >
        <option :value="null" selected="selected">All</option>
        <option
          :value="province.id"
          v-for="province in provinceOptions"
          :key="province.id"
        >{{province.name}}</option>
      </b-select>
    </b-field>

    <b-field label="Sector:" v-if="showSector">
      <b-select
              placeholder="select sector..."
              class="br-1"
              v-model="sectorID"
              validation-message=" "
              :disabled="sectorOptions.length < 1"
              :required="!showProvince"
      >
        <option :value="null" selected="selected">All</option>
        <option :value="sector.id" v-for="sector in sectorOptions" :key="sector.id">{{sector.name}}</option>
      </b-select>
    </b-field>

    <b-field label="Groupe de priere:" v-if="showGroup && canSelectGroup">
      <b-select
              placeholder="select Gr.Priere..."
              class="br-1"
              v-model="groupID"
              validation-message=" "
              :disabled="groupOptions.length < 1"
              :required="!showSector"
      >
        <option :value="null" selected="selected">All</option>
        <option :value="group.id" v-for="group in groupOptions" :key="group.id">{{group.name}}</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "select-grids-component",
  data() {
    return {
        countryID: '1',
        provinceID: null,
        sectorID: null,
        groupID: null,
    };
  },
  computed: {
      user() {
          return this.$store.getters.userDetails;
      },
      canSelectGroup(){
        return this.user.role.slug!="groupe"
      },
      location() {
          return this.$store.getters.location;
      },
      ActiveLocation() {
          return this.$store.getters.ActiveLocation;
      },
      countryOptions() {
          return [this.$countryOptions()].flat();
      },
      provinceOptions() {
      return [this.$provinceOptions(this.countryID)].flat();
    },
    sectorOptions() {
      return [this.$sectorOptions(this.provinceID)].flat();
    },
    groupOptions() {
      return [this.$groupOptions(this.sectorID)].flat();
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
    countryID() {
      handler: {
          let country = null;
          if (!this.showCountry) {
              country = this.ActiveLocation.country.id;
          } else {
              const options = this.countryOptions.filter((item) => item.id == this.countryID);
              country = options[0] ? options[0].id : null
          }

          this.$emit("setcountry", country);
          this.$set(this, "provinceID", null);
          if (!this.showProvince) this.initialize();
      }
    },
    provinceID() {
      handler: {
          let province = null;
          if (!this.showProvince) {
              province = this.ActiveLocation.province.id;
          } else {
              const options = this.provinceOptions.filter((item) => item.id == this.provinceID);
              province = options[0] ? options[0].id : null
          }
          this.$emit("setprovince", province);
          this.$set(this, "sectorID", null);
          if (!this.showSector) this.initialize();
      }
    },
    sectorID() {
      handler: {
          let sector = null;
          if (!this.showSector) {
              sector = this.ActiveLocation.sector.id;
          } else {
              const options = this.sectorOptions.filter((item) => item.id == this.sectorID);
              sector = options[0] ? options[0].id : null
          }
          this.$emit("setsector", sector);
          this.$set(this, "groupID", null);
          if (!this.showGroup) this.initialize();
      }
    },
    groupID() {
      handler: {
          /*   let group = !this.showGroup
               ? this.ActiveLocation.group.id
               : this.groupOptions.filter((item) => item.id == this.groupID)[0].id;*/
          let group = null;
          if (!this.showSector) {
              group = this.ActiveLocation.group.id;
          } else {
              const options = this.groupOptions.filter((item) => item.id == this.groupID);
              group = options[0] ? options[0].id : null
          }
          this.$emit("setgroup", group);
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
        this.$set(this, "countryID", this.ActiveLocation.country.id);
      if (this.ActiveLocation.province)
        this.$set(this, "provinceID", this.ActiveLocation.province.id);
      if (this.ActiveLocation.sector)
        this.$set(this, "sectorID", this.ActiveLocation.sector.id);
      if (this.ActiveLocation.group)
        this.$set(this, "groupID", this.ActiveLocation.group.id);
    },
    clear() {
      if (this.showCountry == false) this.$set(this, "countryID", null);
      if (this.showProvince == false) this.$set(this, "provinceID", null);
      if (this.showSector == false) this.$set(this, "sectorID", null);
      if (this.showGroup == false) this.$set(this, "groupID", null);
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