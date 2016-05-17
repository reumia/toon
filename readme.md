# Toonman

## 기획의도

* 웹툰서비스
* 이미지만 `attachment` 폴더에 삽입하여 새로운 포스트 생성
* `attachment` 폴더를 읽어서 정적인 `.html` 형태의 산출물 생성
* JavaScript는 ES6로 작성

## Todo

### ~~Pagination~~
* ~~Paginator 구조작성 및 스타일링~~
* ~~Pagination 제작에 따른 카테고리 Sorting 기능 수정 필요.~~ 
    * ~~가능한가!?!?!?!?!? 망했네.~~

### Infinite Scroll
* 버튼을 클릭하면 아래로 펼쳐지는 Infinite Scroll로 Pagination 대체

1. ~~`<img>`태그의 `src` 값을 비운채로 모든 데이터 index.html에 뿌림.~~
2. ~~`config.maxItem` 값을 기준으로 갯수만큼 아이템을 `display:block`.~~
3. 카테고리 sorting 할 경우, 해당 카테고리의 DOM을 먼저 탐색한 후 `config.maxItem` 기준으로 잘라서 `display:block`.
4. 새로운 아이템이 아래쪽으로 append 되기 위해서 이미 `display:block`처리된 아이템은 카테고리를 클릭하지 않는 이상 계속해서 상태 유지.

* 버튼 스타일링 해야함. 모든 card를 전체 너비 100% 기준으로 정렬되도록 수정할 필요가 있음.
* 카테고리 Sorting X Scroll 작업 필요

### Thumbnail
* 로컬에서 제대로 돌아가는 NPM 기반 Thumbnail Generator가 없음.
* ~~디자이너들 성향 고려하여 썸네일 직접 제작하도록 할까?~~ 안됨... 디자인의 의미가 없음.

### Unicode Normailzation
* fs의 readdir을 통해 한글 파일명을 읽어오면 NFD 형태로 풀어져서 읽혀서 제대로된 값이 전달되지 않음.
* NFC 형태로 변환하여 URL로 사용하여야 하며 이런 과정을 `Unicode Normalization` 이라고 함.
* NPM 도구인 [UNORM](https://github.com/walling/unorm)을 사용. 

### 카테고리 두 번 클릭시 동작 이상

## Intro

__Toonman__ is a perfectly simple tool for publishing your web cartoons.

__Toonman__은 단순한 이미지 파일만으로 이미지 기반의 블로그를 제작해주는 심플한 도구입니다.
이미지 파일명을 통해 이미지를 제작한 날짜, 분류, 제목을 입력하면 놀랍게도 깔끔하고 심플한 나만의 웹사이트를 운영할 수 있게 됩니다.

## Structure

```
- /  
    - src/
        - js/
        - scss/
        - index.html
    - attachment/
        - thumbnail/
    - dist/             
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
  "scroll": 8
}
```
- title : 웹사이트의 제목 입력
- description : 웹사이트의 설명 입력
- scroll : 한 페이지에 노출되는 아이템의 갯수 설정. `0`일 경우, 스크롤 기능 비활성.

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