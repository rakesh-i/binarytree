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

    prettyPrint(node = this.root, prefix = "", isLeft=true){
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

    find(value){
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

    deleteItem(value){
        this.root = this.deleteNode(value, tree.root);
    }

    deleteNode(value, root){
        if(root===null){
            return root;
        }
        if(value<root.value){
            root.left = this.deleteNode(value, root.left);
        }
        else if(value>root.value){
            root.right = this.deleteNode(value, root.right);
        }
        else{
            
            if(root.left == null){
                return root.right;
            }
            else if(root.right == null){
                return root.left;
            }
            let minNode = this.findMinNode(root.right);
            root.value = minNode.value;
            root.right = this.deleteNode(minNode.value, root.right);
        }
        return root;
    }

    levelOrder(callback, root= this.root){
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
        if(root===null){
            return;
        }
        let queue = [];
        queue.push(root);
        while(queue.length>0){
            callback(queue[0]);
            if(queue[0].left!=null){
                queue.push(queue[0].left);
            }
            if(queue[0].right!=null){
                queue.push(queue[0].right);
            }
            queue.shift();
        }
    }

    inOrder(callback, root=this.root){
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
        if(root===null){
            return;
        }
        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    preOrder(callback, root=this.root){
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
        if(root===null){
            return;
        }
        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    postOrder(callback, root=this.root){
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
        if(root===null){
            return;
        }
        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    printvalue(node){
        console.log(node.value);
    }

    height(root = this.root){
        if(root === null){
            return -1;
        }
        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        return 1+Math.max(leftHeight, rightHeight);
    }

    depth(node, root=this.root){
        if(root===null){
            return -1;
        }
        if(root===node){
            return 0;
        }
        const leftDepth = this.depth(node, root.left);
        if(leftDepth!==-1){
            return 1+ leftDepth;
        }
        const rightDepth = this.depth(node, root.right);
        if(rightDepth!==-1){
            return 1+ rightDepth;
        }
        return -1;
    }

    isBalanced(root = this.root){
        if(root===null){
            return true;
        }
        const leftDepth = this.height(root.left);
        const rightDepth = this.height(root.right);
        if(Math.abs(leftDepth-rightDepth)<=1&&this.isBalanced(root.left)&&this.isBalanced(root.right)){
            return true;
        }
        return false;
    }

    rebalance(){
        let array = [];
        function add(node){
            array.push(node.value);
        }
        this.inOrder(add);
        this.buildTree(array);
    }

}

const tree = new BST();
tree.buildTree([1, 2, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint();
console.log(tree.height());
console.log(tree);