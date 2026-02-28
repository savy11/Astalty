'use client';

import { Form, Input, Select, DatePicker, Radio, Button, Space, Divider, Tooltip, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, CalendarOutlined, UploadOutlined } from '@ant-design/icons';
import Header from '../components/header';

const { Option } = Select;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;

const CreateParticipantForm = () => {
  const [form] = Form.useForm();

  // Dummy options - replace with real data
  const titleOptions = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'];
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const yearOptions = Array.from({ length: 100 }, (_, i) => 2026 - i);
  const sexOptions = ['Male', 'Female', 'Other'];
  const genderIdentityOptions = ['Male', 'Female', 'Non-binary', 'Other'];
  const phoneCodes = ['+61', '+1', '+44'];
  const phoneTypes = ['Mobile', 'Home', 'Work'];
  const communicationPreferenceOptions = ['Email', 'SMS', 'Phone'];
  const countryOptions = [{ value: 'AU', label: '🇦🇺 Australia' }];
  const timezoneOptions = [{ value: 'UTC+05:30', label: '(UTC+05:30) - Asia/Calcutta' }];
  const privacyConsentOptions = ['No response', 'Accepted', 'Rejected'];
  const veteransSexOptions = ['Male', 'Female'];
  const healthFundOptions = ['Fund 1', 'Fund 2'];
  const fundManagementOptions = ['Self-managed', 'Plan-managed', 'NDIA-managed'];
  const mobileCodeOptions = ['+61', '+1'];
  const invoiceReminderOptions = ['On', 'Off'];
  const referralTypeOptions = ['Type 1', 'Type 2'];
  const relationshipOptions = ['Spouse', 'Child', 'Parent', 'Sibling'];

  const onFinish = async (values) => {
    console.log('Form values:', values);
   try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }

    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    const payload = {
      title: values.title,
      firstName: values.personalDetails?.firstname,
      middleName: values.personalDetails?.middleName,
      lastName: values.personalDetails?.lastname,
      preferredName: values.personalDetails?.preferredName,
      day: values.personalDetails?.birthDay,
      month: values.personalDetails?.birthMonth,
      year: values.personalDetails?.birthYear,
      sex: values.personalDetails?.sex,
      genderIdentity: values.personalDetails?.genderIdentity,
      pronouns: values.personalDetails?.pronouns,
      occupation: values.personalDetails?.occupation,
      otherDetails: values.personalDetails?.extraInfo,
      tags: values.personalDetails?.patientTagIds || [],
      email: values.email,
      phoneNumber: values.phoneNumbers?.[0]?.phoneNumber,
      appointmentCommunicationPreferences:
        values.communicationPreference,
      address: {
        address1: values.addressL1,
        address2: values.addressL2,
        address3: values.addressL3,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,
      },
      privacyPolicyStatus: values.privacyPolicy === "Accepted",
      medications: values.medications || [],
      allergies: values.allergies || [],
      intolerances: values.intolerances || [],
    };

    console.log("Sending payload:", payload);

    const response = await fetch(
      `${baseApiUrl}/api/participant/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload), // 🔥 IMPORTANT
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Participant created successfully 🎉");
      form.resetFields();
    } else {
      alert(data.message || "Something went wrong");
    }

  } catch (error) {
    console.error("Create participant error:", error);
    alert("Server error");
  }
};

  return (
    <div>
      <Header activeKey='Participants' />
    <div className="p-6">
      <div>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Create participant</h1>
            <Space>
              <Button>Cancel</Button>
              <Button type="primary" onClick={() => form.submit()}>Create</Button>
            </Space>
          </div>
        </div>
        <Form form={form} layout="vertical" autoComplete="off" onFinish={onFinish}>
          {/* General details */}
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">General details</h3>
            <Form.Item label="Title" name="title">
              <Select allowClear showSearch placeholder="Title" style={{ width: '100%' }}>
                {titleOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item name={['personalDetails', 'name']}>
              <Space style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Form.Item label="First name" name={['personalDetails', 'firstname']} rules={[{ required: true, message: 'First name is required' }]}>
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item label="Middle name" name={['personalDetails', 'middleName']} >
                  <Input placeholder="Middle name" />
                </Form.Item>
                <Form.Item label="Last name" name={['personalDetails', 'lastname']} srules={[{ required: true, message: 'Last name is required' }]}>
                  <Input placeholder="Last name" />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label="Preferred name" name={['personalDetails', 'preferredName']}>
              <Input />
            </Form.Item>
            <Form.Item name={['personalDetails', 'birthDate']}>
              <Space style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Form.Item label="Day" name={['personalDetails', 'birthDay']}>
                  <Select allowClear showSearch placeholder="Day">
                    {dayOptions.map((day) => <Option key={day} value={day}>{day}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Month" name={['personalDetails', 'birthMonth']}>
                  <Select allowClear showSearch placeholder="Month">
                    {monthOptions.map((month, idx) => <Option key={idx + 1} value={idx + 1}>{month}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Year" name={['personalDetails', 'birthYear']} >
                  <Select allowClear showSearch placeholder="Year">
                    {yearOptions.map((year) => <Option key={year} value={year}>{year}</Option>)}
                  </Select>
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label={<>Sex<Tooltip title=""><QuestionCircleOutlined className="ml-1" /></Tooltip></>} name={['personalDetails', 'sex']}>
              <Select allowClear placeholder="" style={{ width: '100%' }}>
                {sexOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label={<>Gender identity<Tooltip title=""><QuestionCircleOutlined className="ml-1" /></Tooltip></>} name={['personalDetails', 'genderIdentity']}>
              <Select allowClear placeholder="" style={{ width: '100%' }}>
                {genderIdentityOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Pronouns" name={['personalDetails', 'pronouns']}>
              <Input placeholder="they / them" />
            </Form.Item>
            <Form.Item label="Occupation" name={['personalDetails', 'occupation']}>
              <Input />
            </Form.Item>
            <Form.Item label="Other details" name={['personalDetails', 'extraInfo']}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={
              <>
                <div>Alerts
                <p className="text-xs text-gray-600">Information you add here will be displayed in important places like scheduling appointments.</p>
                </div>
              </>
            } name={['personalDetails', 'alert']}>
              <TextArea maxLength={1000} showCount />
            </Form.Item>
            <Form.Item label="Tags" name={['personalDetails', 'patientTagIds']}>
              <Select mode="multiple" showSearch placeholder="Select Participant tag" style={{ width: '100%' }} />
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Participant contact details</h3>
            <Form.Item label={<>Email <Tooltip title=""><QuestionCircleOutlined className="ml-1" /></Tooltip></>} name="email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<>Phone numbers <Tooltip title=""><QuestionCircleOutlined className="ml-1" /></Tooltip></>} requiredMark={false}>
              <Form.List name="phoneNumbers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                        <Form.Item {...restField} name={[name, 'code']} rules={[{ required: true, message: 'Phone code is required' }]}>
                          <Select showSearch placeholder="Code">
                            {phoneCodes.map((code) => <Option key={code} value={code}>{code}</Option>)}
                          </Select>
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'phoneNumber']} rules={[{ required: true, message: 'Phone number is required' }, { pattern: /^\d{10,}$/, message: 'Phone number must be at least 10 digits' }]}>
                          <Input placeholder="Phone number" />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'type']} rules={[{ required: true, message: 'Phone type is required' }]}>
                          <Select placeholder="Type">
                            {phoneTypes.map((type) => <Option key={type} value={type}>{type}</Option>)}
                          </Select>
                        </Form.Item>
                        {fields.length > 0 ? (
                          <DeleteOutlined onClick={() => remove(name)} className="text-red-500 cursor-pointer" />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        New phone number
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item label={<>Appointment communication preferences<Tooltip title=""><QuestionCircleOutlined className="ml-1" /></Tooltip></>} name="communicationPreference" rules={[{ required: true, message: 'Communication preference is required' }]}>
              <Select>
                {communicationPreferenceOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Address</h3>
            <Form.Item label="Search the address" name="addressSearch">
              <Input placeholder="Search an address" />
            </Form.Item>
            <Form.Item label="Address" name="addressL1" style={{ marginBottom: 5 }}>
              <Input placeholder="Address line 1" />
            </Form.Item>
            <Form.Item name="addressL2" style={{ marginBottom: 5 }}>
              <Input placeholder="Address line 2" />
            </Form.Item>
            <Form.Item name="addressL3">
              <Input placeholder="Address line 3" />
            </Form.Item>
            <Form.Item label="City/Town" name="city">
              <Input />
            </Form.Item>
            <Space style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Form.Item label="State/Region" name="state" style={{ width: '49%' }}>
                <Input />
              </Form.Item>
              <Form.Item label="Postal/Zip code" name="postalCode" style={{ width: '49%' }}>
                <Input />
              </Form.Item>
            </Space>
            <Form.Item label="Country" name="country">
              <Select showSearch>
                {countryOptions.map((opt) => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Timezone" name="timezone" rules={[{ required: true, message: 'Timezone is required' }]}>
              <Select showSearch>
                {timezoneOptions.map((opt) => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
              </Select>
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Privacy policy consent</h3>
            <Form.Item name="privacyPolicy" rules={[{ required: true, message: 'Privacy policy consent is required' }]}>
              <RadioGroup>
                {privacyConsentOptions.map((opt) => <Radio key={opt} value={opt}>{opt}</Radio>)}
              </RadioGroup>
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Medications</h3>
            <Form.List name="medications">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name, 'name']} style={{ width: '40%' }} rules={[{ required: true, message: 'Medication name is required' }]}>
                        <Input placeholder="Medication" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'frequency']} style={{ width: '50%' }} rules={[{ required: true, message: 'Frequency is required' }]}>
                        <Input placeholder="Frequency" />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <DeleteOutlined onClick={() => remove(name)} className="text-red-500 cursor-pointer" />
                      ) : null}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Medication
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Allergies</h3>
            <Form.List name="allergies">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name, 'type']} style={{ width: '40%' }} rules={[{ required: true, message: 'Allergy type is required' }]}>
                        <Input placeholder="Allergy" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'description']} style={{ width: '50%' }} rules={[{ required: true, message: 'Description is required' }]}>
                        <Input placeholder="Description" />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <DeleteOutlined onClick={() => remove(name)} className="text-red-500 cursor-pointer" />
                      ) : null}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Allergy
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Intolerances</h3>
            <Form.List name="intolerances">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name]} style={{ width: '90%' }} rules={[{ required: true, message: 'Intolerance description is required' }]}>
                        <Input placeholder="Description" />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <DeleteOutlined onClick={() => remove(name)} className="text-red-500 cursor-pointer" />
                      ) : null}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Intolerance
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Medicare details</h3>
            <Space style={{ display: 'flex', width: '100%' }}>
              <Form.Item label="Card number" name="medicareNum" style={{ width: '69%' }} rules={[{ required: true, message: 'Medicare card number is required' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Reference number" name="irn" style={{ width: '29%' }} rules={[{ required: true, message: 'Reference number is required' }]}>
                <Input />
              </Form.Item>
            </Space>
            <Form.Item label="Expiry">
              <Space>
                <Form.Item name="medicareValidUntilMonth" style={{ width: '49%' }} rules={[{ required: true, message: 'Month is required' }]}>
                  <Select allowClear showSearch placeholder="Month">
                    {monthOptions.map((month, idx) => <Option key={idx + 1} value={idx + 1}>{month}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item name="medicareValidUntilYear" style={{ width: '49%' }} rules={[{ required: true, message: 'Year is required' }]}>
                  <Select allowClear showSearch placeholder="Year">
                    {yearOptions.map((year) => <Option key={year} value={year}>{year}</Option>)}
                  </Select>
                </Form.Item>
              </Space>
            </Form.Item>
            <h3 className="mb-4 text-md font-medium mt-6">Medicare claimant details</h3>
            <Form.List name="medicareClaimants">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="border p-4 mb-4 rounded">
                      <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item {...restField} name={[name, 'firstName']} label="First name" style={{ width: '49%' }} rules={[{ required: true, message: 'First name is required' }]}>
                          <Input placeholder="First name" />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'lastName']} label="Last name" style={{ width: '49%' }} rules={[{ required: true, message: 'Last name is required' }]}>
                          <Input placeholder="Last name" />
                        </Form.Item>
                      </Space>
                      <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item {...restField} name={[name, 'birthDay']} label="Day" style={{ width: '32%' }} rules={[{ required: true, message: 'Day is required' }]}>
                          <Select allowClear showSearch placeholder="Day">
                            {dayOptions.map((day) => <Option key={day} value={day}>{day}</Option>)}
                          </Select>
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'birthMonth']} label="Month" style={{ width: '32%' }} rules={[{ required: true, message: 'Month is required' }]}>
                          <Select allowClear showSearch placeholder="Month">
                            {monthOptions.map((month, idx) => <Option key={idx + 1} value={idx + 1}>{month}</Option>)}
                          </Select>
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'birthYear']} label="Year" style={{ width: '32%' }} rules={[{ required: true, message: 'Year is required' }]}>
                          <Select allowClear showSearch placeholder="Year">
                            {yearOptions.map((year) => <Option key={year} value={year}>{year}</Option>)}
                          </Select>
                        </Form.Item>
                      </Space>
                      <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item {...restField} name={[name, 'medicareNumber']} label="Card number" style={{ width: '69%' }} rules={[{ required: true, message: 'Card number is required' }]}>
                          <Input />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'irn']} label="Reference number" style={{ width: '29%' }} rules={[{ required: true, message: 'Reference number is required' }]}>
                          <Input />
                        </Form.Item>
                      </Space>
                      <Form.Item label="Expiry">
                        <Space>
                          <Form.Item {...restField} name={[name, 'medicareValidUntilMonth']} style={{ width: '49%' }} rules={[{ required: true, message: 'Month is required' }]}>
                            <Select allowClear showSearch placeholder="Month">
                              {monthOptions.map((month, idx) => <Option key={idx + 1} value={idx + 1}>{month}</Option>)}
                            </Select>
                          </Form.Item>
                          <Form.Item {...restField} name={[name, 'medicareValidUntilYear']} style={{ width: '49%' }} rules={[{ required: true, message: 'Year is required' }]}>
                            <Select allowClear showSearch placeholder="Year">
                              {yearOptions.map((year) => <Option key={year} value={year}>{year}</Option>)}
                            </Select>
                          </Form.Item>
                        </Space>
                      </Form.Item>
                      <Button type="link" danger onClick={() => remove(name)}>Delete</Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Medicare claimant
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Department of Veterans’ Affairs details</h3>
            <Form.Item label="Veterans file number" name="veteransFileNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Sex" name="veteransGender">
              <RadioGroup>
                {veteransSexOptions.map((opt) => <Radio key={opt} value={opt}>{opt}</Radio>)}
              </RadioGroup>
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Private health insurance details</h3>
            <Form.Item label="Health fund" name="healthFund_id">
              <Select allowClear showSearch placeholder="">
                {healthFundOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">NDIS details</h3>
            <Form.Item label="NDIS number" name="ndisNumber">
              <Input />
            </Form.Item>
            <Space style={{ display: 'flex', width: '100%' }}>
              <Form.Item label="Plan start date" name={['ndisInfo', 'startDate']} style={{ width: '49%' }}>
                <DatePicker style={{ width: '100%' }} suffixIcon={<CalendarOutlined />} placeholder="Select date" />
              </Form.Item>
              <Form.Item label="Plan end date" name={['ndisInfo', 'endDate']} style={{ width: '49%' }}>
                <DatePicker style={{ width: '100%' }} suffixIcon={<CalendarOutlined />} placeholder="Select date" />
              </Form.Item>
            </Space>
            <Form.Item label="Diagnosis" name={['ndisInfo', 'diagnosis']}>
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item label="Fund management" name={['ndisInfo', 'fundManagement']}>
              <Select allowClear placeholder="">
                {fundManagementOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Plan nominee">
              <Space style={{ display: 'flex', width: '100%' }}>
                <Input placeholder="First name" style={{ width: '50%' }} />
                <Input placeholder="Last name" style={{ width: '50%' }} />
              </Space>
            </Form.Item>
            <Form.Item label="Mobile number">
              <Space>
                <Select showSearch placeholder="Code" style={{ width: '20%', minWidth: '70px' }}>
                  {mobileCodeOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
                </Select>
                <Input placeholder="Phone number" style={{ width: '80%' }} />
              </Space>
            </Form.Item>
            <Form.Item label="Email" name={['ndisInfo', 'nomineeEmail']} rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
              <Input type="email" />
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Emergency contact</h3>
            <Form.Item label="Full name" name="emergencyContactName" rules={[{ required: true, message: 'Emergency contact full name is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Relationship" name="emergencyContactRelationship" rules={[{ required: true, message: 'Relationship is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone number" name="emergencyContactNumber" rules={[{ required: true, message: 'Phone number is required' }, { pattern: /^\d{10,}$/, message: 'Phone number must be at least 10 digits' }]}>
              <Input />
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Invoicing</h3>
            <Form.Item label={
              <>
                <b>Extra participant invoice details</b>
                <p className="text-xs text-gray-600 mt-1">Information here will be displayed on the invoice under the participant name.</p>
                <a href="https://support.splose.com/en/articles/4738489-create-send-and-manage-invoices-in-splose#h_6f4486a58f" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500">Read help guide.</a>
              </>
            } name="extraBillingInfo">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={
              <>
                <div className="font-bold">Send invoices to</div>
                <p className="text-xs text-gray-600 mt-1">Choose to automatically assign a contact as the invoice recipient.</p>
              </>
            } style={{ marginBottom: 0 }}>
              <Select showSearch placeholder="Start typing to search contact" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Default invoice reminder preference" name="sendInvoiceReminder">
              <Select>
                {invoiceReminderOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Related participants</h3>
            <Form.List name="relationships">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name, 'participant']} style={{ width: '70%' }}>
                        <Select showSearch placeholder="Start typing to search participant">
                          {/* Options from API */}
                        </Select>
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'relationship']} style={{ width: '20%' }} rules={[{ required: true, message: 'Relationship is required' }]}>
                        <Select placeholder="Relationship">
                          {relationshipOptions.map((rel) => <Option key={rel} value={rel}>{rel}</Option>)}
                        </Select>
                      </Form.Item>
                      {fields.length > 0 ? (
                        <DeleteOutlined onClick={() => remove(name)} className="text-red-500 cursor-pointer" />
                      ) : null}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Relationship
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Associated contacts</h3>
            <p className="text-xs text-gray-600 mb-4">Select contacts that are associated with the participant to be included in different communications.</p>
            <Form.Item>
              <Space style={{ display: 'flex', width: '100%' }}>
                <Select showSearch placeholder="Start typing to search contact" style={{ width: '100%' }} />
                <Button type="default">Add</Button>
              </Space>
            </Form.Item>
          </section>

          <Divider style={{ borderColor: '#8250FF' }} />
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-medium">Referral Source</h3>
            <Form.Item label="Referral type" name="referralTypeId">
              <Select placeholder="">
                {referralTypeOptions.map((opt) => <Option key={opt} value={opt}>{opt}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Information" name="referralInfo">
              <Input />
            </Form.Item>
          </section>
        </Form>
      </div>
      {/* Profile photo sidebar */}
      <div className="w-48">
        <div className="text-center mb-2">Profile photo</div>
        <Upload>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
    </div>
    </div>
  );
};

export default CreateParticipantForm;