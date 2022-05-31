<template>
    <button class="rx-btn" :class="{'disable':disabled, 'rx-btn-highlight':highlight}" @click="handleClick($event)">
        <slot></slot>
    </button>
</template>

<script>
 export default {
   name: 'rx-btn',
   props: {
       disabled: Boolean,
       highlight: Boolean
   },
   methods: {
       handleClick(event){
           if(this.disabled){
               event.preventDefault();
               event.stopPropagation();
               
           }
       }
   },
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style>
.rx-btn{
    display: block;
    padding: 0;
    width: 100%;
    height: 40px;
    line-height: 37px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 16px;
    color: #878787;
    background: #fafafa;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
.rx-btn.active, .rx-btn:active{
    background: #ebebeb;
}
.rx-btn.disable, .rx-btn:disabled{
    background: #fafafa;
    border: 1px solid #e5e5e5;
    color: #ccc;
}
.rx-btn-highlight{
    background: #fa8919;
    color: #fff;
    border: none;
}
.rx-btn-highlight.active, .rx-btn-highlight:active{
    background: #e67e17;
}
.rx-btn-highlight.disable, .rx-btn-highlight:disabled{
    background: #e5e5e5;
    border: none;
    color: #fff;
}
</style>
