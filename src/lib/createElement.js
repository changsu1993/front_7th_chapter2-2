import { addEvent } from "./eventManager";

export function createElement(vNode) {
  // 1. vNode가 null, undefined, boolean일 경우 빈 텍스트 노드 반환
  if (vNode == null || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드 생성
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  // 3. vNode가 배열이면 DocumentFragment 생성
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement(child));
    });
    return fragment;
  }

  // 4. 함수형 컴포넌트인 경우 에러 발생
  if (typeof vNode.type === "function") {
    throw new Error(
      "함수형 컴포넌트는 normalizeVNode로 정규화한 후 createElement를 호출해야 합니다.",
    );
  }

  // 5. 실제 DOM 요소 생성
  const $el = document.createElement(vNode.type);

  // 6. 속성 적용
  updateAttributes($el, vNode.props || {});

  // 7. 자식 요소 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      $el.appendChild(createElement(child));
    });
  }

  return $el;
}

function updateAttributes($el, props) {
  Object.entries(props).forEach(([key, value]) => {
    // 이벤트 리스너 처리 (onClick, onInput 등)
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.slice(2).toLowerCase(); // onClick -> click
      addEvent($el, eventType, value);
    }
    // className 처리
    else if (key === "className") {
      $el.setAttribute("class", value);
    }
    // 일반 속성 처리
    else {
      $el.setAttribute(key, value);
    }
  });
}
