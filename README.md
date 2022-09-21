# :memo: 창업스트레스 스마트워치 일일리포트

legacy.html = 부족/적정/과다

<br/>

index.html = 충족/미충족 + 레이아웃 예외처리 및 개선 + 폰트적용 + 파일분리 ✅
  - index.html : 마크업
  - index.css : 스타일
  - index.js : 인적사항/그래프/게이지차트 렌더링로직
  - dummy.js : 더미데이터
  
<br/>

더미데이터 임시스키마
- 활동시간/수면시간/걸음수 컬럼명을 `size`로 통일
```javascript
export const profileData = {
	name: '김파이',
	school: '연세초등학교',
	gender: '여아',
	date: '2022.01.31 ~ 2022.09.20',
};

export const exerciseReport = [
	{
		day: 1,
		size: 0,
	},
	{
		day: 2,
		size: 1.2,
	},
	{
		day: 3,
		size: 6,
	},
	{
		day: 4,
		size: 4.5,
	},
	{
		day: 5,
		size: 3.5,
	},
	{
		day: 6,
		size: 2,
	},
	{
		day: 7,
		size: 0.5,
	},
];

export const sleepReport = [
	{
		day: 1,
		size: 0,
	},
	{
		day: 2,
		size: 6.75,
	},
	{
		day: 3,
		size: 7.35,
	},
	{
		day: 4,
		size: 6.65,
	},
	{
		day: 5,
		size: 7.7,
	},
	{
		day: 6,
		size: 6.53,
	},
	{
		day: 7,
		size: 6.51,
	},
];

export const walkReport = [
	{
		day: 1,
		size: 25000,
	},
	{
		day: 2,
		size: 9521,
	},
	{
		day: 3,
		size: 8362,
	},
	{
		day: 4,
		size: 5043,
	},
	{
		day: 5,
		size: 20814,
	},
	{
		day: 6,
		size: 11394,
	},
	{
		day: 7,
		size: 10044,
	},
];

```
