<template>
  <div class="bg-white m-1 p-2">
    <b-row>
   
      <b-col cols="6">
        <tree-component :tree="treeData"></tree-component>
      </b-col>
      <b-col cols="6">
        ddd
      </b-col>
    </b-row>
    
  </div>
</template>
 
<script>
  import treeComponent from './treeComponent.vue';
  // import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
  import {
        BButton,
        BCollapse,
        BToggle,
      BRow,
      BCol

    } from "bootstrap-vue";
  export default {
    name: 'Accounts',
    components: {
      treeComponent,
      BRow,
      BCol
    },
    // data() {
    //   return {
    //     newTree: {},
    //     data: new Tree([
    //       {
    //         name: 'Node 1',
    //         id: 1,
    //         pid: 0,
    //         dragDisabled: true,
    //         addTreeNodeDisabled: true,
    //         addLeafNodeDisabled: true,
    //         editNodeDisabled: true,
    //         delNodeDisabled: true,
    //         children: [
    //           {
    //             name: 'Node 1-2',
    //             id: 2,
    //             isLeaf: true,
    //             pid: 1
    //           }
    //         ]
    //       },
    //       {
    //         name: 'Node 2',
    //         id: 3,
    //         pid: 0,
    //         disabled: true
    //       },
    //       {
    //         name: 'Node 3',
    //         id: 4,
    //         pid: 0
    //       }
    //     ])
    //   }
    // },
    data() {
      return {
        treeData:[],
      }
    },
    mounted(){
      this.getTreeData();
    },
    
    methods: {
      getTreeData(){
        this.$store.dispatch("accounts/getTree").then((res) => {
          this.treeData = res.data
          console.log(this.treeData)
          console.log('this.treeData')
          console.log(res.data)
        }).catch((error)=>{
          console.log(error);
        })
        ;
      },
      onDel(node) {
        console.log(node)
        node.remove()
      },
 
      onChangeName(params) {
        console.log(params)
      },
 
      onAddNode(params) {
        console.log(params)
      },
 
      onClick(params) {
        console.log(params)
      },
 
      addNode() {
        var node = new TreeNode({ name: 'new node', isLeaf: false })
        if (!this.data.children) this.data.children = []
        this.data.addChildren(node)
      },
 
      getNewTree() {
        var vm = this
        function _dfs(oldNode) {
          var newNode = {}
 
          for (var k in oldNode) {
            if (k !== 'children' && k !== 'parent') {
              newNode[k] = oldNode[k]
            }
          }
 
          if (oldNode.children && oldNode.children.length > 0) {
            newNode.children = []
            for (var i = 0, len = oldNode.children.length; i < len; i++) {
              newNode.children.push(_dfs(oldNode.children[i]))
            }
          }
          return newNode
        }
 
        vm.newTree = _dfs(vm.data)
      }
    }
  }
</script> 
 
<style >
  .vtl {
    .vtl-drag-disabled {
      background-color: #d0cfcf;
      &:hover {
        background-color: #d0cfcf;
      }
    }
    .vtl-disabled {
      background-color: #d0cfcf;
    }
  }
</style> 
 
<style  scoped>
  .icon {
    &:hover {
      cursor: pointer;
    }
  }
 
  .muted {
    color: gray;
    font-size: 80%;
  }
</style> 