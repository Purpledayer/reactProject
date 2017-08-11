/**
 * table 数据模拟
 */
import $http from './ajax';

export const getTableUsers = params => {
  // 模拟数据
	const data = [];
	// Create 1000 users
	for (let i = 1; i < 20; i++) {
		data.push({
		id: i,
		user_code: 'user' + i,
		user_name: Math.random().toString().substr(2, 1) % 2 === 0 ? 'male' : 'female',
		nick_name: Math.random().toString().substr(2, 1) % 2 === 0 ? 'male' : 'female',
		id_number: 2 + Math.random().toString().substr(2, 1),
		mobile_tel: 2 + Math.random().toString().substr(2, 1),
		e_mail: 2 + Math.random().toString().substr(2, 1),
		remark: 2 + Math.random().toString().substr(2, 1),
		remark: 'I have got ' + Math.random().toString().substr(2, 4) + ' coins'
		});
	}
	return Promise.resolve(data);
};

// todo 表单 Users 的 ajax
export const getTableNone = params => (
	$http.get('api/pageWhichIsNo', params)
		.then(data => Promise.resolve(data))
);

export default {getTableUsers,  getTableNone,};

