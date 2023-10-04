<template>
    <div>
        <ul class="list-group">
            <li v-for="item in tree" :key="item.id" class="list-group-item tree-node">
                <div @click="toggleVisibility(item)">
                    <span> {{item.path}} -{{ item.name }}</span>
                    <span v-if="item.children && !item.visible">
                        <!-- {{ '▸' }} -->
                        📂
                    </span>
                    <span v-if="item.children && item.visible">
                        <!-- {{ '▾' }} -->
                        📃
                    </span>
                </div>
                <tree-component :tree="item.children" v-if="item.children && item.visible" />
            </li>
        </ul>
        <!-- <ul class="list-group">
            <li v-for="acc in selected_item_accs" :key="acc.id" v-if="selected_item_accs">
                {{ acc.name }}
            </li>
        </ul> -->
    
        
        <!-- {{ tree }} -->
        <!-- <div>
            <b-button aria-controls="collapse-1" variant="primary">Toggle Collapse</b-button>
            <b-collapse visible  id="collapse-1" class="mt-2">
                
                <p class="card-text">Collapse contents Here</p>
                
                
            </b-collapse>
        </div> -->
        <!-- <div v-for="node in tree" :key="node.id">
            <b-button v-b-toggle="'node-' + node.id" class="m-1"> {{  node.name }} </b-button>
            <b-collapse :id="'node-' + node.id">
                <div slot="trigger">
                {{ node.name }}
                </div>
                <tree-component :tree="node.children" v-if="node.children" />
            </b-collapse>
        </div> -->
    
    

    </div>
    
</template>
<script>
    import {
        BButton,
        BCollapse,
        BToggle,
        BDropdown,
        BDropdownItem,

    } from "bootstrap-vue";
    export default {
        name:'treeComponent',
        directives: {
            'b-toggle': BToggle
        },
        props: {
            tree:{
                type:Array,
                default: () => []
            }
        },
        components:{
            BToggle,
            BButton,
            BCollapse,
            BDropdown,
            BDropdownItem,
        },
        data(){
            return{
                node_id :null,
                visibleNodes: [],
                selected_item_accs:null,
            }
        },
        created() {
        this.tree.forEach(node => {
            this.$set(node, "visible", true); 
            if (node.children) {
                this.toggleVisibility(node); 
            }
        });
        },
        methods:{
            toggleVisibility(node) {
                this.$emit('getAcc',node.accounts)
                
                node.visible = !node.visible;
                // console.log(node.visible)
                if (node.visible) {
                    this.visibleNodes.push(node);
                } else {
                    this.visibleNodes.splice(this.visibleNodes.indexOf(node), 1);
                }
                this.selected_item_accs = node.accounts;
                // if (node.accounts) {
                //     this.selected_item_accs = node.accounts;
                // }
                this.$forceUpdate();
            }
        },
    }
</script>
<style scoped>
    .tree-button{
        width:100%; 
        background-color: #000 !important ;
    }
    .tree-node:hover {
        cursor: pointer;
    }
</style>