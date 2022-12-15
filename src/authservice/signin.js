import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

export const SignUp = () => {
  useEffect(() => {
    document.title = "Sign In";
  });
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const onFinish = () => {
    console.log(data);
    message.success("register success");
    localStorage.getItem(data);
    navigate("/content");
  };

  return (
    <div className="sign-up-content">
      <Form className="register-form" onFinish={onFinish} scrollToFirstError>
        <h1>Sign Up</h1>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            value={data.name}
            placeholder="Name"
            onChange={(e) => setdata({ ...data, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="email"
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
          hasFeedback
        >
          <Input
            prefix={<MailOutlined />}
            value={data.email}
            placeholder="E-mail"
            onChange={(e) => setdata({ ...data, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              pattern:
                /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3,4})[-. )]*(\d{3,4})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
              message: "the input is not valid phone number!",
            },
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<PhoneOutlined />}
            value={data.phone}
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => setdata({ ...data, phone: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<SafetyOutlined />}
            value={data.password}
            placeholder="Password"
            onChange={(e) => setdata({ ...data, password: e.target.value })}
            autoComplete="true"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
            {
                pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
                message: "Must include uppercase and lowercase letters, a number and a special character",
              },
          ]}
        >
          <Input.Password
            prefix={<SafetyCertificateOutlined />}
            value={data.confirm}
            placeholder="Confirm Password"
            onChange={(e) => setdata({ ...data, confirm: e.target.value })}
            autoComplete="true"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-btn"
            disabled={data.confirm?.length === 0 ? true : false}
          >
            SignUp
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};