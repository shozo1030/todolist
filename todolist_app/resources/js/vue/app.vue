<template>
  <div class="todoListContainer">
    <div class="heading">
      <h2 id="title">TodoList</h2>
      <add-item-form v-on:reloadlist="getList()" :editItem="editItem"  />
    </div>
    <list-view :items="items" v-on:reloadlist="getList()" @custom-click="edit"/>
  </div>
</template>
<script>
import addItemForm from "./addItemForm.vue";
import listView from "./listView.vue";
export default {
  components: {
    addItemForm,
    listView,
  },
  data: function () {
    return {
      items: [],
      editItem: null
    };
  },
  methods: {
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
    },
    edit(edit) {
    this.editItem = this.items.find(i => i.name === edit);
  }
  },
  created() {
    this.getList();
    console.log("create success!");
  },
};
</script>

<style scoped>
.todoListContainer {
  width: 350px;
  margin: auto;
}

.heading {
  background: #e6e6e6;
  padding: 10px;
}

#title {
  text-align: center;
}
</style>
