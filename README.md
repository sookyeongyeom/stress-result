# :memo: 창업스트레스 스마트워치 일일리포트

## 1. 파일 구조
**index.html = 충족/미충족 + 레이아웃 예외처리 및 개선 + 폰트적용 + 파일분리 ✅**
  - index.html : 마크업
  - index.css : 스타일
  - index.js : 인적사항/그래프/게이지차트 렌더링로직
  - dummy.js : 더미데이터
  
 **legacy.html = 부족/적정/과다 ❌**
  - 게이지차트 3단계 테스트

## 2. 더미데이터 임시스키마

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

## 3. 그래프 축약

<img width="741" alt="image" src="https://user-images.githubusercontent.com/98504939/191550588-00e0d7b3-5def-488f-86cf-e045f1399acc.png">

### Issue
- 막대그래프 리포트를 한장에 몰아넣으려다보니 발생한 문제
- graphY 눈금이 10개를 넘어서면 차지하는 면적이 늘어나면서 리포트 레이아웃이 깨져버림
- 처음엔 graphY 눈금 일부를 ...으로 처리해보았으나 전체적인 그래프 높이가 맞지 않는 문제가 있었음<br/>→ 최고 높이에 맞추면 키가 작은 다른 그래프들의 높이가 눈금과 맞지 않음
- 아예 그래프 중간에 큰 물결이미지를 삽입해서 가려버리는 방법도 고려해봤지만 그래프 차트의 높이가 충분하지 않아 데이터를 인지하는데 오히려 방해가 되었음
- 따라서 위 이미지처럼 눈금이 10개를 넘으면 0와 최고 높이를 맞추고 평균값을 중간에 배치한 뒤 사이에 물결 표시를 넣어주는 방향으로 선회함
- 추후 개선 가능
