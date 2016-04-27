# toon.zzoman.com

## 기획의도

* 웹툰서비스
* 이미지만 `attachment` 폴더에 삽입하여 새로운 포스트 생성
* `attachment` 폴더를 읽어서 `JSON` 형태의 파일로 목록화된 data 생성하여 업로드
    * `JSON` 굳이 필요없을 듯. `gulpfile.js` 내에서 변수로 생성하여 사용하는 것으로 수정.
    * 하지만 추후 여러 페이지를 작성할 필요가 있다면? `JSON`이나 `Object`로 데이터를 가지고 있어야 할지도.
* JavaScript는 ES6로 작성
