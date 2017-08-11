import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button   } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
 

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        visible: false
    };
   handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
             this.props.handleOk()
                // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
            // this.props.callbackParent(this.state.visible);
            console.log('Received values of form: ', values);
        }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '输入用户名!' }],
                    })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const Addmodal = Form.create()(RegistrationForm);
export default Addmodal;