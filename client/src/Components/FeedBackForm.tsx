import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  ColorPicker,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Spin,
  Switch,
  TreeSelect,
  Upload,
} from "antd";

import type { FeedbackFormType } from "../Types/Feedback";
import { useState } from "react";
import { useCreateFeedbackMutation } from "../TanstackApiService/Feedback";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FeedBackForm = ({
  showFeedbackForm,
  setShowFeedbackForm,
}: {
  showFeedbackForm: boolean;
  setShowFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: createFeedback } = useCreateFeedbackMutation();

  const [form] = Form.useForm();

  const onFinish = async (values: FeedbackFormType) => {
    setLoading(true);

    try {
      console.log("Form values :: ", values);
      const trimmedStringFields = [
        values.name,
        values.content,
        values.feedbackType,
      ];
      const hasEmptyTrimmed = trimmedStringFields.some(
        (f) => f?.trim?.() === ""
      );

      const isAnyNull = [
        values.appVersion,
        values.issueDate,
        values.usagePeriod,
        values.screenShot,
      ].some((field) => field === null || field === undefined);

      if (hasEmptyTrimmed || isAnyNull) {
        messageApi.error("All fields are required and must not be empty.");
        return;
      }

      let screenshotBase64 = values.screenShot;
      if (Array.isArray(screenshotBase64)) {
        const fileObj = screenshotBase64?.[0]?.originFileObj;
        screenshotBase64 = await convertFileToBase64(fileObj);
      }

      const payload = {
        name: values.name.trim(),
        content: values.content.trim(),
        feedbackType: values.feedbackType,
        appVersion: String(values.appVersion),
        issueDate: (values.issueDate as any).toISOString(),
        usagePeriod: values.usagePeriod.map((d: any) => d.toISOString()),
        screenShot: screenshotBase64,
      };

      console.log(payload);

      createFeedback(payload, {
        onSuccess: (res) => {
          messageApi.open({
            type: "success",
            content: res?.data.message,
            duration: 3,
          });

          form.resetFields();
        },
        onError: (err: any) => {
          messageApi.open({
            type: "error",
            content: err?.response?.data.message,
            duration: 3,
          });
        },
      });

    } catch (error) {
      console.error("Submit failed:", error);
      messageApi.error("Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title={`Feedback Form`}
        placement="right"
        size="large"
        onClose={() => {
          setShowFeedbackForm(false);
          form.resetFields();
        }}
        open={showFeedbackForm}
      >
        <Form
          layout="horizontal"
          onFinish={onFinish}
          form={form}
          onFinishFailed={(err) => console.log("Validation Failed:", err)}
          disabled={loading}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name !" }]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Feedback Type"
            name="feedbackType"
            rules={[
              { required: true, message: "Please Select a Feedback type !" },
            ]}
          >
            <Select placeholder="Select a category">
              <Select.Option value="bug">Bug Report</Select.Option>
              <Select.Option value="suggestion">Feature Request</Select.Option>
              <Select.Option value="ui">UI Issue</Select.Option>
              <Select.Option value="performance">Performance</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Feedback Section" name="feedbackSection">
            <TreeSelect
              placeholder="Select affected area"
              treeData={[
                {
                  title: "Dashboard",
                  value: "dashboard",
                },
                {
                  title: "Settings",
                  value: "settings",
                  children: [
                    { title: "Profile", value: "profile" },
                    { title: "Notifications", value: "notifications" },
                  ],
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Device Info" name="deviceInfo">
            <Cascader
              placeholder="Select OS and Browser"
              options={[
                {
                  value: "windows",
                  label: "Windows",
                  children: [
                    { value: "chrome", label: "Chrome" },
                    { value: "edge", label: "Edge" },
                    { value: "brave", label: "Brave" },
                    { value: "firefox", label: "Firefox" },
                  ],
                },
                {
                  value: "mac",
                  label: "MacOS",
                  children: [
                    { value: "chrome", label: "Chrome" },
                    { value: "edge", label: "Edge" },
                    { value: "brave", label: "Brave" },
                    { value: "firefox", label: "Firefox" },
                    { value: "safari", label: "Safari" },
                  ],
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Issue Date"
            name="issueDate"
            rules={[{ required: true, message: "Please Select a date !" }]}
          >
            <DatePicker placeholder="When did this happen?" />
          </Form.Item>

          <Form.Item
            label="Usage Period"
            name="usagePeriod"
            rules={[{ required: true, message: "Please Select a Period !" }]}
          >
            <RangePicker />
          </Form.Item>

          <Form.Item
            label="App Version Used"
            name="appVersion"
            rules={[{ required: true, message: "Please Select a version !" }]}
          >
            <InputNumber placeholder="e.g., 1.2.0" />
          </Form.Item>

          <Form.Item
            label="Your Feedback"
            name="content"
            rules={[{ required: true, message: "Write a Feedback !" }]}
          >
            <TextArea
              rows={4}
              placeholder="Describe your experience or issue..."
            />
          </Form.Item>

          <Form.Item
            label="Would you recommend us?"
            name="recommend"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Screenshot or File"
            name="screenShot"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Image is Required !" }]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              maxCount={1}
            >
              <button type="button" style={{ border: 0, background: "none" }}>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item label="Satisfaction" name="satisfaction">
            <Slider min={1} max={10} />
          </Form.Item>

          <Form.Item label="Theme Color Used" name="themeColor">
            <ColorPicker />
          </Form.Item>

          <Form.Item label="Overall Rating" name="rating">
            <Rate />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spin />
                    Loading
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  form.resetFields();
                }}
                disabled={loading}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default FeedBackForm;
