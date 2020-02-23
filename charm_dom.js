// MIT licensed, see LICENSE file
// Copyright (c) 2020 Kim seung tae <monogatree@gmail.com>
import React, { useState, useRef } from 'react'
let cmm = require('./lib/ext');
function charmDOM(ref) {
    let t_rnode;// = this.rnode;
    let uob = {
        rdom() {
            if (t_rnode && t_rnode.parentNode) {
                if (t_rnode.custom_box && t_rnode.custom_box.Knimation) {
                    t_rnode.custom_box.Knimation.remove_dts_from_dom(t_rnode);
                }
                t_rnode.parentNode.removeChild(t_rnode);
            }
            let refNode = this.ref.current;
            if (refNode) {
                t_rnode = refNode.cloneNode(true);
                let listv = cmm.walk_recursive(refNode, []);
                let listc = cmm.walk_recursive(t_rnode, []);
                for (let i = 0; i < listc.length; i++) {
                    cmm.cpp(listv[i], listc[i]);
                }
                cmm.insertAfter(t_rnode, refNode);
                return t_rnode;
            }
        },
    }
    return [{
        style: { display: 'none' },
        ref: ref,
    }, uob.rdom];
}
export default function () {
    return useRef(charmDOM(useRef()));
};
