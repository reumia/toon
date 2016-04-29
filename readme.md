# Toonman

## 기획의도

* 웹툰서비스
* 이미지만 `attachment` 폴더에 삽입하여 새로운 포스트 생성
* `attachment` 폴더를 읽어서 `JSON` 형태의 파일로 목록화된 data 생성하여 업로드
    * `JSON` 굳이 필요없을 듯. `gulpfile.js` 내에서 `데이터 + 템플릿엔진` 조합으로 사용.
    * ~~하지만 추후 여러 페이지를 작성할 필요가 있다면? `JSON`이나 `Object`로 데이터를 가지고 있어야 할지도.~~
* Pagination 작성
    * `JSON` 파일을 생성하면 서버에서 템플릿 엔진을 돌려야 함. 어떻게든 `gulpfile.js` 내에서 해결할 것.
    * 옵션값을 기준으로 data 를 잘라서 각각의 폴더에 산출물 생성.
    * 추후 데이터 작성법 리팩토링 필요성 있음.
* Thumbnail 처리는 어떻게?
    * 로컬에서 제대로 돌아가는 NPM 기반 Thumbnail Generator가 없음.
    * ~~디자이너들 성향 고려하여 썸네일 직접 제작하도록 할까?~~ 안됨... 디자인의 의미가 없음.
* JavaScript는 ES6로 작성

## Todo

### ~~Pagination~~
* ~~Paginator 구조작성 및 스타일링~~
* ~~Pagination 제작에 따른 카테고리 Sorting 기능 수정 필요.~~ 
    * ~~가능한가!?!?!?!?!? 망했네.~~

### Infinite Scroll
* 버튼을 클릭하면 아래로 펼쳐지는 Infinite Scroll로 Pagination 대체
1. `<img>`태그의 `src` 값을 비운채로 모든 데이터 index.html에 뿌림.
2. `config.maxItem` 값을 기준으로 갯수만큼 아이템을 `display:block`.
3. 카테고리 sorting 할 경우, 해당 카테고리의 DOM을 먼저 탐색한 후 `config.maxItem` 기준으로 잘라서 `display:block`.
4. 새로운 아이템이 아래쪽으로 append 되기 위해서 이미 `display:block`처리된 아이템은 카테고리를 클릭하지 않는 이상 계속해서 상태 유지.

## Intro

__Toonman__은 단순한 이미지 파일만으로 이미지 기반의 블로그를 제작해주는 심플한 도구입니다.
이미지 파일명을 통해 이미지를 제작한 날짜, 분류, 제목을 입력하면 놀랍게도 깔끔하고 심플한 나만의 웹사이트를 운영할 수 있게 됩니다.

## Structure

```
- /  
    - src/
        - js/
        - scss/
        - template/
    - attachment/
        - thumbnail/
    - dist/             
    - index.html
    - config.json
    - gulpfile.js
```

## Install

    git clone 저장소 [작업위치]
    
프로젝트를 다운로드 한다.

    npm install
    
필요한 `node.js` 모듈을 설치한다.

## get started

##### 1. Configurtaion

`config.json` 파일을 수정하여 생성될 웹사이트를 설정한다.

```json
{
  "title": "Website Title",
  "description": "Descriptions for your website",
  "rootUrl": "http://localhost:9999/dist"
}
```
- title : 웹사이트의 제목 입력
- description : 웹사이트의 설명 입력
- rootUrl : `dist` 폴더가 업로드될 웹사이트의 접속 루트 입력

##### 2. Copy Works to Attachment

`attachment/` 폴더에 작업물을 복사한다.
파일의 이름은 아래 규칙을 엄수한다.

```
YYYYMMDD_category_title.jpg     // ex) 20160201_만화_1화.jpg
```
 
##### 3. Build

`gulp build` 명령어를 통해 산출물을 제작한다.
`dist/` 폴더가 생성된 것을 확인한다.

##### 4. Upload

제작된 `dist/`폴더의 내용을 웹사이트에 업로드 한다.