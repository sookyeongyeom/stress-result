import { profileData, exerciseReport, sleepReport, walkReport } from './dummy.js';

function renderProfile(profileData) {
	Array.from(document.querySelectorAll('#profile_name')).map(
		(v) => (v.innerHTML = profileData.name),
	);
	Array.from(document.querySelectorAll('#profile_school')).map(
		(v) => (v.innerHTML = profileData.school),
	);
	Array.from(document.querySelectorAll('#profile_gender')).map(
		(v) => (v.innerHTML = profileData.gender),
	);
	Array.from(document.querySelectorAll('#profile_date')).map(
		(v) => (v.innerHTML = profileData.date),
	);
}

function renderGraph(reportData, targetChart, profileData) {
	// 제일 긴 시간 찾기
	let deepCopy = [...reportData];
	deepCopy.sort((a, b) => b.size - a.size);
	// 올림
	let largest = Math.ceil(deepCopy[0].size);
	// 일일 걸음 수 리포트는 5000 단위로 계산
	if (reportData == walkReport) largest = Math.ceil(largest / 5000) * 5000;

	// graph_y innerHTML 생성
	let graphY = ['<div>0</div>'];
	// 일일 걸음 수 리포트
	if (reportData == walkReport) {
		Array(largest / 5000)
			.fill(0)
			.map((v, i) => {
				graphY.push(['<div>', `${(i + 1) * 5000}`, '</div>'].join(''));
			});
	} else {
		Array(largest)
			.fill(0)
			.map((v, i) => {
				graphY.push(['<div>', `${i + 1}`, '</div>'].join(''));
			});
	}
	// 그래프 축약
	if (graphY.length > 10) {
		const shorten = [
			...graphY.slice(0, 1),
			'<div>≈</div>',
			`<div>${largest / 2}</div>`,
			'<div>≈</div>',
			...graphY.slice(-1),
		];
		graphY = [...shorten];
	}
	document.querySelector(`.${targetChart} #graph_y`).innerHTML = graphY.reverse().join('');

	// graph_chart innerHTML 생성
	let graphChart = [];
	reportData.map((dayReport) => {
		const barHeight = (dayReport.size / largest) * 9.3;
		const valueHtml = ['<div id="graph_value">', `${dayReport.size}`, '</div>'];
		const barHtml = [`<div id="graph_bar" style="height:${barHeight}rem"></div>`];
		const xHtml = [`<div id="graph_x">${dayReport.day}일차</div>`];
		graphChart.push(['<div>', ...valueHtml, ...barHtml, ...xHtml, '</div>'].join(''));
	});
	console.log(graphChart);
	document.querySelector(`.${targetChart} #graph_chart`).innerHTML = graphChart.join('');
}

function renderChart(reportData, targetChart) {
	const total = reportData.reduce((acc, cur, idx) => (acc += cur.size), 0);
	const average = total / reportData.length;

	let state;

	if (reportData == exerciseReport) {
		if (average >= 1) state = 'exact';
		else state = 'less';
	}
	if (reportData == sleepReport) {
		if (average >= 9) state = 'exact';
		else state = 'less';
	}
	if (reportData == walkReport) {
		// 성별에 따라 기준 상이
		if (profileData.gender === '남아')
			if (average >= 12000) state = 'exact';
			else state = 'less';
		if (profileData.gender === '여아')
			if (average >= 10000) state = 'exact';
			else state = 'less';
	}

	// 게이지 색 강조
	// const gaugeColor = {
	// 	exact: {
	// 		exact: '#9acc86',
	// 		less: '#fdd5d1',
	// 	},
	// 	less: {
	// 		exact: '#dbfacf',
	// 		less: '#f48379',
	// 	},
	// };
	// const exactColor = gaugeColor[state].exact;
	// const lessColor = gaugeColor[state].less;
	// document.querySelector(
	// 	`#${targetChart} .chart_bar`,
	// ).style.background = `conic-gradient(${exactColor} 35deg, ${exactColor} 180deg, ${lessColor} 180deg, ${lessColor} 360deg, ${exactColor} 360deg)`;

	// 게이지 렌더링
	const max = {
		chart_exercise: 2,
		chart_sleep: 18,
		chart_walk: {
			남아: 24000,
			여아: 20000,
		},
	};
	let deg;
	// 성별에 따라 기준 상이
	if (reportData == walkReport) deg = (average / max[targetChart][profileData.gender]) * 180 - 90;
	else deg = (average / max[targetChart]) * 180 - 90;
	// 게이지 하한선/상한선
	if (deg < -90) deg = -90;
	if (deg > 90) deg = 90;
	document.querySelector(
		`#${targetChart} > .chart_pin > img`,
	).style.transform = `rotate(${deg}deg)`;

	// 충족 여부 렌더링
	const status = {
		less: '미충족',
		exact: '충족',
	};
	document.querySelector(`#state_${targetChart.split('_')[1]}`).innerHTML = status[state];

	console.log(average + ' ' + state);
}

renderProfile(profileData);
renderGraph(exerciseReport, 'graph_exercise');
renderGraph(sleepReport, 'graph_sleep');
renderGraph(walkReport, 'graph_walk');
renderChart(exerciseReport, 'chart_exercise');
renderChart(sleepReport, 'chart_sleep');
renderChart(walkReport, 'chart_walk', profileData);
