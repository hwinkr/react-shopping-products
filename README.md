# react-shopping-products

## 1단계 구현 사항

### 1단계 : 결국 우리가 무엇을 하려는 거지?

- 아르

비동기 데이터를 사용자에게 제공하는 과정에서 발생하는 다양한 시나리오에 대응하고, 모킹을 통해 비동기 데이터 요청에 대한 테스트를 수행할 수 있다.

- 해리

비동기 데이터인 상품 목록 데이터를 가져오고, 비동기 데이터를 가져올 때 발생할 수 있는 다양한 시나리오에 따른 UI를 사용자에게 보여줄 수 있다.

### 2단계 : 핵심 기능을 1줄로 정의해보기

- 아르

상품 목록 데이터를 가공하여 사용자에게 보여주고, 사용자가 원하는 상품을 장바구니에 담을 수 있도록 한다.

- 해리

상품 목록 데이터를 사용자가 원하는 옵션에 따라 가공해서 보여주고, 장바구니에 상품을 담을 수 있는 경험을 제공한다.

### 3단계 : 동작 가능한 가장 작은 버전부터 시뮬레이션 해보기

- 아르

1. 상품 목록 데이터 가져오기
2. 로딩 상태 및 에러 처리하기

- 200(OK)
- 400(Bad Request)/404(Not Found)
- 500(Server Error)

3. 페이지네이션
4. 상품 정렬 설정에 대응하기
5. 상품 카테고리 설정에 대응하기
6. 개별 상품의 장바구니 추가/제거 처리하기

- 해리

1. 상품 목록 데이터 페칭하기

2. 페칭 과정에서 발생할 수 있는 예외 시나리오 딱 하나에만 대응해보기! (500)

- [ ] 200(OK)
- [ ] 500(Internal Server Error)
- [ ] 404(Not Found)

3. 사용자가 선택한 옵션에 따라, 상품 목록 데이터 가공하기 (옵션, 정렬)

4. 대응 완료 후, 페이지네이션 경험 제공해주기

### 4단계 : 핵심과 가까우면서 쉽게 할 수 있는 적절한 것 선택하기

1. 첫 페이지에서 보여 줄 20개의 데이터 페칭하기

1-1. 200, 500

### 발생할 수 있는 비동기 시나리오에 대응하기

## ✨ 기능 요구 사항

1. 상품 목록 조회

- useFetch 커스텀 훅 구현 ✅

> **데이터 페칭 책임을 가지는 커스텀 훅**

- 에러 상태
- 로딩 상태
- 네트워크 요청의 결과인 비동기 데이터

- usePagination 커스텀 훅 구현

> **페이지 상태 관리 책임을 가지는 커스텀 훅** ✅

- 페이지 상태
- 마지막 페이지 상태
- 다음 페이지 이동 함수

- [x] MSW를 이용하여 /products API를 모킹하고 상품 목록 데이터를 가져온다.

- [x] 맨 처음 불러 오는 갯수는 20개다.
- [x] 이후 추가로는 4개씩 불러온다.
- [x] 상품 목록을 무한스크롤 방식으로 표시한다.

2. 상품 정렬 및 필터링 - useProducts

- [x] 상품 필터링
- [x] 카테고리
- [x] 상품 정렬
- [x] 낮은 가격 순
- [x] 높은 가격 순

3. 상품 장바구니 담기

- [x] 사용자가 담기 버튼을 누르면, 장바구니에 추가된다. 이 때 장바구니에 담긴 아이템 '종류' 의 갯수로 숫자를 표시한다.
- [x] 장바구니 담기 요청 중 에러가 발생한 경우, 에러 메시지를 사용자에게 알려주는 UI를 표시한다.
- [x] 장바구니에서 빼기 버튼을 누르면, 장바구니에서 해당 아이템이 제거된다.

MSW

    API 요청을 모킹하고, 다양한 응답 데이터(성공, 실패, 빈 데이터 등)를 대응한다.

API

    API 요청 중에는 로딩 상태를 나타내는 UI (예: 텍스트 메시지, 스피너, 스켈레톤 등)를 표시한다.
    API 요청 중 에러가 발생한 경우, 에러 메시지를 사용자에게 알려주는 UI를 표시한다. 이 때 UI는 스스로 결정한다. e.g. toastUI, text etc

Test

    테스트는 UI와 관계 없이 API 요청 상태에 따른 변화를 검증한다.

## 2단계 구현 사항

### 1단계 : 결국 우리가 무엇을 하려는 거지?

사용자가 특정 물건을 구입하기 위해서 쇼핑몰 앱에 방문했을 때 사용자는 다음과 같은 행동들을 할 수 있다.

1. 구입하고 싶거나, 관심있는 상품들을 장바구니에 담는다

2. 담은 상품의 수량을 변경하거나, 장바구니에서 상품을 뺀다.

3. 장바구니 페이지(모달)에서 장바구니에 담긴 상품을 확인할 수 있다.

이 과정들을 더 매끄럽고, 자연스럽게, **더 안전하게** 할 수 있는 경험을 제공한다.

레벨 2에서는 다음 과정이 추가된다. ✨🧚

=> 내가 해결해야 하는 문제를 ‘잘’ 해결하기 위해서, 문제 해결 과정에 **React-Query**를 잘 녹여낸다.

### 2단계 : 핵심 기능을 1줄로 정의해보기

사용자가 상품 목록을 무한 스크롤을 활용하여 더 매끄럽게 확인할 수 있고, 장바구니에 상품을 담고 빼거나 수량을 변경할 수 있다.

### 🔑 키워드

서버 상태 관리, React Query

### 📍 학습 목표

React Query를 사용하여 서버 상태를 관리할 수 있다.

API 연동 과정에서 발생하는 다양한 에러 상황에 대응하고 사용자에게 피드백을 제공할 수 있다.

### 🎯 기능 요구 사항

1. 상품 목록

- [x] 상품 목록에서 담기 버튼을 누르면, 수량을 조절할 수 있다.

2. 장바구니

- [x] 장바구니 담기: 상품을 장바구니에 담는 기능을 구현하고 장바구니 상태를 업데이트한다

- [ ] 장바구니 모달: 장바구니 버튼을 클릭하면 모달로 장바구니에 담은 목록을 확인할 수 있어야 한다.

- [ ] 장바구니에서도 수량을 조절할 수 있어야 한다.

### ✅ 프로그래밍 요구사항

이전 미션의 프로그래밍 요구사항은 기본으로 포함한다.

- Async

비동기 처리 로직을 react query를 사용해 리팩터링한다.

- [ ] useSuspenseInfiniteQuery를 사용해서 데이터를 페칭한다.

- [ ] useMutation을 사용해서 서버 상태를 변경한다.

- Test

- [ ] 핵심 기능 요구 사항에 대해 테스트 케이스를 작성한다.
