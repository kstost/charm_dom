// MIT licensed, see LICENSE file
// Copyright (c) 2020 Kim seung tae <monogatree@gmail.com>

module.exports = function (ref) {
    return {
        style: { display: 'none' },
        ref: ref,
        rdom() {
            if (this.rnode && this.rnode.parentNode) {
                this.rnode.parentNode.removeChild(this.rnode);
            }
            let refNode = this.ref.current;
            if (refNode) {
                this.rnode = refNode.cloneNode(true);
                refNode.parentNode.appendChild(this.rnode);
                return this.rnode;
            }
        },
    };
};
