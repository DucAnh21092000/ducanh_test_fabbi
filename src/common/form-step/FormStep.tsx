import { Button, Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import useUtils from '../func/until';
import style from './FormStep.module.scss';
import { EStepKey } from './FormStep.model';

interface IFormStep {
  children: React.ReactElement[];
  handleValidate: () => Promise<boolean>;
  stepList: IStepList[];
  onFinish: () => void;
  form: FormInstance<any>;
  onStepChange?: (currentStep: EStepKey) => void;
}

interface IStepList {
  title: string;
  key: EStepKey;
}

const FormStep = (props: IFormStep) => {
  const { children, handleValidate, stepList, onFinish, form, onStepChange } = props;
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>(stepList[stepIndex].key ?? '');
  const { combineClassName } = useUtils();

  const handleClickPreviousStep = () => {
    if (stepIndex !== 0) {
      setStepIndex((preState) => preState - 1);
    }
  };

  const handleValidateButtonNext = async () => {
    const isSuccess = await handleValidate();
    if (isSuccess) {
      setStepIndex((preState) => preState + 1);
    }
  };

  useEffect(() => {
    setActiveTab(stepList[stepIndex]?.key);
  }, [stepIndex, stepList]);

  useEffect(() => {
    const currentStep = stepList.find((item) => item.key === activeTab);
    onStepChange?.(currentStep?.key as EStepKey);
  }, [stepIndex, activeTab]);
  return (
    <div className={style.formStep}>
      <div className={style.formHeader}>
        {stepList?.map((item, index) => (
          <div
            key={item.key}
            className={combineClassName(
              style.headerItem,
              activeTab === item.key ? style.active : style.inActive
            )}
            aria-hidden
            onClick={() => {
              setActiveTab(item.key);
            }}
          >
            <div className={style.itemNumber}>{index + 1}</div>
            <div className={style.itemContent}>{item.title}</div>
          </div>
        ))}
      </div>
      <div className={style.formContent}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div style={{ padding: 16 }}>
            {children.map((step) => {
              const currentKey = step.props?.stepKey?.toString();
              if (currentKey === activeTab) return step;
            })}
          </div>
        </Form>
      </div>
      <div className={style.formFooter}>
        <Button>Cancel</Button>
        {stepIndex !== 0 && <Button onClick={handleClickPreviousStep}>Previous</Button>}
        {stepIndex !== stepList.length - 1 ? (
          <Button onClick={handleValidateButtonNext}>Next</Button>
        ) : (
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStep;
