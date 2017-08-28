/**
 * table 数据模拟
 */
import $http from './ajax';

export const getTablerole = params => {
  // 模拟数据
	const data = [];
	// Create 1000 users
	for (let i = 1; i < 20; i++) {
		data.push({
			id: i,
			user_code: 'role' + i,
			user_name: Math.random().toString().substr(2, 1) % 2 === 0 ? 'male' : 'female',
			nick_name: Math.random().toString().substr(2, 1) % 2 === 0 ? 'male' : 'female',
		});
	}
	return Promise.resolve(data);
};

// todo 表单 Users 的 ajax
export const getTableNone = params => (
	$http.get('api/pageWhichIsNo', params)
		.then(data => Promise.resolve(data))
);

export default {getTablerole,  getTableNone,};

