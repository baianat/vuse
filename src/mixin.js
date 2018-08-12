function installMixin ({ builder }) {
  builder.mixin = {
    provide: function providesBuilder () {
      const provides = {};
      if (this.$builder) {
        provides.$builder = this.$builder;
      }

      if (this.$section) {
        provides.$section = this.$section;
      }

      return provides;
    },
    beforeCreate () {
      this.$builder = builder;
      if (!this.$options.propsData || this.$options.propsData.id === undefined) {
        return;
      }
      this.$section = this.$builder.find(this.$options.propsData.id);
      this.$options.computed = {
        $sectionData: function getSectionData () {
          return this.$section.data;
        },
        gridClasses: function getGridClasses () {
          return this.$sectionData.columns.map(column => {
            return Object.keys(column.grid).map(device => {
              if (!column.grid[device]) {
                return '';
              }
              const prefix = this.$builder.columnsPrefix[device]
              return `${prefix}${column.grid[device]}`;
            });
          })
        }
      }
    },
    updated () {
      Array.from(this.$el.querySelectorAll('[contentEditable]')).forEach((el) => {
        el.contentEditable = this.$builder.isEditing;
      });
    }
  };
};

export default installMixin;
