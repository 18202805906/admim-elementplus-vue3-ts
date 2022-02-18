<script >
export default {
  name: 'RenderTooltip',
  props: {
    createElementFunc:{
      type: Function,
      default: () =>{
        ()=>{};
      }
    }
  },
  render (h) {
    return this.createElementFunc(h) ;
  }
};
</script>
