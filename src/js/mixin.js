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
      if (this.$options.propsData && this.$options.propsData.id !== undefined) {
        this.$section = this.$builder.find(this.$options.propsData.id);
        if (!this.$options.computed) {
          this.$options.computed = {};
        }

        this.$options.computed = {
          $sectionData: function getSectionData () {
            return this.$section.data;
          },
          gridClasses: function () {
            return this.$sectionData.columns.map((column) => {
              return Object.keys(column.grid).map((device) => column.grid[device]);
            })
          }
        }
      }
    },
    mounted () {
      Array.from(this.$el.querySelectorAll('.is-editable')).forEach((el) => {
        el.contentEditable = 'true';
      });
    },
    updated () {
      Array.from(this.$el.querySelectorAll('[contentEditable]')).forEach((el) => {
        el.contentEditable = this.$builder.isEditing;
      });
    }
  };
};

export default installMixin;
