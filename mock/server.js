var app = require('koa')();
var router = require('koa-router')();
var koaBody = require('koa-body')();

router.get('/', function *(next) {
    this.body = 'hello koa !'
});
/**
 * test接口 start
 */
router.get('/api', function *(next) {
    this.body = 'test data'
});
router.get('/api/1', function *(next) {
    this.body = 'test data 1'
});
router.get('/api/2', function *(next) {
    this.body = {
        a: 1,
        b: '123'
    }
});
router.post('/api/post', koaBody, function *(next) {
    console.log('post' ,this.request.body)
    this.body = JSON.stringify(this.request.body)
});
/**
 * test接口 end
 */

/****************************************************************
 * 正式模拟接口 start
*****************************************************************/
/**
 * 登陆接口
 */

/**
 * welcome接口
 */
//待办事项接口
var tableListData =require('./welcome/tablelist.js');
router.post('/wbp/homewos/selecthomewosdata.do', koaBody, function *(next) {
    this.body = tableListData;
});

/**
 * company 页面接口模拟 start
 */
// table列表接口
var companytablelsit = require('./company/company.js');
router.get('/wbp/bmcompany/querycmp.do', function *(next) {
    this.body = companytablelsit;
});

/**
 * company 页面接口模拟 end
 */
// 
 /****************************************************************
 * 正式模拟接口 start
 *****************************************************************/
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3001);
