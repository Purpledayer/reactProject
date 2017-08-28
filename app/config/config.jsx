export default (() => {
  	window.$GLOBALCONFIG = {};
  	+function (global) {
    	// 系统一二级菜单
    	global.NAVIGATION = [
			{"model_code":"sysmodel","model_name":"系统配置"},
			{"model_code":"bmcmp","model_name":"公司","model_url":"Company","parent_code":"sysmodel"},
			{"model_code":"bmrole","model_name":"角色","model_url":"Role","parent_code":"sysmodel"},
			{"model_code":"bmuser","model_name":"用户","model_url":"Bmuser","parent_code":"sysmodel"},
			{"model_code":"sysdict","model_name":"数据字典","model_url":"Dict","parent_code":"sysmodel"},
			{"model_code":"dictsrc","model_name":"字典元","model_url":"Dictsrc","parent_code":"sysmodel"},
			{"model_code":"sysgridset","model_name":"动态列表","model_url":"Sysgrid","parent_code":"sysmodel"},
			{"model_code":"sysfromset","model_name":"动态表单","model_url":"jsp/dynamic/sysform.jsp","parent_code":"sysmodel"},
			{"model_code":"importconfig","model_name":"导入","model_url":"Importconfig","parent_code":"sysmodel"},
			{"model_code":"sysworkflow","model_name":"流程","model_url":"Sysworkflow","parent_code":"sysmodel"},
			{"model_code":"systablefield","model_name":"表结构","model_url":"Systable","parent_code":"sysmodel"},
			{"model_code":"menu_manager","model_name":"菜单管理","model_url":"Manager","parent_code":"sysmodel"},
			{"model_code":"ACFP","model_name":"代码生成",},
			{"model_code":"code_code","model_name":"生产","model_url":"jsp/cas/code_code.html","parent_code":"ACFP"},
			{"model_code":"code_form","model_name":"表单","model_url":"jsp/cas/code_form.jsp","parent_code":"ACFP"},
			{"model_code":"code_grid","model_name":"表格","model_url":"jsp/cas/code_grid.html","parent_code":"ACFP"},
			{"model_code":"code_active","model_name":"流程","model_url":"jsp/cas/code_active.html","parent_code":"ACFP"},
			{"model_code":"basemd","model_name":"标件","model_url":"jsp/cas/code_base.html","parent_code":"ACFP"},
			{"model_code":"demo","model_name":"代码示例",},
			{"model_code":"demo_table","model_name":"单表","model_url":"jsp/demotable/main.jsp","parent_code":"demo"},
			{"model_code":"demo_tree","model_name":"单树","model_url":"jsp/demotree/main.jsp","parent_code":"demo"},
			{"model_code":"demo_form","model_name":"表单","model_url":"jsp/cas/demo_form.jsp","parent_code":"demo"},
			{"model_code":"demo_grid","model_name":"表格","model_url":"jsp/cas/demo_grid.jsp","parent_code":"demo"},
			{"model_code":"demo_select","model_name":"选择","model_url":"jsp/cas/demo_select.jsp","parent_code":"demo"},
			{"model_code":"production_line","model_name":"生产线",},
			{"model_code":"template","model_name":"模板","model_url":"1","parent_code":"production_line"},
			{"model_code":"production_task","model_name":"任务","model_url":"2","parent_code":"production_line"},
			{"model_code":"product_line","model_name":"产品线","model_type":"1"},
			{"model_code":"product_line","model_name":"test","model_url":"Test","model_type":"1"},

		];
	}(window.$GLOBALCONFIG);
})()
 

