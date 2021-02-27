<template>
 <canvas class="vchart" v-el:chart-canvas :width="width" :height="height"></canvas>
</template>

<script>
import Chart from './chart.js'
 export default {
   methods: {
       parseCommonOptions(options){
           if(this.responsive!==null){
               options.responsive = this.responsive
           }
           if(this.legend!==null){
               options.legend = this.legend
           }
           return options
       }
   },
   computed: {
       chartData(){
           return {
               labels: this.labels,
               datasets: this.datasets
           }
       },
       chartOptions(){
           let options = {}
           options = this.parseCommonOptions(options)
           if(this.parseCommonOptions){
               options = this.parseCommonOptions(options)
           }
           return Object.assign(this.options,options)
       }
   },
   watch: {
       datasets: {
           handler(val,oldVal){
               this.chartInstance.data.datasets = val
               this.chartInstance.update()
           }
       }
   },
   data(){
    return {
        chartInstance: null
    }
   },
   ready(){
    const chartCanvas = this.$els.chartCanvas
    const ctx = chartCanvas.getContext('2d')
    this.chartInstance = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions
    })
   },
   props: {
       chartType: {
           type: String,
           default: 'line'
       },
       width: {
           type: Number
       },
       height: {
           type: Number
       },
       labels: {
           type: Array,
           validator(value){
               return value.every(label=>typeof label==='string')
           },
           default(){return []}
       },
       datasets: {
           type: Array,
           validator(value){
               return value.every(series=>{
                   return Array.isArray(series.data)&&series.data.every(val=>{
                       return typeof val==='number'
                   })
               })
           },
           coerce(val){
             return JSON.parse(JSON.stringify(val))
           },
           default(){return []}
       },
       options: {
           type: Object,
           default(){return []}
       },
       responsive: {
           type: Boolean,
           default: null
       },
       legend: {
           coerce(val){
               if(typeof val==='boolean'){
                   return {display: val}
               }
           },
           default: null
       }
       
   },
   components: {

   }
 }
</script>

<style>

 
</style>
