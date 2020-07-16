class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToTail(value) {
        const node = new Node(value);
        if (!this.head && !this.tail) {
            this.head = node;
            this.tail = this.head;
        }

        this.tail.next = node;
        this.tail = node;
    }

    addToHead(value) {
        const node = new Node(value);
        if (!this.head && !this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }

    }

    removeFromTail() {
        if (!this.tail) {
            return null;
        } else {
            const tail = this.tail;
            let previousToTail = this.head;
            while (previousToTail.next.next) {
                previousToTail = previousToTail.next;
            }

            previousToTail.next = null;
            return tail;
        }
    }

    removeFromHead() {
        if (!this.head) {
            return null;
        } else {
            const head = this.head;
            this.head = this.head.next;

            return head;
        }
    }

    print() {
        const result = [];
        let current = this.head;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        console.log(result);
    }
}

function reverseLinkedList(list) {
    let previous = list.head;
    let current = list.head && list.head.next ? list.head.next : null;
    let following = current.next || null;

    while (current) {
        current.next = previous;

        // edge case: previous is first element in list
        if (previous.next == current) previous.next = null;

        previous = current;
        current = following;
        following = following ? following.next : null; // following is null when current is the last element in the list
    }

    //exchange tail & head
    const temp = list.head;
    list.head = list.tail;
    list.tail = temp;
}

const list = new LinkedList();
list.addToHead(10);
list.addToHead(9);
list.addToHead(8);
list.addToHead(7);

list.print();
reverseLinkedList(list);
list.print();