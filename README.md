# ComplianceOps

**Policy-as-Code 기반 Kubernetes 컴플라이언스 자동화 플랫폼**

> AI 기반 실시간 보안 정책 관리, 자동 교정, 런타임 위협 탐지 및 ISMS-P 컴플라이언스 리포팅을 통합한 DevSecOps 플랫폼

🔗 **Live Demo**: [https://leeon3345.github.io/opensource_proto](https://leeon3345.github.io/opensource_proto)

---

## 📋 프로젝트 개요

### 해결하고자 하는 문제

- **컴플라이언스 복잡성**: KISA ISMS-P 및 NCSC 가이드라인의 방대한 보안 요구사항을 수동으로 관리하는 한계
- **수동 대응의 위험**: 보안 위반 사항에 대한 수동 개입으로 인한 대응 지연 및 인적 오류
- **분산된 보안 도구**: Kyverno, Gatekeeper, Falco, Trivy 등 개별 도구의 결과를 통합 관리할 수 없는 환경

### ComplianceOps의 접근 방식

```
Policy(정책 정의) → Prevention(배포 차단) → Detection(런타임 탐지) → Reporting(컴플라이언스 리포트)
```

---

## 🏗️ 핵심 기능

### 1. SOC 캐러셀 대시보드

6개 슬라이드로 구성된 통합 보안 관제 화면:

| 슬라이드 | 기능 | 주요 지표 |
|---|---|---|
| **Admission Security** | Kyverno/Gatekeeper 실시간 차단 기록 | 위험 배포 차단 횟수, 자동 교정 성공률 |
| **Runtime Protection** | Falco 실시간 위반 이벤트 표시 | 쉘 접속, 파일 변조 탐지 및 대응 상태 |
| **Compliance Overview** | ISMS-P 전체 준수율 (Radial Gauge) | 102개 보안 제어 항목 · 89 Pass / 13 Fail |
| **AI Policy Assistant** | 자연어 기반 정책 생성 + 코드 에디터 | ISMS-P 항목 자동 매핑 |
| **Compliance Report** | ISMS-P 카테고리별 상세 위반 리포트 | 심각도별 분류 및 해결 가이드 |
| **YAML Diff Viewer** | Before/After 자동 교정 비교 뷰어 | 수정 라인 하이라이트 + 규정 매핑 툴팁 |

- 수동 슬라이드 전환 (발표 데모 최적화)
- 레이블 탭 네비게이션 바

### 2. Workflow 페이지

4단계 프로세스 맵과 상세 시각화를 포함한 전용 페이지:

- **프로세스 맵**: 세로 카드 배열 + 호버 시 오른쪽 상세 패널
- **Before vs After**: 기존 수동 감사 vs ComplianceOps 자동화 비교
- **System Architecture**: Admission → Runtime → Observability 3계층 다이어그램
- **Event Timeline**: 배포 요청 → Mutation → 차단 → 탐지 → 격리 → 리포트 실시간 흐름
- **Live Status**: Compliance Score, Blocked Deploys, Runtime Alerts, Critical CVEs

### 3. 정책 카드 리스트

Kubernetes 네이티브/ISMS-P 중심 5대 보안 정책:

- Admission Control (Kyverno + Gatekeeper)
- Image Security (Trivy Operator)
- Runtime Protection (Falco eBPF)
- Policy GitOps (ArgoCD)
- Compliance Report (PolicyReport CRD)

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|---|---|
| **Framework** | Vite + React 18 (JavaScript) |
| **Styling** | Tailwind CSS (Dark Mode, Glassmorphism) |
| **Animation** | Framer Motion |
| **Typography** | Noto Sans KR (Google Fonts) |
| **Background** | Unicorn Studio (WebGL) |
| **Deployment** | GitHub Pages + GitHub Actions |

---

## 🚀 빠른 시작

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

### 배포

`main` 브랜치에 푸시하면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.

---

## 📁 프로젝트 구조

```
src/
├── App.jsx                    # 메인 앱 (페이지 라우팅)
├── main.jsx                   # React 엔트리포인트
├── index.css                  # 글로벌 스타일 + 유틸리티
├── components/
│   ├── Navbar.jsx             # 상단 네비게이션 (Dashboard/Workflow)
│   ├── Carousel.jsx           # SOC 캐러셀 컨테이너
│   ├── AdmissionSecurity.jsx  # Admission 보안 슬라이드
│   ├── RuntimeProtection.jsx  # 런타임 보안 슬라이드
│   ├── ComplianceOverview.jsx # 컴플라이언스 게이지 슬라이드
│   ├── AiAssistant.jsx        # AI 정책 생성기 슬라이드
│   ├── Scanner.jsx            # 컴플라이언스 리포트 슬라이드
│   ├── YamlScanner.jsx        # YAML Diff 뷰어 슬라이드
│   ├── PolicyList.jsx         # 하단 정책 카드 리스트
│   ├── Dashboard.jsx          # 대시보드 컴포넌트
│   └── WorkflowPage.jsx       # Workflow 전용 페이지
└── icons/
    └── Icons.jsx              # SVG 아이콘 컴포넌트
```

---

## 🎯 기대 효과

- **보안 점검 시간 단축**: 자동화된 Policy-as-Code로 수동 감사 대비 90% 이상 시간 절감
- **설정 오류 사전 차단**: Admission Webhook이 위반 배포를 실시간 차단
- **런타임 위협 즉시 대응**: Falco eBPF 기반 탐지 → NetworkPolicy 자동 격리
- **지속적 컴플라이언스**: ISMS-P 준수율 실시간 산출 및 감사 리포트 자동 생성

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
