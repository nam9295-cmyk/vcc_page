# 베리굿초콜릿 한국 홈페이지

- 운영: https://kr.verygood-chocolate.com/
- 대표 메뉴: [대구 초코모찌 5종](https://kr.verygood-chocolate.com/menu/mochi)
- 저장소: `nam9295-cmyk/vcc_page`
- 호스팅: Cloudflare Pages `verygoodcorp`, `main` 자동 배포
- 케이크 예약은 별도 사이트 https://cake.verygood-chocolate.com/ 를 이용합니다.

## 개발·검증

```sh
npm ci
npm run dev
npm run build
npm test
npm run lint
npm run preview
```

`npm run preview`는 `http://127.0.0.1:4197`에서 배포용 HTML과 리다이렉트/404를 검증하는 서버를 실행합니다. 포트 변경은 `PORT=4198 npm run preview`를 사용합니다. 기존 저장소 정책에 따라 `dist`도 추적하므로 배포 전에 빌드 산출물을 함께 갱신합니다.

## 검색 구조

- `src/data/store.js`: 소유자가 2026-10-22 확인한 한국 매장 주소·전화·매일 10:00–22:00 영업시간과 FAQ.
- `src/data/mochi.js`: 확인된 모찌 5종과 실제 제품 사진. 매장 가격·재고를 추정하지 않습니다.
- `src/seo/config.js`, `head.js`: 초기 HTML과 React 페이지 이동에 같은 제목, 설명, canonical, OG/Twitter와 JSON-LD를 적용합니다.
- `src/entry-server.jsx`, `scripts/generate-seo-pages.mjs`: 실제 React 화면을 빌드 시 HTML로 렌더링합니다. 홈페이지와 모찌·메뉴 등 정적 페이지의 본문은 JavaScript 없이 읽을 수 있습니다. 봇과 방문자에게 같은 내용을 제공합니다.
- 18개 정적 HTML, 14개 공개 canonical URL의 이미지 사이트맵, `llms.txt`, `llms-full.txt`를 생성합니다. 약관·개인정보·관리자·404는 noindex이고 사이트맵에서 제외합니다.
- `/menu/mochi.html`과 끝의 `/`는 slashless 주소로 정리합니다. 기존 메뉴 별칭과 `/granola`는 대표 메뉴 주소로 301, `/menu/cake`는 케이크 사이트로 301 이동합니다. 없는 일반 경로는 실제 HTTP 404입니다.
- 블로그는 기존 Firebase 클라이언트 조회를 유지합니다. `/blog/:id`만 전용 초기 로딩 HTML로 연결하므로 새 글도 재배포 없이 열립니다. 글이 로드되면 해당 제목·설명·canonical을 적용하고, 없는 글은 noindex로 전환합니다. 개별 글 본문은 이번 정적 생성/사이트맵 대상이 아니며, 없는 블로그 ID의 초기 HTTP 응답은 기존처럼 200입니다.
- Bakery/WebSite/WebPage/Menu/BreadcrumbList로 한국 매장과 초코모찌를 연결합니다. 지도 프로필은 같은 한국 매장만 연결하며, 호주 매장의 가격·주소와 섞지 않습니다. 확인되지 않은 평점·리뷰·가격·재고·좌표는 넣지 않습니다.
- `robots.txt`는 Googlebot, bingbot, Yeti, OAI-SearchBot 등 공개 페이지 수집을 허용합니다. 모든 그룹에 관리자 제외 규칙을 적용하고 기존 GPTBot 허용 정책은 유지합니다. 검색 수집과 학습용 수집은 별개입니다.
- Google/Naver 소유권 확인 메타 태그와 GA, Firebase/문의 폼 연결은 유지합니다.

AI 노출을 위한 별도 순위 보장 설정은 없습니다. `llms` 파일은 사실 요약 보조 자료이며, 본문 접근성·일관된 매장 정보·정상 색인이 우선입니다. [Google AI 검색 안내](https://developers.google.com/search/docs/appearance/ai-features), [OpenAI 크롤러 안내](https://developers.openai.com/api/docs/bots), [Cloudflare 정적 경로 처리](https://developers.cloudflare.com/pages/configuration/serving-pages/)를 참고했습니다.
