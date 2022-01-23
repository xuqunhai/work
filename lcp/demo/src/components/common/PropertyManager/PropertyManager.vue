<template>
  <div class="compo-active-item-property">
    <Form :fields="config" :change="change"></Form>
  </div>
</template>

<script>
import Form from 'components/common/Form/Form';
import Utils from 'utils';

export default {
  name: 'xp-property-manager',
  components: {
    'xp-form': Form
  },
  props: {
    config: {
      type: Array,
      default: []
    }
  }
};
</script>