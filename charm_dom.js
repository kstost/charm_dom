// MIT licensed, see LICENSE file
// Copyright (c) 2020 Kim seung tae <monogatree@gmail.com>

module.exports = function (lin) {
    return {
        style: { display: 'none' },
        ref: lin,
        rdom() {
            let refNode = this.ref.current;
            if (this.rnode && this.rnode.parentNode) {
                this.rnode.parentNode.removeChild(this.rnode);
            }
            this.rnode = refNode.cloneNode(true);
            refNode.parentNode.appendChild(this.rnode);
            return this.rnode;
        },
    };
};
