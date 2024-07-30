class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BST{
    constructor(){
        this.root = null;
    }

    buildTree(array){
        array.sort((a,b)=> a-b);
        let unique = [...new Set(array)];
        this.root = this.build(unique);
    }

    build(array){
        if(!array.length){
            return null;
        }

        const mid = Math.floor(array.length/2);
        const root = new Node(array[mid]);
        
        root.left = this.build(array.slice(0,mid));
        root.right = this.build(array.slice(mid+1));
        
        return root;
    }

    prettyPrint(node, prefix = "", isLeft=true){
        if(node===null){
            return;
        }
        if(node.right !== null){
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value){
        let node = new Node(value);
        if(this.root==null){
            this.root = node;
            return;
        }
        let temp = this.root;
        while(temp.left||temp.right){
            if(temp.value>value){
                temp = temp.left;
            }
            else{
                temp = temp.right;
            }
        }
        if(temp.value>value){
            temp.left = node;
        }
        else{
            temp.right = node;
        }
    }

    search(value){
        let temp = this.root;
        while(temp){
            if(temp.value == value){
                return temp;
            }
            if(temp.value>value){
                temp = temp.left;
            }
            else{
                temp = temp.right;
            }
        }
        return null;
    }

    findMinNode(node){
        while(node.left!==null){
            node = node.left;
        }
        return node;
    }

    // deleteNode(value, root){
    //     console.log(root);
    //     if(root===null){
    //         return root;
    //     }
    //     if(value<root.value){
    //         root.left = this.deleteNode(root.left, value);
    //     }
    //     else if(value>root.value){
    //         root.right = this.deleteNode(root.right, value);
    //     }
    //     else{
    //         if(root.left===null){
    //             return root.right;
    //         }
    //         else if(root.right===null){
    //             return root.left;
    //         }
    //         console.log(root);
    //         let minNode = this.findMinNode(root.right);

    //         root.value = minNode.value;
    //         root.right = this.deleteNode(root.right, minNode.value);
    //     }
    //     return root;
    // }
}

const tree = new BST();
tree.buildTree([1, 2, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(6);
tree.prettyPrint(tree.root);

tree.deleteNode(2, tree.root);
tree.prettyPrint(tree.root);