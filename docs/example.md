---
navbar: false
sidebar: false
editLink: false
pageClass: example
---

<vuse-builder @saved="onSave"></vuse-builder>

<script>
export default {
  methods: {
    onSave (vuse) {
      vuse.export('preview');
    }
  }
}
</script>

<style>
.example .content {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
}
.example .page {
  padding: 0 !important;
}
.example .content > *:first-child {
  margin: 0 !important;
}
.example .page-edit {
 display: none !important;
}
</style>
