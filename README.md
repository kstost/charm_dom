
## Install

```
$ npm install charm_dom
```

## Usage

```js
import React, { useEffect, useRef } from 'react'
import charmDOM from 'charm_dom'
import $ from 'jquery' // Not a fundamental module for charm_dom 필수가 아닙니다
export default () => {
  let [val, fn] = useState(1);

  // Declare here with useCharm(). This is for you to connect it to your react dom and manipulate the dom with jquery.
  // You can use it with vanilla js without jquery of course.
  // 여기에 useCharm() 를 사용해서 선언하세요. 이것은 리액트 돔과 연결하고 당신이 제이쿼리로 주물럭거리기 위한 변수입니다
  // 물론 제이쿼리를 사용하지 않고 바닐라자스로 사용해도 됩니다

  const [domRef, getRealDom] = useCharm();

  useEffect(() => {

    // useEffect is called after rendering is done
    // You can manipulate dom with jquery directly here like you've been doing
    // but we have 3 things we should be aware of

    // useEffect 는 렌더링 완료시 호출되는 부분입니다.
    // 여기서 돔에 접근해서 편집하고 수정할 수 있습니다.
    // 하지만 3가지 신경써주세요

    // 1, call getRealDom(true) once not over twice in useEffect. call it only once time after rendering
    // This method returns the dom you can manipulate and access
    // The style.display attirubute of this dom it returns is defaultly 'none'
    // You need to change this attribute if you need. you may need to change it

    // 1째로 getRealDom(true) 는 useEffect 안에서 렌더링 이후시점에 1회만 실행해주세요
    // 이 함수는 당신이 접근하고 조작할 수 있는 돔을 리턴해줍니다
    // 이렇게 리턴받은 돔의 style.display 속성은 기본적으로 'none' 상태입니다.
    // 그래서 이것의 속성을 style.display='' 로 바꾸지 않으면 보이지 않을겁니다
    let rdom = getRealDom(true);

    // It is okay to call getRealDom method without argument like below. return value of this call is the same as rdom above
    // 이렇게 인자를 없이 호출하는건 언제던 가능하며 리턴값은 rdom 과 같습니다
    let rdom2 = getRealDom();
    rdom.style.display = '';
    if (rdom) {

      // 2, Do not select dom by searching with id like $('#hello')
      // 2째로 돔을 id 로 셀렉트하는것을 피해주세요
      $(rdom).css({
        display: '',
        fontSize: 50,
        padding: 50,
        border: '1px solid red'
      });

      // 3, Select like $(dom).find('.nav') instead of $('.nav');
      // 3째로 $('.nav') 보다는 $(dom).find('.nav') 의 방법으로 선택해주세요
      $(rdom).find('.fw').css({ color: 'green' });
      $(rdom).find('.vs').css({ color: '#ff00ee', fontSize: (10 + rdom.custom_value) + 'px' });
      rdom.querySelectorAll('span')[0].style.backgroundColor = 'yellow';

    }

  }, [val]);
  return (
    <div>
      {/* 
       connect domRef to your div as a last attribute
       아래와 같이 당신의 div에 domRef를 연결하세요 가장 마지막에 추가해주세요
      */}
      {
        val % 2 ?
          <div custom_value={val} {...domRef}>
            {val}
            <span className='fw' onClick={e => { fn(val + 1); }}>hello</span>
            <br />
            <span className='vs' onClick={e => { e.target.innerHTML += '3'; }} style={{ backgroundColor: 'green' }}>ffe</span>
          </div>
          :
          <div onClick={() => { fn(val + 1); }}>
            {val}
          </div>
      }
    </div>
  )
}
```

