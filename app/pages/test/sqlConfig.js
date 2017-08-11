/**
 * table columns 表头数据配置 只在模拟接口下运行
 */

export default [
	{
		tableName: 'Users',
		name: '用户管理',
		headers: [	
			{tableKey: 'pid',name: '编号',type: 'text',width: 80,validators: ['required',],},
			{tableKey: 'pname',name: '名称',type: 'text',width: 50,},
			{tableKey: 'price',name: '价格',type: 'number',width: 50,validators: ['required',],},
			{tableKey: 'type',name: '类型',type: 'text',width: 70,validators: ['required',],},
		],
	},
];
