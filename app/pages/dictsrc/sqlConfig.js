/**
 * table columns 表头数据配置 只在模拟接口下运行
 */

export default [
	{
		tableName: 'role',
		name: '角色管理',
		headers: [
			{tableKey: 'id',name: 'ID',type: 'display',width: 50,},
			{tableKey: 'user_code',name: '字典编码',type: 'text',width: 80,validators: ['required',],},
			{tableKey: 'user_name',name: '字典名称',type: 'text',width: 50,},
		],
	},
];
