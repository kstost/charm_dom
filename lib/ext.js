module.exports = {
    cpp(dd, vv) {
        let df;
        Object.keys(dd).forEach(key => {
            vv[key] = dd[key];
            if (key.indexOf('__reactEventHandlers') === 0) {
                df = dd[key];
            }
        });
        Object.keys(df).forEach(dvd => {
            if (dvd !== 'children') {
                if (dvd === 'style') {
                    vv.style[dvd] = df[dvd];
                } else {
                    vv[dvd] = df[dvd];
                }
            }
        });
    },
    walk_recursive(el, list) {
        list.push(el);
        if (el.children.length) {
            for (let i = 0; i < el.children.length; i++) {
                this.walk_recursive(el.children[i], list);
            }
        }
        return list;
    },
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
};