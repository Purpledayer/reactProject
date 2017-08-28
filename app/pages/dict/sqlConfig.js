/**
 * table columns 表头数据配置 只在模拟接口下运行
 */

export default [
	{
		tableName: 'Users',
		name: '用户管理',
		headers: [
			{tableKey: 'id',name: 'ID',type: 'display',width: 50,},
			{tableKey: 'user_code',name: '用户名',type: 'text',width: 80,validators: ['required',],},
			{tableKey: 'user_name',name: '用户姓名',type: 'text',width: 50,},
			{tableKey: 'nick_name',name: '用户昵称',type: 'text',width: 50,validators: ['required',],},
			{tableKey: 'id_number',name: '身份证号',type: 'text',width: 70,validators: ['required',],},
			{tableKey: 'mobile_tel;',name: '手机号码',type: 'text',width: 50,validators: ['required',],},
			{tableKey: 'e_mail',name: '邮件地址',type: 'text',width: 50,validators: ['required',],},
			{tableKey: 'remark',name: '备注',type: 'text',width: 50,validators: ['required',],},
		],
	},
];
