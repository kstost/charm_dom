// MIT licensed, see LICENSE file
// Copyright (c) 2020 Kim seung tae <monogatree@gmail.com>
import React, { useState, useRef } from 'react'
import gen_rand_value from 'gen_rand_value'
import very_global from 'very_global'

let cmm = require('./lib/ext');
function charmDOM(ref) {
    let t_rnode;
    function rdom(p_req) {
        if (p_req) {
            return t_rnode;
        }
        if (t_rnode && t_rnode.parentNode) {
            if (t_rnode.custom_box && t_rnode.custom_box.Knimation) {
                t_rnode.custom_box.Knimation.remove_dts_from_dom(t_rnode);
            }
            t_rnode.parentNode.removeChild(t_rnode);
        }
        let refNode = ref.current;
        if (refNode) {
            t_rnode = refNode.cloneNode(true);
            let listv = cmm.walk_recursive(refNode, []);
            let listc = cmm.walk_recursive(t_rnode, []);
            for (let i = 0; i < listc.length; i++) {
                cmm.cpp(listv[i], listc[i]);
            }
            cmm.insertAfter(t_rnode, refNode);
            if (!t_rnode.custom_box) {
                t_rnode.custom_box = {};
            }
            t_rnode.custom_box.eid = gen_rand_value(40) + '_' + very_global.unique();

            return t_rnode;
        }
    };
    return [
        {
            style: { display: 'none' },
            ref: ref,
        },
        rdom
    ];
}
export default function () {
    return useRef(charmDOM(useRef())).current;
};
