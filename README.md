
## Install

```
$ npm install charm_dom
```

## Usage

```js
import React, { useEffect, useRef } from 'react'
import charmDOM from 'charm_dom'
export default () => {
  let [val, fn] = useState(1);

  // Declare here with useRef(). This is for you to connect it to your react dom and manipulate the dom with jquery
  // 여기에 useRef() 를 사용해서 선언하세요. 이것은 리액트 돔과 연결하고 당신이 제이쿼리로 주물럭거리기 위한 변수입니다
  const my_button = useRef(charmDOM(useRef())); 

  useEffect(() => {

    // useEffect is called after rendering is done
    // You can manipulate dom with jquery directly here like you've been doing
    // but we have two things we should be aware of
    // first, Do not select dom by searching with id like $('#hello')
    // second, Select like $(my_button.current.rdom()).find('.nav') instead of $('.nav');
    let node = $(my_button.current.rdom());
    node.css({
      display: '',
      fontSize: 50,
      padding: 50,
      border: '1px solid red'
    });
    node.find('span').css({
      color:'green'
    })

    node.click(e => {
      fn(val + 1);
    });

  }, [val]);
  return (
    <div>
      {/* 
       connect my_button to your button by adding ref, style like below
       아래와 같이 당신의 버튼의 ref와 style 속성에 my_button를 연결하세요
      */}
      <button ref={my_button.current.ref} style={my_button.current.style}>
        {val}
        <span>hello</span>
      </button>
    </div>
  )
}

```

