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

## 배포·검색 등록 기록 — 2026-10-22

- 모찌 대표 사진 3장과 초코모찌 중심 검색 개선을 운영 사이트에 배포했습니다. 기능 배포 커밋은 `4aa9169`이며, 이후 문서 커밋은 화면 동작을 바꾸지 않습니다.
- Google Search Console: 사이트맵을 다시 제출하고 홈(`/`), 전체 메뉴(`/menu`), 모찌(`/menu/mochi`)의 색인 요청이 접수됐습니다. 이전 전체 메뉴 보고서에 있던 잘못된 대표 URL(`/privacy`) 문제는 페이지별 canonical로 수정하고 재수집을 요청했습니다.
- 네이버 서치어드바이저: 기존 `/sitemap.xml` 등록을 유지하며 최신 14개 URL을 제공합니다. 같은 핵심 페이지 3개의 수집 요청이 접수됐습니다.
- Bing Webmaster Tools: KR 사이트 소유권 확인, 사이트맵 제출, 핵심 페이지 3개 URL 제출을 완료했습니다.
- Google 매장 프로필의 홈페이지는 이미 KR 주소로 연결되어 있음을 확인했습니다. 네이버 스마트플레이스에는 KR 홈페이지 링크를 추가하고 저장 후 유지되는 것을 확인했습니다. 기존 케이크 예약 링크도 유지합니다.
- 영업시간은 소유자 확인에 따라 매일 10:00–22:00입니다. 자동 테스트 13개, lint, 빌드가 통과했고 운영 도메인의 정적 경로·리다이렉트·404 및 모바일 390px/320px 가로 넘침을 확인했습니다.
- 로컬과 원격은 `main`으로 정리했습니다. 이전 상태는 `backup/kr-before-mochi-2026-10-22`, `backup/kr-legacy-2026-10-22` 태그에 보관했습니다.

검색엔진에 요청이 접수된 상태이며 새 페이지의 실제 색인·검색 노출은 각 서비스의 후속 처리 결과입니다. 인증된 콘솔 화면과 상세 확인 자료는 Git에서 제외되는 로컬 `search-registration.local/`에 보관합니다.

## 방문·문의 측정

GA4는 기존 `베리굿초콜릿` 속성(`520367300`), 웹 스트림 `13316955879`, 측정 ID `G-TKQQZ2E0DF`를 사용합니다. 보고서의 유입 경로와 다음 이벤트를 함께 확인하면 검색·SNS 유입 이후의 행동을 구분할 수 있습니다.

| 이벤트 | 의미 |
| --- | --- |
| `phone_click` | 매장 전화 링크 클릭. 실제 통화 완료를 뜻하지 않습니다. |
| `directions_click` | 매장 지도 링크 열기. 방문 완료를 뜻하지 않습니다. |
| `cake_reservation_click` | 한국 케이크 예약 사이트로 이동. 예약 완료를 뜻하지 않습니다. |
| `generate_lead` | 기존 문의 서비스가 전송을 성공으로 응답한 경우. 실패·네트워크 오류는 제외합니다. |

- `src/services/analytics.js`는 운영 KR 도메인에서 태그와 클릭 리스너를 한 번만 설치합니다. React 페이지 이동에도 중복 등록하지 않으며, 로컬·Cloudflare 미리보기에서는 운영 통계를 보내지 않습니다. 관리자 경로로 시작한 탭은 측정에서 제외합니다.
- `cta_location`은 `home_location`, `home_cake`, `mochi_visit`, `menu`, `footer`, `contact_form`, `other` 중 하나로, 클릭이 발생한 위치를 나타냅니다. 페이지별 구분에는 GA4의 기존 페이지 위치 측정기준을 사용합니다.
- 새 이벤트에는 문의 이름·이메일·본문을 포함하지 않고, 페이지 URL의 쿼리와 해시도 제외합니다. 기존 GA4 방문·향상된 측정은 유지합니다.
- `src/services/contact.js`는 기존 Formspree 요청 및 성공 기준을 유지합니다. GA4가 차단되어도 문의 전송 결과와 전화·지도·예약 이동은 영향을 받지 않습니다. JavaScript 없이 제출되는 기본 POST는 유지하되 브라우저 이벤트로 집계하지 않습니다.
- 단위·라우팅·정적 렌더링 테스트 18개 및 빌드·lint를 확인했습니다. 별도 로컬 화면에서 실제 문의 컴포넌트의 성공·거절·네트워크 오류를 모의 응답으로 검증했으며, 테스트 문의를 외부로 발송하지 않았습니다.

이벤트 구현은 [Google의 GA4 이벤트 문서](https://developers.google.com/analytics/devguides/collection/ga4/events)를 따릅니다. GA4의 기본 이탈 클릭·양식 제출 이벤트와 합산하지 않고 위 네 가지 이벤트를 기준으로 성과를 확인합니다.
