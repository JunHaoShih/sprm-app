<template>
  <q-item
    v-if="!navNode.children"
    clickable
    tag="a"
    :to="navNode.to"
  >
    <q-item-section v-if="navNode.icon" avatar>
      <q-icon :name="navNode.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ navNode.title }}</q-item-label>
      <q-item-label caption>{{ navNode.caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item
    v-else
    expand-separator
    v-model="expanded"
    :icon="navNode.icon"
    :label="navNode.title"
    :caption="navNode.caption"
    :content-inset-level="navNode.contentInsetLevel ? navNode.contentInsetLevel : 0"
    @click="onExpansionClicked"
  >
    <NavItem
      v-for="child in navNode.children"
      :key="child.title"
      :navNode="child"
    />
  </q-expansion-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { NavNode } from './NavNode';

@Component({})
export default class NavItem extends Vue {
  @Prop
  readonly navNode!: NavNode;

  expanded = false;

  onExpansionClicked() {
    if (this.navNode.to && this.expanded) {
      this.$router.push(this.navNode.to);
    }
  }
}
</script>
