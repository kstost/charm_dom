// MIT licensed, see LICENSE file
// Copyright (c) 2020 Kim seung tae <monogatree@gmail.com>
import React, { useState, useRef } from 'react'
let cmm = require('./lib/ext');
function charmDOM(ref) {
    return {
        style: { display: 'none' },
        ref: ref,
        rdom() {
            if (this.rnode && this.rnode.parentNode) {
                if (this.rnode.custom_box && this.rnode.custom_box.Knimation) {
                    this.rnode.custom_box.Knimation.remove_dts_from_dom(this.rnode);
                }
                this.rnode.parentNode.removeChild(this.rnode);
            }
            let refNode = this.ref.current;
            if (refNode) {
                this.rnode = refNode.cloneNode(true);
                let listv = cmm.walk_recursive(refNode, []);
                let listc = cmm.walk_recursive(this.rnode, []);
                for (let i = 0; i < listc.length; i++) {
                    cmm.cpp(listv[i], listc[i]);
                }
                cmm.insertAfter(this.rnode, refNode);
                return this.rnode;
            }
        },
    };
}
export default function () {
    return useRef(charmDOM(useRef()));
};
