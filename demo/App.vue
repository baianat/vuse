<template>
  <VuseBuilder @saved="onSave" />
</template>

<script>
export default {
  name: 'App',
  methods: {
    onSave (vuse) {
      vuse.export('preview');
      vuse.export('pwa');
    }
  }
}
</script>
