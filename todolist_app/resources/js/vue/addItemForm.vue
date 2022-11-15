<template>
  <div class="addItem">
    <input type="text" v-model="item.name" ref="focusInput"/>
    <div v-if="flag">
      <font-awesome-icon
      icon="plus-square"
      @click="addItem()"
      :class="[item.name ? 'active' : 'inactive', 'plus']"
      />
    </div>
    <div v-else>
      <font-awesome-icon
      icon="edit"
      @click="editData()"
      :class="[item.name ? 'active' : 'inactive', 'plus']"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editItem: {
      type: Object,
      default() {
        return null;
      }
    },
  },
  watch: {
    editItem(newItem) {
      this.item = newItem;
      this.$refs.focusInput.focus();
      this.flag = false;
    }
  },
  data: function () {
    return {
      item: {
        name: "",
      },
      flag: true
    };
  },
  methods: {
    addItem() {
      if (this.item.name == "") {
        return;
      }
      axios
        .post("api/item/store", {
          item: this.item,
        })
        .then((response) => {
          if (response.status == 201) {
            this.item.name = "";
            this.$emit("reloadlist");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editData(){
      axios
        .put("api/item/" + this.item.id, {
          item: this.item,
        })
        .then((response) =>{
          if(response.status == 200) {
              this.flag = true;
              this.$toast.show("編集完了！", {
                type: "success",
                position: "bottom",
                duration: 1000,
                //dismissible: true
              })
              setTimeout(() =>{window.location.reload();}, 1000);
            }
          })
        .catch((error) => {
          console.log(error);
        })
    },
    getList() {
      axios
        .get("api/items")
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
.addItem {
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  background: #f7f7f7;
  border: 0px;
  outline: none;
  padding: 5px;
  margin-right: 10px;
  width: 100%;
}

.plus {
  font-size: 20px;
}

.active {
  color: #00ce25;
}

.inactive {
  color: #999999;
}
</style>