
## Install

```
$ npm install charm_dom
```

## Usage

```js
import React, { useEffect, useRef } from 'react'
import charmDOM from 'charm_dom'
import $ from 'jquery'
export default () => {
  let [val, fn] = useState(1);

  // Declare here with useRef(). This is for you to connect it to your react dom and manipulate the dom with jquery.
  // You can use it with vanilla js without jquery of course.
  // 여기에 useRef() 를 사용해서 선언하세요. 이것은 리액트 돔과 연결하고 당신이 제이쿼리로 주물럭거리기 위한 변수입니다
  // 물론 제이쿼리를 사용하지 않고 바닐라자스로 사용해도 됩니다

  const my_button = useRef(charmDOM(useRef()));

  useEffect(() => {

    // useEffect is called after rendering is done
    // You can manipulate dom with jquery directly here like you've been doing
    // but we have 3 things we should be aware of

    // useEffect 는 렌더링 완료시 호출되는 부분입니다.
    // 여기서 돔에 접근해서 편집하고 수정할 수 있습니다.
    // 하지만 3가지 신경써주세요

    // 1, call rdom() once not over twice in useEffect.
    // 1째로 rdom() 은 useEffect 안에서 1회만 실행해주세요
    let rdom = my_button.current.rdom();

    // 2, Do not select dom by searching with id like $('#hello')
    // 2째로 돔을 id 로 셀렉트하는것을 피해주세요
    $(rdom).css({
      display: '',
      fontSize: 50,
      padding: 50,
      border: '1px solid red'
    });
    $(rdom).click(e => {
      fn(val + 1);
    });

    // 3, Select like $(dom).find('.nav') instead of $('.nav');
    // 3째로 $('.nav') 보다는 $(dom).find('.nav') 의 방법으로 선택해주세요
    $(rdom).find('span').css({
      color: 'green'
    })
    rdom.querySelectorAll('span')[0].style.backgroundColor = 'yellow';

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

