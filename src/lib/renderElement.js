import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";

export function renderElement(vNode, container) {
  // 1. vNode를 정규화
  const normalizedVNode = normalizeVNode(vNode);

  // 2. createElement로 DOM 노드 생성
  const element = createElement(normalizedVNode);

  // 3. container 내용을 비우고 새 요소 삽입
  container.innerHTML = "";
  container.appendChild(element);

  // 4. 이벤트 위임 방식으로 이벤트 등록
  setupEventListeners(container);
}
