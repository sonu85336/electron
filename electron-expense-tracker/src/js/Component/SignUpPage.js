import React, { useState } from "react";

import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import classes from './css/signup.module.css'
const { Option } = Select;
 
 
           
    
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUpPage = () => {
  const [form] = Form.useForm();
const history = useHistory()
  const onFinish = (values) => {
  const   {username,password,phone,prefix,email} = values;
    console.log("Received values of form: ", values);
    axios.post('http://localhost:3001/Validateregistration',{username,password,phone,prefix,email})
     
    .then((res)=>{
        if(res.data.validation){
            alert('Successful')
        }else{
          alert('Your  username is not  correct')
          console.log('Your password is not correct')
        }
       })
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

//   const onWebsiteChange = (value) => {
//     if (!value) {
//       setAutoCompleteResult([]);
//     } else {
//       setAutoCompleteResult(
//         [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
//       );
//     }
//   };

//   const websiteOptions = autoCompleteResult.map((website) => ({
//     label: website,
//     value: website,
//   }));
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     
<h1>Sign Up</h1>

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
         
        prefix: "91",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            type: "text",
            message: "The input is not valid  username!",
          },
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    <div  className={classes.signup}>
    or

    <Button   type="primary" htmlType="submit" onClick={()=>history.push('/')}>
           Login
        </Button>
        </div>
     </div>
  );
};
export default SignUpPage;

   
 
 
 